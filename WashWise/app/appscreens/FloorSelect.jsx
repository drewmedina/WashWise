  import React, { useState, useEffect } from 'react';
  import { ImageBackground, StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import BG from '../../assets/bcg.png';

  const data = [
    { label: 'Floor 2', value: '2' },
    { label: 'Floor 3', value: '3' },
  ];

  const DropdownComponent = ({navigation}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        navigation.navigate("Floor" + value);
    },[value])

    return (
        
            <View style={styles.container}>
            <ImageBackground source = {BG} style = {{flex: 1, height: '100%'}}>
            <Text style = {styles.SelectFloorText}>Select Floor</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Floor' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="smileo"
                  size={20}
                />
              )}
            />
            </ImageBackground>
          </View>
        
       
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      height: '100%',
    },
    dropdown: {
        marginTop: 300,
        width: '90%',
        marginLeft: '5%',
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    SelectFloorText: {
        fontSize: 50,
        textAlign: 'center',
        marginTop: '30%',

    }
  });