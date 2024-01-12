// WashingMachine.js
import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Text, Pressable } from 'react-native';
import GreenMachine from '../../assets/WashingMachineImages/green_machine.png';
import RedMachine from '../../assets/WashingMachineImages/red_machine.png';


export default function WashingMachine() {
  const [m1Occupied, setM1Occupied] = useState(false);
  const [m2Occupied, setM2Occupied] = useState(false);
  const [m3Occupied, setM3Occupied] = useState(false);
  const [m4Occupied, setM4Occupied] = useState(false);

  const Machines = [m1Occupied, m2Occupied, m3Occupied, ,m4Occupied];

  function toggleOccupancy(index) {
    if (index == 1){
    setM1Occupied((m1Occupied) => !m1Occupied);
    Machines[1] = m1Occupied;
    }
    else if (index == 2){
        setM2Occupied((m2Occupied) => !m2Occupied);
        Machines[2] = m2Occupied;
    }
    else if (index == 3){
        setM3Occupied((m3Occupied) => !m3Occupied);
        Machines[3] = m3Occupied;
    }
    else {
            setM4Occupied((m4Occupied) => !m4Occupied);
            Machines[4] = m4Occupied;


    }
    updateMachines();
  };
  function updateMachines() {
    return Machines.map((machine, index) => (
      machine ? (
        <Image key={index} source={RedMachine} style={styles.WashingMachine} />
      ) : (
        <Image key={index} source={GreenMachine} style={styles.WashingMachine} />
      )
    ));
  }

  return (
    <View style={styles.container}>
        <View style = {styles.machineContainer}>{updateMachines()}</View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(1)}>
          <Text style={styles.ButtonText}>{m1Occupied ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(2)}>
          <Text style={styles.ButtonText}>{m2Occupied ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(3)}>
          <Text style={styles.ButtonText}>{m3Occupied ? 'Vacate' : 'Claim'}</Text>
        </Pressable>
        <Pressable style={styles.Button} onPress={() => toggleOccupancy(4)}>
          <Text style={styles.ButtonText}>{m4Occupied ? 'Vacate' : 'Claim'}</Text>
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
    marginTop: 500,
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
});
