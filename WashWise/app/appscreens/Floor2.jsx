import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, Pressable, Button } from 'react-native';
import GreenMachine from '../../assets/WashingMachineImages/green_machine.png';
import RedMachine from '../../assets/WashingMachineImages/red_machine.png';
import { getDatabase, ref, child, get, update, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';
import Timer from '../../components/Timer.js';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

// Listen to changes in the timer value


export default function WashingMachine() {
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  const username = user.displayName;

  const [machines, setMachines] = useState([null, null, null, null]);
  const [users, setUsers] = useState([null,null,null,null]);
  const initialIsPlaying = machines.map(() => false);
  const initialKeys = machines.reduce((acc, _, index) => {
    acc[index] = 0;
    return acc;
  }, {});


  const [keys, setKeys] = useState(initialKeys);
  
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  useEffect(() => {
    const fetchMachines = async () => {
      const occupiedPromises = [];
      const userPromises = [];
      for (let i = 1; i < 5; i++) {
        occupiedPromises.push(
          get(child(ref(db), `Machines/Floor2/Machine${i}/Occupied`))
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
        userPromises.push(
            get(child(ref(db), `Machines/Floor2/Machine${i}/User`))
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
        const machinesData = await Promise.all(occupiedPromises);
        const usersData = await Promise.all(userPromises);

        setMachines(machinesData);
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMachines();
  }, [db]);


  const toggleOccupancy = (index) => {
    const updatedMachines = [...machines];
    const updatedUsers = [...users];
    const updatedIsPlaying = [...isPlaying];
    const updatedKeys = { ...keys };
  
    updatedMachines[index - 1] = !updatedMachines[index - 1];
  
    if (updatedMachines[index - 1]) {
      updatedUsers[index - 1] = user.email;
      updatedIsPlaying[index - 1] = true;
    } else {
      updatedUsers[index - 1] = 'none';
      updatedIsPlaying[index - 1] = false;
    }
  
    update(ref(db, `Machines/Floor2/Machine${index}`), {
      Occupied: updatedMachines[index - 1],
      User: updatedUsers[index - 1],
    });
  
    setMachines([...updatedMachines]);
    setUsers([...updatedUsers]);
    setIsPlaying([...updatedIsPlaying]);
    setKeys((prevKeys) => ({ ...prevKeys, [index - 1]: prevKeys[index - 1] + 1 }));
  };
  
  const showTimer = (machine) =>{
    console.log("hello");
    if(machine) {
      <Timer/>
      } 
      else{
        console.log("hello");
      }
  }
  const updateMachines = () => {
    return machines.map((machine, index) => (
      <View key={index} style={styles.machineItem}>
        <View style={styles.timerContainer}>
          <CountdownCircleTimer
            isPlaying={isPlaying[index]}
            duration={3300}
            key={keys[index]}
            
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => {
              toggleOccupancy(index + 1);
            }}
            
            updateInterval={1}
            size={100}
            
          >

            {({ remainingTime, color }) => (
              <Text style = {{color, fontSize: 20, remainingTime}}>{renderTime(remainingTime)}</Text>
            )}
            
          </CountdownCircleTimer>
        </View>
        <Image source={machine ? RedMachine : GreenMachine} style={styles.washingMachine} />

      </View>
    ));
  };
  
  
  
  

  const notifyUser = () => {

  } 
  const renderTime = (remainingTime) => {     
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return (`${minutes}:${seconds}`);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.displayUser}>Hello, {username}</Text>
      </View>
      <View style = {styles.MachineLists}>
      <View style = {styles.MachineListRow}>
        <Text style = {styles.MachineText}>Machine 1: {machines[0] ? (users[0]) : 'Unoccupied'}</Text>
        <Pressable style = {styles.NotifyButton} onPress ={() => notifyUser()}><Text style = {styles.NotifyText}>{machines[0] ? 'Notify?' : ''}</Text></Pressable>
        </View>
        <View style = {styles.MachineListRow}>

        <Text style = {styles.MachineText}>Machine 2: {machines[1] ? (users[1]) : 'Unoccupied'}</Text>
        <Pressable style = {styles.NotifyButton} onPress ={() => notifyUser()}><Text style = {styles.NotifyText}>{machines[1] ? 'Notify?' : ''}</Text></Pressable>

        </View>
        <View style = {styles.MachineListRow}>

        <Text style = {styles.MachineText}>Machine 3: {machines[2] ? (users[2]) : 'Unoccupied'}</Text>
        <Pressable style = {styles.NotifyButton} onPress ={() => notifyUser()}><Text style = {styles.NotifyText}>{machines[2] ? 'Notify?' : ''}</Text></Pressable>

        </View>
        <View style = {styles.MachineListRow}>

        <Text style = {styles.MachineText}>Machine 4: {machines[3] ? (users[3]) : 'Unoccupied'}</Text>
        <Pressable style = {styles.NotifyButton} onPress ={() => notifyUser()}><Text style = {styles.NotifyText}>{machines[3] ? 'Notify?' : ''}</Text></Pressable>

      </View>
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
  },
  machineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '5%',
    flex: 1,


  },
  machineRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  machineItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    width: '25%',
  },
  washingMachine: {
    width: '100%',
    padding: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '15%',
    width: '100%',
  },
  Button: {
    backgroundColor: '#2c6ade',
    padding: 10,
    borderRadius: 5,
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
  MachineLists:{
    width: '100%',
    marginTop: 0,
    flexDirection: 'column',
    flex: 1,
  },
  MachineListRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  MachineText: {
    padding: 5,
    marginLeft: 5,
    fontSize: 20,

  },
  NotifyButton: {
    padding: 5,
    backgroundColor: '#AAAAAA',
    borderRadius: 5,
    alignItems: 'center',
  },
  NotifyText: {
    fontSize: 15,
  },
  timerContainer: {
    flex: 1,
    width: '100%',
  },

  buttonTimer: {
    marginBottom: 375,
  }
});
