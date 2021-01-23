import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigator from './src/shared/RefNavigation';
import Home from './src/screens/Home/Home';
import Products from './src/screens/Products/Products';
import Bookings from './src/screens/Booking/Booking';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './src/shared/Theme';

const Tab = createBottomTabNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{showLabel: false, activeTintColor: 'red'}}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              tabBarIconHandler(
                MaterialCommunityIcons,
                'circle-slice-6',
                focused,
                colors.orange,
                20,
              ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              tabBarIconHandler(
                FontAwesomeIcons,
                'calendar-plus-o',
                focused,
                colors.orange,
                16,
              ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={Products}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              tabBarIconHandler(
                MaterialCommunityIcons,
                'emoticon-happy-outline',
                focused,
                colors.orange,
                20,
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const tabBarIconHandler = (Comp, name, focused, color, size) => (
  <Comp
    name={name}
    color={focused ? color : '#dcdcdc'}
    size={focused ? size + 5 : size}
  />
);

export default Routes;
