import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, metrics} from '../../shared/Theme';

export default function SearchBar(props) {
  const [isFocused, setisFocused] = useState(false);

  const ChangeFocus = (bool) => {
    setisFocused(bool);
  };

  const onChangeText = (t) => props.changeSearchText(t);

  return (
    <View style={styles.SB_Wrapper}>
      <View style={styles.SB_icon}>
        <FontAwesome
          name="search"
          size={18}
          color={isFocused ? colors.primary : 'black'}
        />
      </View>
      <TextInput
        style={styles.SB_input}
        placeholder="Search for anything..."
        onBlur={() => ChangeFocus(false)}
        onFocus={() => ChangeFocus(true)}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  SB_icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  SB_Wrapper: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
    width: metrics.width * 0.9,
    paddingHorizontal: 10,
    elevation: 2,
  },
  SB_input: {
    width: '90%',
  },
});
