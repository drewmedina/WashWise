// WashingMachine.js
import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Text } from 'react-native';
import GreenMachine from './../assets/WashingMachineImages/green_machine.png';
import RedMachine from './../assets/WashingMachineImages/red_machine.png';

export default function WashingMachine() {
  const [isOccupied, setIsOccupied] = useState(false);

  const toggleOccupancy = () => {
    setIsOccupied((prevOccupancy) => !prevOccupancy);
  };

  return (
    <View style={styles.container}>
      {isOccupied ? (
        <Image source={RedMachine} style={styles.WashingMachineIMGLeft} />
      ) : (
        <Image source={GreenMachine} style={styles.WashingMachineIMGLeft} />
      )}
      {isOccupied ? (
        <Image source={RedMachine} style={styles.WashingMachineIMGRight} />
      ) : (
        <Image source={GreenMachine} style={styles.WashingMachineIMGRight} />
      )}
      <Button onPress={toggleOccupancy} title={isOccupied ? 'Vacate' : 'Claim'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  WashingMachineIMGRight: {
    width: '25%',
    marginTop: '100%',
  },
  WashingMachineIMGLeft: {
    width: '25%',
    marginTop: '100%',
  },
});
