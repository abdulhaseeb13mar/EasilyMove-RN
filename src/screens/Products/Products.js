import React from 'react';
import {ScrollView, Text} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';

function Products(props) {
  return (
    <WrapperScreen>
      <ScrollView bounces={false}>
        <Text>this is product screen</Text>
      </ScrollView>
    </WrapperScreen>
  );
}

export default Products;
