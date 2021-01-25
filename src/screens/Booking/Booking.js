import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {Button, Slider, Overlay} from 'react-native-elements';
import {colors, metrics} from '../../shared/Theme';
import StarRating from '../../components/starRating/starRating';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {setUserOrderAction} from '../../store/actions';
import NavigationRef from '../../shared/RefNavigation';
import {useFocusEffect} from '@react-navigation/native';

function Booking(props) {
  const job = props.route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [dateShow, setDateShow] = useState(false);
  const [TimeShow, setTimeShow] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [phoneErrMsg, setPhoneErrMsg] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPhoneErrMsg('');
        setPhone('');
        setSliderValue(1);
        setDate(new Date());
        setTime(new Date());
      };
    }, []),
  );

  const onDateChange = (event, selectedDate) => {
    setDateShow(false);
    selectedDate && setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setTimeShow(false);
    selectedTime && setTime(selectedTime);
  };

  const submitUserOrder = () => {
    let isValid = checkValidation();
    if (!isValid) return;
    const order = {
      PhoneNumber: phone,
      Date: date.toLocaleDateString(),
      Time: time.toLocaleTimeString(),
      Rooms: sliderValue,
      ServiceName: job.subcategoryname,
    };
    props.setUserOrderAction(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    NavigationRef.Push('Home');
  };

  const checkValidation = () => {
    let flag = false;
    phone.length == 0
      ? setPhoneErrMsg('Phone number is Empty')
      : phone.length != 11
      ? setPhoneErrMsg('Number should be 11 digits')
      : (flag = true);
    return flag;
  };

  const showDatePicker = () => setDateShow(true);
  const showTimePicker = () => setTimeShow(true);
  const onSliderChange = (val) => setSliderValue(val);
  const onPhoneChange = (e) => setPhone(e);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={{...styles.BannerWrapper}}>
          <View
            style={{
              ...styles.backgroundColorOverlay,
              backgroundColor: job.bgcolor,
            }}></View>
          <View style={styles.TextWrapper}>
            <Text style={styles.Heading}>{job.subcategoryname}</Text>
            <View
              style={{...styles.underline, borderColor: job.bgcolor}}></View>
            <View style={styles.RatingWrapper}>
              <Text style={styles.RatingText}>{job.rating}/5</Text>
              <StarRating rating={parseFloat(job.rating)} size={100} />
            </View>
            <Text style={styles.descWrapper}>{job.dis}</Text>
          </View>
          <View
            style={{
              ...styles.ellipseOverlay,
              backgroundColor: job.bgcolor,
            }}></View>
          <View style={styles.ellipseBorderOverlay}></View>
          <View style={styles.ImageWrapper}>
            <ImageBackground source={job.image} style={styles.Image} />
          </View>
        </View>
        <View style={styles.SchedulePickerWrapper}>
          <View style={styles.ApartmentPicker}>
            <Text style={styles.DateTimeHeading}>Apartment Size</Text>
            <Slider
              value={sliderValue}
              onValueChange={onSliderChange}
              thumbStyle={styles.sliderThumb}
              minimumValue={0}
              maximumValue={20}
              step={1}
              trackStyle={styles.sliderTrack}
              animationType="spring"
            />
            <Text style={styles.ApartmentText}>
              {sliderValue} Room Apartment
            </Text>
          </View>
          <View style={styles.DateTimePickerWrapper}>
            <Text style={styles.DateTimeHeading}>Date and Time</Text>
            <View style={styles.DatePickerWrapper}>
              <View style={styles.DateWrapper}>
                <Entypo
                  name="calendar"
                  color={colors.primary}
                  size={20}
                  style={{marginLeft: 5, marginRight: 10}}
                />
                <Text style={styles.DateText}>{date.toLocaleDateString()}</Text>
              </View>
              <Button
                title="Select Date"
                raised
                buttonStyle={{backgroundColor: colors.primary}}
                containerStyle={styles.DateButton}
                onPress={showDatePicker}
              />
              {dateShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.DatePickerWrapper}>
              <View style={styles.DateWrapper}>
                <Entypo
                  name="clock"
                  color={colors.primary}
                  size={20}
                  style={{marginLeft: 5, marginRight: 10}}
                />
                <Text style={styles.DateText}>{time.toLocaleTimeString()}</Text>
              </View>
              <Button
                raised
                title="Select Time"
                buttonStyle={{backgroundColor: colors.primary}}
                containerStyle={styles.DateButton}
                onPress={showTimePicker}
              />
              {TimeShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  display="spinner"
                  onChange={onTimeChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
          </View>
          <View style={styles.PhoneWrapper}>
            {phoneErrMsg ? (
              <Text style={styles.phoneErrorMsg}>{'* ' + phoneErrMsg}</Text>
            ) : null}
            <View style={styles.PhoneInputWrapper}>
              <FontAwesome name="phone" size={25} style={styles.phoneIcon} />
              <TextInput
                value={phone}
                placeholder="Enter Phone Number"
                style={styles.phoneInput}
                keyboardType="number-pad"
                onChangeText={onPhoneChange}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.ConfirmButtonWrapper}>
        <Button
          title="Confirm Booking"
          buttonStyle={styles.confirmButton}
          onPress={submitUserOrder}
        />
      </View>
      <Overlay
        isVisible={showModal}
        onBackdropPress={closeModal}
        animationType="fade">
        <View style={styles.ModalWrapper}>
          <FontAwesome
            name="check-circle"
            size={metrics.width * 0.25}
            color="green"
          />
          <Text style={styles.ModalHeadText}>THANK YOU!</Text>
          <Text style={styles.ModalSubText}>
            Your Booking has been scheduled!
          </Text>
        </View>
      </Overlay>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    userOrder: state.UserOrderReducer,
  };
};

export default connect(mapStateToProps, {setUserOrderAction})(Booking);

const styles = StyleSheet.create({
  underline: {
    borderWidth: 1.5,
    width: metrics.width * 0.22,
    elevation: 1,
    marginTop: 2,
  },
  ModalSubText: {
    fontSize: metrics.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalHeadText: {
    fontSize: metrics.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalWrapper: {
    paddingVertical: metrics.height * 0.04,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.width * 0.8,
  },
  confirmButton: {
    width: metrics.width,
    paddingVertical: metrics.height * 0.015,
    borderRadius: 0,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneErrorMsg: {
    marginLeft: 10,
    color: 'red',
    marginBottom: -8,
  },
  phoneIcon: {width: '11%', textAlign: 'center', color: colors.primary},
  phoneInput: {
    width: '89%',
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  PhoneInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  PhoneWrapper: {
    marginVertical: metrics.height * 0.01,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  ApartmentText: {
    marginLeft: 10,
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 15,
  },
  ApartmentPicker: {
    marginTop: metrics.height * 0.03,
  },
  sliderTrack: {
    backgroundColor: colors.primary,
    color: colors.primary,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 4,
    elevation: 5,
  },
  DateButton: {width: '40%'},
  DateText: {fontWeight: 'bold', color: colors.darkGray, fontSize: 17},
  DateWrapper: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  DatePickerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: metrics.height * 0.03,
  },
  DateTimeHeading: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 25,
    textShadowColor: '#bdbdbd',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  DateTimePickerWrapper: {
    marginTop: metrics.height * 0.05,
  },
  SchedulePickerWrapper: {
    paddingHorizontal: metrics.width * 0.05,
    marginTop: -20,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  descWrapper: {
    marginTop: 4,
    width: metrics.width * 0.415,
  },
  RatingWrapper: {marginTop: 4},
  RatingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: '#585858',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  TextWrapper: {
    marginTop: -15,
    marginLeft: 15,
  },
  Heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#bcbcbc',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    width: metrics.width * 0.5,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
    resizeMode: 'contain',
    overflow: 'hidden',
    transform: [
      {scaleX: metrics.width * 0.006},
      {scaleY: metrics.width * 0.006},
    ],
  },
  ImageWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 20,
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
    transform: [
      {scaleY: metrics.width * 0.007},
      {scaleX: metrics.width * 0.007},
    ],
  },
  ellipseOverlay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    bottom: 20,
    transform: [
      {scaleY: metrics.width * 0.007},
      {scaleX: metrics.width * 0.007},
    ],
  },
  backgroundColorOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  BannerWrapper: {
    height: metrics.height * 0.35,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
});
