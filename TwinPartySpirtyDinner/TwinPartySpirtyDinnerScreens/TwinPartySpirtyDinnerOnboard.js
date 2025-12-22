import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TwinPartySpirtyDinnerButton from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerButton';

const TwinPartySpirtyDinnerOnboard = () => {
  const [currentTwinPartySlideIdx, setCurrentTwinPartySlideIdx] = useState(0);
  const navigation = useNavigation();

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.twinPartySpirtyContainer}>
        {currentTwinPartySlideIdx === 0 && (
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb1.png')}
          />
        )}
        {currentTwinPartySlideIdx === 1 && (
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb2.png')}
          />
        )}
        {currentTwinPartySlideIdx === 2 && (
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb3.png')}
          />
        )}
        {currentTwinPartySlideIdx === 3 && (
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyOnb4.png')}
          />
        )}

        <Text
          style={[
            styles.twinPartySpirtyWelcText,
            currentTwinPartySlideIdx === 2 && { marginTop: 150 },
          ]}
        >
          {currentTwinPartySlideIdx === 0 &&
            `Gather your friends, put your phone on the table and start the game. Twin Party is quick rounds where everyone participates.`}
          {currentTwinPartySlideIdx === 1 &&
            `Questions, actions automatically. Nobody drops out — everyone is in the game.`}
          {currentTwinPartySlideIdx === 2 &&
            `Play for a few minutes and an additional task will open. Take a photo of the evening or just skip it.`}
          {currentTwinPartySlideIdx === 3 &&
            `Works without the Internet. No accounts. No data collection. Just you and the evening.`}
        </Text>

        <TwinPartySpirtyDinnerButton
          onPress={() =>
            currentTwinPartySlideIdx === 3
              ? navigation.replace('TwinPartySpirtyDinnerTab')
              : setCurrentTwinPartySlideIdx(currentTwinPartySlideIdx + 1)
          }
          propText={[
            currentTwinPartySlideIdx === 0 && 'GOOD',
            currentTwinPartySlideIdx === 1 && 'NICE',
            currentTwinPartySlideIdx === 2 && 'CONTINUE',
            currentTwinPartySlideIdx === 3 && 'START',
          ]}
        />
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const styles = StyleSheet.create({
  twinPartySpirtyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
  },
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
  twinPartySpirtyWelcText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 90,
    paddingHorizontal: 40,
  },
});

export default TwinPartySpirtyDinnerOnboard;
