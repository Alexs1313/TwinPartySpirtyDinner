import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../[components]/CustomButton';
import Background from '../[components]/Background';

const SLIDE_IMAGES = [
  require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb1.png'),
  require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb2.png'),
  require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb3.png'),
  require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb4.png'),
];

const SLIDE_TEXTS = [
  `Gather your friends, put your phone on the table and start the game. Twin Party is quick rounds where everyone participates.`,
  `Questions, actions automatically. Nobody drops out — everyone is in the game.`,
  `Play for a few minutes and an additional task will open. Take a photo of the evening or just skip it.`,
  `Works without the Internet. No accounts. No data collection. Just you and the evening.`,
];

const LABELS = ['GOOD', 'NICE', 'CONTINUE', 'START'];

const TwinPartySpirtyDinnerOnboard = () => {
  const [slate, setSlate] = useState(0);
  const nav = useNavigation();

  useEffect(() => {
    console.log('slate =>', slate);
  }, [slate]);

  useEffect(() => {
    if (slate === SLIDE_TEXTS.length - 1) {
      AsyncStorage.setItem('twin_onboard_seen', '1').catch(err =>
        console.warn('fail', err),
      );
    }
  }, [slate]);

  const onPressPrimary = async () => {
    if (slate < SLIDE_TEXTS.length - 1) {
      setSlate(s => s + 1);
    } else {
      try {
        await AsyncStorage.setItem('twin_onboard_seen', '1');
      } catch (e) {
        console.warn('[Onboard] final save failed', e);
      }

      try {
        nav.replace('TwinPartySpirtyDinnerTab');
      } catch (e) {
        nav.navigate('TwinPartySpirtyDinnerTab');
      }
    }
  };

  const onImageTap = () => {
    if (slate < SLIDE_TEXTS.length - 1) {
      setSlate(s => s + 1);
    }
  };

  const primaryLabel = LABELS[slate] || 'OK';

  return (
    <Background>
      <View style={s.shell}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onImageTap}
          style={s.imageWrap}
        >
          <Image source={SLIDE_IMAGES[slate]} />
        </TouchableOpacity>

        <Text style={[s.copy, slate === 2 && { marginTop: 150 }]}>
          {SLIDE_TEXTS[slate]}
        </Text>

        <CustomButton onPress={onPressPrimary} propText={primaryLabel} />
      </View>
    </Background>
  );
};

// стилі

const s = StyleSheet.create({
  shell: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
  },
  imageWrap: {
    alignItems: 'center',
  },
  copy: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 90,
    paddingHorizontal: 40,
  },
  debugRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 6,
  },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 6,
    backgroundColor: '#2E1A4F',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#31FFCF',
  },
  smallBtnText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default TwinPartySpirtyDinnerOnboard;
