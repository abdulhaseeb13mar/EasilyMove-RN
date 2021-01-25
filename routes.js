import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/shared/RefNavigation';
import Home from './src/screens/Home/Home';
import Bookings from './src/screens/Booking/Booking';

const Stack = createStackNavigator();

export default function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bookings" component={Bookings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
