import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';

const TwinPartySpirtyDinnerInfo = () => {
  const handleShareTwinPartySpirtyDinner = () => {
    Share.share({
      message:
        'Twin Party is an offline party app for friends. Put your phone on the table and start the evening.',
    });
  };

  const handleRateTwinPartySpirtyDinner = () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/twin-party-spirty-dinner/id6756870400',
    );
  };

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.containerTwinPartySpirtyDinner}>
        <Text style={styles.titleTwinPartySpirtyDinner}>INFORMATION</Text>

        <Image
          source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyLogo.png')}
          style={styles.iconTwinPartySpirtyDinner}
        />

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTextTwinPartySpirtyDinner}>
            Twin Party is an offline app for a group of friends where your phone
            becomes the host of the evening.
            {'\n\n'}
            The app offers simple rounds of questions and actions that help you
            quickly create an atmosphere and get everyone involved at the table.
            No complicated rules, no preparation, and no breaks.
            {'\n\n'}
            Twin Party does not require internet, accounts, or registration. We
            do not collect or store any personal data — everything happens
            locally on your device.
          </Text>
        </View>

        <View style={styles.buttonsRowTwinPartySpirtyDinner}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonTwinPartySpirtyDinner}
            onPress={handleShareTwinPartySpirtyDinner}
          >
            <Text style={styles.buttonTextTwinPartySpirtyDinner}>SHARE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonTwinPartySpirtyDinner}
            onPress={handleRateTwinPartySpirtyDinner}
          >
            <Text style={styles.buttonTextTwinPartySpirtyDinner}>RATE APP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const styles = StyleSheet.create({
  containerTwinPartySpirtyDinner: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 85,
    paddingBottom: 135,
  },
  titleTwinPartySpirtyDinner: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 30,
  },
  iconTwinPartySpirtyDinner: {
    marginBottom: 13,
  },
  cardTwinPartySpirtyDinner: {
    width: '86%',
    backgroundColor: '#23113C',
    borderRadius: 24,
    padding: 22,
    marginBottom: 30,
  },
  cardTextTwinPartySpirtyDinner: {
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonsRowTwinPartySpirtyDinner: {
    flexDirection: 'row',
    gap: 20,
  },
  buttonTwinPartySpirtyDinner: {
    width: 143,
    height: 79,
    backgroundColor: '#31FFCF',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextTwinPartySpirtyDinner: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
});

export default TwinPartySpirtyDinnerInfo;
