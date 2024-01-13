import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import GreenMachine from '../../assets/WashingMachineImages/green_machine.png';
import RedMachine from '../../assets/WashingMachineImages/red_machine.png';
import { getDatabase, ref, child, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function WashingMachine() {
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  const username = user.displayName;

  const [machines, setMachines] = useState([null, null, null, null]);

  useEffect(() => {
    const fetchMachines = async () => {
      const promises = [];
      for (let i = 1; i < 5; i++) {
        promises.push(
          get(child(ref(db), `Machines/${i}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                return snapshot.val();
              } else {
                console.log(`No data available for Machine ${i}`);
                return null;
              }
            })
            .catch((error) => {
              console.error(error);
              return null;
            })
        );
      }

      try {
        const machinesData = await Promise.all(promises);
        setMachines(machinesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMachines();
  }, [db]);

  const toggleOccupancy = (index) => {
    const updatedMachines = [...machines];
    updatedMachines[index - 1] = !updatedMachines[index - 1];

    update(ref(db, 'Machines'), {
      [index]: updatedMachines[index - 1],
    });

    setMachines(updatedMachines);
  };

  const updateMachines = () => {
    return machines.map((machine, index) => (
      machine ? (
        <Image key={index} source={RedMachine} style={styles.WashingMachine} />
      ) : (
        <Image key={index} source={GreenMachine} style={styles.WashingMachine} />
      )
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.displayUser}>Hello, {username}</Text>
      </View>
      <View style={styles.machineContainer}>{updateMachines()}</View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(1)}>
          <Text style={styles.ButtonText}>{machines[0] ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(2)}>
          <Text style={styles.ButtonText}>{machines[1] ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(3)}>
          <Text style={styles.ButtonText}>{machines[2] ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(4)}>
          <Text style={styles.ButtonText}>{machines[3] ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  machineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  WashingMachine: {
    width: '25%',
    padding: 5,
    marginTop: 450,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  Button: {
    backgroundColor: '#2c6ade',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: '25%',
  },
  ButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  displayUser: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 50,
  },
  header: {
    width: '100%',
  },
});
