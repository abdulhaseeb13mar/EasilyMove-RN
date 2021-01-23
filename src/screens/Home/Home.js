import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {colors} from '../../shared/Theme';
import Listing from '../../components/listing/listing';
import Data from '../../Dummydata/DummyData';
import FastImage from 'react-native-fast-image';

function Home(props) {
  return (
    <WrapperScreen style={{backgroundColor: colors.lightBackground}}>
      <ScrollView bounces={false}>
        <View>
          <Listing
            data={Data.category}
            renderItem={({item}) => (
              <View>
                <FastImage
                  source={item.icon}
                  style={{width: 100, height: 100}}
                  tintColor="#5e6369"
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text>{item.categoryname}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

export default Home;
