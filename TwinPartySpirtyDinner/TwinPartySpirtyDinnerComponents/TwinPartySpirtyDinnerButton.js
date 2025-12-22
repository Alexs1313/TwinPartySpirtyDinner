import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TwinPartySpirtyDinnerButton = ({ onPress, propText }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.twinPartySpirtyBtn}
      onPress={() => onPress()}
    >
      <Text style={styles.twinPartySpirtyBtnText}>{propText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  twinPartySpirtyBtn: {
    width: 191,
    height: 79,
    backgroundColor: '#31FFCF',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twinPartySpirtyBtnText: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default TwinPartySpirtyDinnerButton;
