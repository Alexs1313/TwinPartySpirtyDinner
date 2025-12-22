import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TwinPartySpirtyDinnerHome from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerHome';
import TwinPartySpirtyDinnerRules from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerRules';
import TwinPartySpirtyDinnerInfo from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerInfo';
import TwinPartySpirtyDinnerMoments from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerMoments';

const Tab = createBottomTabNavigator();

const TwinPartySpirtyDinnerTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.winnetaGolfTabs,
        tabBarActiveTintColor: '#31FFCF',
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tab.Screen
        name="TwinPartySpirtyDinnerHome"
        component={TwinPartySpirtyDinnerHome}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab1.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TwinPartySpirtyDinnerRules"
        component={TwinPartySpirtyDinnerRules}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab2.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TwinPartySpirtyDinnerMoments"
        component={TwinPartySpirtyDinnerMoments}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab3.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TwinPartySpirtyDinnerInfo"
        component={TwinPartySpirtyDinnerInfo}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab4.png')}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  winnetaGolfTabs: {
    marginHorizontal: 30,
    elevation: 0,
    paddingTop: 24,
    paddingBottom: 2,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 35,
    borderRadius: 23,
    paddingHorizontal: 1,
    borderTopColor: 'transparent',
    borderTopWidth: 1,
    backgroundColor: '#23113C',
    height: 90,
  },
});

export default TwinPartySpirtyDinnerTab;
