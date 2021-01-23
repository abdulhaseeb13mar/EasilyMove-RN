// -----PROPS IT TAKES-----------
//  Text
//  BackgroundColor
//  ContentContainerStyle
//  loading
//  LoaderColor
//  TextStyle
//  onPress

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.Wrapper,
        backgroundColor: props.BackgroundColor
          ? props.BackgroundColor
          : '#03a9f4',
      }}>
      <View style={{...styles.ButtonContent, ...props.ContentContainerStyle}}>
        {props.loading ? (
          <ActivityIndicator
            size="small"
            color={props.LoaderColor ? props.LoaderColor : 'white'}
          />
        ) : (
          <Text
            style={{
              ...styles.ButtonText,
              ...props.TextStyle,
            }}>
            {props.Text ? props.Text : 'Button'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    // ...border,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  ButtonContent: {
    margin: 8,
  },
  ButtonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Button;
