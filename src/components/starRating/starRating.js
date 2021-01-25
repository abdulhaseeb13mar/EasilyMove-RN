import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import FillStar from '../../assets/images/filled_star.png';
import BlankStar from '../../assets/images/unfilled_star.png';
import HalfStar from '../../assets/images/HalfFilled_star.png';

export default function StarRating(props) {
  let {rating, size} = props;

  const RenderStars = () => {
    rating > 5 ? (rating = 0) : null;
    const isInteger = Number.isInteger(rating);
    const starsArr = isInteger ? IntegerLogic() : DecimalLogic();
    return starsArr.map((el, index) => {
      return (
        <Image
          key={index}
          source={el === 2 ? FillStar : el === 0 ? BlankStar : HalfStar}
          style={styles.ST_star}
        />
      );
    });
  };

  const IntegerLogic = () => {
    const Arr = [];
    for (let i = 0; i < rating; i++) Arr.push(2);
    for (let n = 0; n < 5 - rating; n++) Arr.push(0);
    return Arr;
  };

  const DecimalLogic = () => {
    const Arr = [],
      Whole_number = parseInt(rating);
    for (let i = 0; i < Whole_number; i++) Arr.push(2);
    Arr.push(1);
    for (let n = 0; n < 5 - (Whole_number + 1); n++) Arr.push(0);
    return Arr;
  };

  return (
    <View style={{...styles.ST_wrapper, width: size ? size : 200}}>
      <View style={{...styles.ST_InnerWrapper, height: (30 * size) / 100}}>
        {RenderStars()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ST_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ST_InnerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ST_star: {
    width: '20%',
    height: '60%',
    margin: '1%',
    resizeMode: 'contain',
  },
});
