// WashingMachine.js
import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Text } from 'react-native';
import GreenMachine from './../assets/WashingMachineImages/green_machine.png';
import RedMachine from './../assets/WashingMachineImages/red_machine.png';



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
