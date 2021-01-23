import React from 'react';
import {View, FlatList} from 'react-native';
import {metrics} from '../../shared/Theme';

function Listing(props) {
  const {
    data,
    renderItem,
    style,
    containerStyle,
    horizontal = true,
    ...rest
  } = props;
  return (
    <View style={{flex: 1}}>
      <FlatList
        bounces={false}
        data={data}
        horizontal={horizontal}
        style={[{flex: 1}, containerStyle]}
        contentContainerStyle={{
          paddingRight: metrics.defaultMargin,
          paddingVertical: horizontal ? '2%' : 0,
          paddingLeft: horizontal ? 0 : metrics.defaultMargin,
          ...style,
        }}
        keyExtractor={() => Math.random().toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        {...rest}
      />
    </View>
  );
}

export default Listing;
