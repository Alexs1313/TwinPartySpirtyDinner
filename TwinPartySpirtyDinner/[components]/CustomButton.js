import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress = () => {}, propText = '' }) => {
  const handlePress = () => {
    try {
      console.log('pressed btn ->', propText);
      onPress();
    } catch (err) {
      console.warn('onPress failed', err);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={sty.wrap}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={propText || 'button'}
    >
      <Text style={sty.copy}>{propText}</Text>
    </TouchableOpacity>
  );
};

const sty = StyleSheet.create({
  wrap: {
    width: 191,
    height: 79,
    backgroundColor: '#31FFCF',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default CustomButton;
