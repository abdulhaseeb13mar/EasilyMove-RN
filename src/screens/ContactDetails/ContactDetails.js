import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {metrics, scaleFont, colors} from '../../shared/Theme';
import {Button, Overlay} from 'react-native-elements';
import {isFormValid} from './Validation';
import NavigationRef from '../../shared/RefNavigation';
import {setUserInfoAction} from '../../store/actions';

const ContactDetails = (props) => {
  const [name, setName] = useState('');
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const confirmBooking = () => {
    const formValidResponse = isFormValid(name, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setShowModal(true);
      setUserInfoAction({
        name: name,
        email: email,
        phone: phone,
        address: address,
      });
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'name') {
      setNameErrMsg(errMsg);
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setNameErrMsg('');
      setEmailErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    NavigationRef.Push('Home');
  };

  const changeName = (t) => setName(t);
  const changeEmail = (t) => setEmail(t);
  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const goBack = () => NavigationRef.NavigateAndReset('Home');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome
              name="arrow-left"
              color="white"
              size={metrics.width * 0.06}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.HeaderText}>Booking Details</Text>
          </View>
        </View>
        <View style={styles.bookingDetailsCenterOverlay}>
          <View style={styles.bookingDetailHeaderWrapper}>
            <Text style={styles.detailsHeading}>
              {props.userOrder.ServiceName}
            </Text>
          </View>
          <View style={styles.bookingDetailsWrapper}>
            <View style={styles.DetailWrapper}>
              <Text style={styles.DetailName}>Rooms</Text>
              <Text style={styles.DetailValue}>{props.userOrder.Rooms}</Text>
            </View>
            <View style={styles.DetailWrapper}>
              <Text style={styles.DetailName}>Date</Text>
              <Text style={styles.DetailValue}>{props.userOrder.Date}</Text>
            </View>
            <View style={styles.DetailWrapper}>
              <Text style={styles.DetailName}>Time</Text>
              <Text style={styles.DetailValue}>{props.userOrder.Time}</Text>
            </View>
          </View>
        </View>
        <View style={styles.personalInfoWrapper}>
          <Text style={styles.personalInfoHeader}>Personal Info</Text>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: nameErrMsg ? 'red' : colors.primary,
              }}>
              NAME <Text> {nameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="person"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Name"
                style={styles.Input}
                onChangeText={changeName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'red' : colors.primary,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="email"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'red' : colors.primary,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="phone-iphone"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'red' : colors.primary,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="location-pin"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Address"
                style={styles.Input}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM BOOKING"
            raised
            buttonStyle={styles.confirmButton}
            containerStyle={styles.confirmButtonContainer}
            onPress={confirmBooking}
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
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    userOrder: state.UserOrderReducer,
  };
};

export default connect(mapStateToProps, {setUserInfoAction})(
  React.memo(ContactDetails),
);
// const border = {
//   borderColor: 'red',
//   borderWidth: 1,
// };
const styles = StyleSheet.create({
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
  confirmButtonContainer: {width: '100%', elevation: 5},
  confirmButton: {
    backgroundColor: colors.primary,
    padding: metrics.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: metrics.width * 0.035,
  },
  Input: {
    width: '93%',
    padding: 7,
  },
  inputIcon: {
    width: '7%',
    color: colors.primary,
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.height * 0.004,
  },
  personalInfoHeadingName: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  PersonalInfoWrapper: {
    marginHorizontal: metrics.width * 0.035,
    marginVertical: 20,
  },
  personalInfoHeader: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },
  personalInfoWrapper: {
    marginHorizontal: metrics.width * 0.035,
  },
  bookingDetailHeaderWrapper: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    width: '70%',
  },
  detailsHeading: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  DetailValue: {
    color: colors.darkGray,
    fontSize: scaleFont(12.5),
    fontWeight: 'bold',
  },
  bookingDetailsWrapper: {
    borderColor: '#edeef0',
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    padding: 10,
    marginVertical: metrics.height * 0.01,
  },
  DetailName: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },
  DetailWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: metrics.height * 0.006,
  },
  bookingDetailsCenterOverlay: {
    marginVertical: metrics.height * 0.01,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    marginLeft: metrics.width * 0.23,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: scaleFont(20),
  },
  container: {flex: 1},
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: metrics.width * 0.03,
    paddingVertical: metrics.height * 0.018,
    backgroundColor: colors.primary,
    elevation: 10,
  },
});
