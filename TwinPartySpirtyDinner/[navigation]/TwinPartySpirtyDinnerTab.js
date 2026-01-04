import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TwinPartySpirtyDinnerHome from '../[screens]/TwinPartySpirtyDinnerHome';
import TwinPartySpirtyDinnerRules from '../[screens]/TwinPartySpirtyDinnerRules';
import TwinPartySpirtyDinnerInfo from '../[screens]/TwinPartySpirtyDinnerInfo';
import TwinPartySpirtyDinnerMoments from '../[screens]/TwinPartySpirtyDinnerMoments';

const Tabs = createBottomTabNavigator();

const ICONS = {
  home: require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab1.png'),
  rules: require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab2.png'),
  moments: require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab3.png'),
  info: require('../../assets/twinPartySpirtyDinnerImages/twinPartyTab4.png'),
};

const TwinPartySpirtyDinnerTab = () => {
  const renderTabIcon = (key, color) => {
    try {
      const src = ICONS[key];
      return (
        <Image source={src} style={[navStyles.icon, { tintColor: color }]} />
      );
    } catch (err) {
      console.warn('icon failed', key, err);
      return <View style={[navStyles.icon, { backgroundColor: '#333' }]} />;
    }
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: navStyles.tabBar,
        tabBarActiveTintColor: '#31FFCF',
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="TwinPartySpirtyDinnerHome"
        component={TwinPartySpirtyDinnerHome}
        options={{
          tabBarIcon: ({ color }) => renderTabIcon('home', color),
          tabBarAccessibilityLabel: 'Home tab',
        }}
        listeners={{
          tabPress: () => console.log('Home pressed!'),
        }}
      />

      <Tabs.Screen
        name="TwinPartySpirtyDinnerRules"
        component={TwinPartySpirtyDinnerRules}
        options={{
          tabBarIcon: ({ color }) => renderTabIcon('rules', color),
          tabBarAccessibilityLabel: 'Rules tab',
        }}
        listeners={{
          tabPress: () => console.log('Rules pressed!'),
        }}
      />

      <Tabs.Screen
        name="TwinPartySpirtyDinnerMoments"
        component={TwinPartySpirtyDinnerMoments}
        options={{
          tabBarIcon: ({ color }) => renderTabIcon('moments', color),
          tabBarAccessibilityLabel: 'Moments tab',
        }}
        listeners={{
          tabPress: () => console.log('Moments pressed!'),
        }}
      />

      <Tabs.Screen
        name="TwinPartySpirtyDinnerInfo"
        component={TwinPartySpirtyDinnerInfo}
        options={{
          tabBarIcon: ({ color }) => renderTabIcon('info', color),
          tabBarAccessibilityLabel: 'Info tab',
        }}
        listeners={{
          tabPress: () => console.log('Info pressed!'),
        }}
      />
    </Tabs.Navigator>
  );
};

const navStyles = StyleSheet.create({
  tabBar: {
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
  icon: {
    width: 41,
    height: 41,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default TwinPartySpirtyDinnerTab;
