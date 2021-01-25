import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {colors, metrics} from '../../shared/Theme';
import Listing from '../../components/listing/listing';
import Data from '../../Dummydata/DummyData';
import FastImage from 'react-native-fast-image';
import SearchBar from '../../components/searchBar/searchBar';
import Banner from '../../components/banner/banner';
import NavigationRef from '../../shared/RefNavigation';

export default function Home(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.subcategory.filter((item) =>
      item.subcategoryname.toLowerCase().includes(searchText.toLowerCase()),
    );
    return RenderBanners(
      SearchedItems.length == 0 ? Data.banner : SearchedItems,
    );
  };

  const RenderBanners = (BannerArr) => {
    return BannerArr.map((item) => (
      <Banner
        key={item.categoryid}
        item={item}
        subCategory={Data.subcategory}
      />
    ));
  };

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: colors.secondary}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={styles.SearchBarWrapper}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
        <View style={styles.listingWrapper}>
          <Listing
            data={Data.category}
            renderItem={({item}) => <HomeTabs item={item} />}
          />
        </View>
        <View style={styles.AllBannersWrapper}>
          {searchText == '' ? (
            <>
              {/* <View>
                <Text></Text>
              </View> */}
              {RenderBanners(Data.banner)}
            </>
          ) : (
            RenderSearchedResult()
          )}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const HomeTabs = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() =>
        NavigationRef.Navigate(
          'Bookings',
          Data.subcategory[parseInt(item.id) - 1],
        )
      }>
      <FastImage
        source={item.icon}
        style={{width: 30, height: 30}}
        tintColor="#5e6369"
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.HomeTabsText}>{item.categoryname}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SearchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.smallMargin,
  },
  AllBannersWrapper: {
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 5,
  },
  HomeTabsText: {
    marginLeft: 10,
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1.5,
    elevation: 5,
  },
});
