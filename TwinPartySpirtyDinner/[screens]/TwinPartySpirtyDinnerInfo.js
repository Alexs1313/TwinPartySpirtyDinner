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
import Background from '../[components]/Background';

const TwinPartySpirtyDinnerInfo = () => {
  const shareTheVibe = async () => {
    try {
      console.log('share trigg');
      await Share.share({
        message:
          'Twin Party is an offline party app for friends. Put your phone on the table and start the evening.',
      });
      console.log('completed!!');
    } catch (err) {
      console.warn('share errr=>', err);
    }
  };

  const openStorePage = async () => {
    const url =
      'https://apps.apple.com/us/app/twin-party-spirty-dinner/id6756870400';
    try {
      console.log('opening store url', url);
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        console.warn('cannot open url', url);
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      console.error('rate failed', err);
    }
  };

  return (
    <Background>
      <View style={sty.shell}>
        <Text style={sty.heading}>INFORMATION</Text>

        <Image
          source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyLogo.png')}
          style={sty.logoImg}
          accessible
          accessibilityLabel="Twin Party Logo"
        />

        <View style={sty.infoCard}>
          <Text style={sty.bodyText}>
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

        <View style={sty.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[sty.actionBtn, sty.actionBtnLeft]}
            onPress={shareTheVibe}
            accessibilityLabel="Share Twin Party"
          >
            <Text style={sty.actionText}>SHARE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={sty.actionBtn}
            onPress={openStorePage}
            accessibilityLabel="Rate Twin Party"
          >
            <Text style={sty.actionText}>RATE APP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const sty = StyleSheet.create({
  shell: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 85,
    paddingBottom: 135,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 30,
  },
  logoImg: {
    marginBottom: 13,
  },
  infoCard: {
    width: '86%',
    backgroundColor: '#23113C',
    borderRadius: 24,
    padding: 22,
    marginBottom: 30,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 143,
    height: 79,
    backgroundColor: '#31FFCF',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnLeft: {
    marginRight: 20,
  },
  actionText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
});

export default TwinPartySpirtyDinnerInfo;
