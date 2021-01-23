//--------LIST  OF PROPS IT TAKES--------------------
//  label [String]
//  isPassword [Boolean]
//  placeholder [String]
//  handleChange [Function(text)]  *REQUIRED*
//  value [ on Change value]  *REQUIRED*
//  errorMsg [String]
//  borderColor [string color]
//  labelColor [string color]
//  LabelStyle [Object style]
//  InputStyle [Object style]
//  HelperStyle [Object style]
//  KeyboardType [String see docs of react native for the acceptable types of keybaord]

import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const TextInputCustom = (props) => {
  const [Focus, setFocus] = useState(false);

  return (
    <>
      <View style={styles.LabelContainer}>
        <Text
          style={{
            ...styles.Label,
            color: props.errorMsg
              ? 'red'
              : props.labelColor
              ? props.labelColor
              : 'black',
            fontWeight: Focus ? 'bold' : props.errorMsg ? 'bold' : null,
            ...props.LabelStyle,
          }}>
          {props.label ? props.label : 'Input Label'}
        </Text>
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={{
            ...styles.input,
            borderBottomColor: props.errorMsg
              ? 'red'
              : props.borderColor
              ? props.borderColor
              : 'black',
            borderWidth: Focus ? 2 : props.errorMsg ? 2 : 1,
            ...props.InputStyle,
          }}
          secureTextEntry={props.isPassword}
          placeholder={
            props.placeholder ? props.placeholder : 'Input PlaceHolder'
          }
          onChangeText={(text) => props.handleChange(text)}
          value={props.value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          keyboardType={props.KeyboardType}
        />
      </View>
      <View
        style={{
          ...styles.helperContainer,
          display: props.errorMsg ? 'flex' : 'none',
          ...props.HelperStyle,
        }}>
        <Text style={styles.helper}>{props.errorMsg}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Label: {
    fontSize: 17,
    marginLeft: 6,
  },
  InputContainer: {
    borderRadius: 4,
  },
  helper: {
    fontSize: 13,
    color: 'red',
  },
  helperContainer: {
    padding: 2,
  },
  input: {
    fontSize: 15,
    borderColor: 'transparent',
  },
});

export default TextInputCustom;
