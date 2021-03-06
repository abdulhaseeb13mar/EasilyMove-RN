import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Slider} from 'react-native-elements';
import {colors, metrics} from '../../shared/Theme';
import StarRating from '../../components/starRating/starRating';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {connect} from 'react-redux';
import {setUserOrderAction} from '../../store/actions';
import NavigationRef from '../../shared/RefNavigation';
import {useFocusEffect} from '@react-navigation/native';
import CalendarStrip from 'react-native-calendar-strip';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Booking(props) {
  const job = props.route.params;
  const [date, setDate] = useState(new Date());
  const [sliderValue, setSliderValue] = useState(1);
  const [dateErrMsg, setDateErrMsg] = useState('');
  const [availableTimes, setAvailableTimes] = useState([
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
  ]);
  const [time, setTime] = useState(availableTimes[0]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setDateErrMsg('');
      };
    }, []),
  );

  const proceedToBookings = () => {
    let isValid = checkValidation();
    if (!isValid) return;
    const details = {
      Date: `${date.getDate()}-${
        date.getMonth() + 1 <= 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      }-${date.getFullYear()}`,
      Time: time,
      Rooms: sliderValue,
      ServiceName: job.subcategoryname,
    };
    props.setUserOrderAction(details);
    NavigationRef.Navigate('ContactDetails');
  };

  const checkValidation = () => {
    clearAllErrMsgs();
    let flag = true;
    let selectedDate = new Date(date);
    let formatSelectedDate = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1 <= 10
        ? '0' + (selectedDate.getMonth() + 1)
        : selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;
    let currentDate = new Date();
    let formatCurrentDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1 <= 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    if (new Date(formatSelectedDate) < new Date(formatCurrentDate)) {
      setDateErrMsg('Select a valid Date');
      flag = false;
    }
    return flag;
  };

  const changeAvailableTime = (t) => setTime(t);
  const ChangeDate = (d) => setDate(new Date(d));
  const clearAllErrMsgs = () => setDateErrMsg('');
  const onSliderChange = (val) => setSliderValue(val);

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
              <StarRating rating={job.rating} size={100} />
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
              <View style={{flex: 1}}>
                {dateErrMsg ? (
                  <Text style={styles.dateErrorMsg}>{'* ' + dateErrMsg}</Text>
                ) : null}
                <CalendarStrip
                  scrollable={false}
                  style={{height: metrics.width * 0.29}}
                  calendarHeaderStyle={styles.calendarHeaderStyle}
                  dayContainerStyle={styles.dayContainerStyle}
                  highlightDateNameStyle={styles.highlightDateNameStyle}
                  highlightDateNumberStyle={styles.highlightDateNumberStyle}
                  calendarAnimation={{type: 'sequence', duration: 50}}
                  dateNumberStyle={styles.dateNumberStyle}
                  dateNameStyle={styles.dateNameStyle}
                  iconContainer={{flex: 0.1}}
                  onDateSelected={ChangeDate}
                  selectedDate={date}
                  minDate={new Date()}
                  daySelectionAnimation={{
                    type: 'border',
                    duration: 100,
                    borderWidth: 1,
                    borderHighlightColor: 'red',
                  }}
                  maxDate={
                    new Date(`${new Date().getFullYear()}-12-31 00:00:00`)
                  }
                />
              </View>
            </View>

            <View style={styles.TimePickerWrapper}>
              {availableTimes.map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => changeAvailableTime(t)}
                  style={styles.availableTimeButton}>
                  <Text
                    style={{
                      ...styles.availableTimeText,
                      color: time === t ? colors.primary : colors.darkGray,
                    }}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.ConfirmButtonWrapper}>
        <Button
          title="Proceed To Booking"
          buttonStyle={styles.confirmButton}
          onPress={proceedToBookings}
          icon={
            <FontAwesome
              name="arrow-right"
              color="white"
              size={metrics.width * 0.05}
              style={{marginLeft: metrics.width * 0.02}}
            />
          }
          iconRight
        />
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    userOrder: state.UserOrderReducer,
  };
};

export default connect(mapStateToProps, {setUserOrderAction})(
  React.memo(Booking),
);

const styles = StyleSheet.create({
  availableTimeButton: {
    borderRadius: 5,
    borderColor: '#edeef0',
    borderWidth: 1,
    padding: metrics.width * 0.02,
  },
  dateNameStyle: {
    color: colors.darkGray,
    fontSize: metrics.width * 0.032,
  },
  dateNumberStyle: {
    color: colors.darkGray,
    fontSize: metrics.width * 0.032,
  },
  highlightDateNumberStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: metrics.width * 0.032,
  },
  highlightDateNameStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: metrics.width * 0.032,
  },
  dayContainerStyle: {
    borderColor: '#edeef0',
    borderWidth: 1,
    width: 40,
    height: 70,
    borderRadius: 7,
  },
  calendarHeaderStyle: {
    color: colors.darkGray,
    fontSize: 17,
  },
  availableTimeText: {
    fontWeight: 'bold',
    fontSize: metrics.width * 0.042,
  },
  underline: {
    borderWidth: 1.5,
    width: metrics.width * 0.22,
    elevation: 1,
    marginTop: 2,
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
  dateErrorMsg: {
    marginLeft: 10,
    color: 'red',
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
    justifyContent: 'space-evenly',
    marginVertical: metrics.height * 0.02,
    paddingVertical: metrics.height * 0.013,
  },
  TimePickerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
