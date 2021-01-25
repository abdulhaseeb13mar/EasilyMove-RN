import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors, metrics} from '../../shared/Theme';
import NavigationRef from '../../shared/RefNavigation';

export default function Banner({item, subCategory}) {
  const subCategoryIndex = {...subCategory[parseInt(item.categoryid) - 1]};
  return (
    <TouchableOpacity
      style={{...styles.BannerWrapper}}
      onPress={() => NavigationRef.Navigate('Bookings', subCategoryIndex)}>
      <View style={styles.TextWrapper}>
        <Text style={styles.Heading}>{subCategoryIndex.subcategoryname}</Text>
      </View>
      <View
        style={{
          ...styles.backgroundColorOverlay,
          backgroundColor: subCategoryIndex.bgcolor,
        }}></View>
      <View
        style={{
          ...styles.ellipseOverlay,
          backgroundColor: subCategoryIndex.bgcolor,
        }}></View>
      <View style={styles.ellipseBorderOverlay}></View>
      <View style={styles.ImageWrapper}>
        <ImageBackground source={subCategoryIndex.image} style={styles.Image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  TextWrapper: {
    maxWidth: 170,
    marginLeft: 10,
  },
  Heading: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  Image: {
    height: '100%',
    position: 'relative',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  ImageWrapper: {
    width: 230,
    height: '100%',
    position: 'absolute',
    right: -80,
    bottom: 0,
  },
  ellipseBorderOverlay: {
    width: 100,
    height: 100,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 50,
    position: 'absolute',
    right: 13,
    bottom: -10,
    opacity: 0.6,
    transform: [{scaleY: 1.8}, {scaleX: 1.8}],
  },
  ellipseOverlay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    bottom: 0,
    transform: [{scaleY: 1.8}, {scaleX: 1.8}],
  },
  backgroundColorOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  BannerWrapper: {
    height: 160,
    width: metrics.width * 0.9,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
