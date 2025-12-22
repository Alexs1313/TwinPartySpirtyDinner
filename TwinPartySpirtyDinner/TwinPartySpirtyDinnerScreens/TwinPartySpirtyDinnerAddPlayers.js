import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';
import WebView from 'react-native-webview';
import { twinPartySpirtyDinnerLoaderHTML } from '../TwinPartySpirtyDinnerConsts/twinPartySpirtyDinnerLoaderHTML';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUESTION_PARTY_SPIRTY = [
  'Who sets the pace of the evening today?',
  'Who is the most unpredictable right now?',
  'Who is the fastest to get into the game?',
  'Who is clearly in the mood today?',
  'Who can make everyone laugh in 10 seconds?',
  'Who looks the most confident right now?',
  'Who would be the first to start improvising?',
  'Who is the main engine of the company today?',
  'Who sits the least still?',
  'Who looks like the leader of the party today?',
];

const QUESTION_CHILL_SPIRTY = [
  'Who is the calmest today?',
  'Who looks the most relaxed?',
  'Who is at their own pace right now?',
  'Who is listening more than talking today?',
  'Who is just enjoying the moment right now?',
  'Who looks thoughtful?',
  'Who looks the most balanced?',
  'Who is the least stressed?',
];

const ACTION_PARTY_SPIRTY = [
  'Show maximum joy',
  'Make a pompous pose',
  'Show surprise',
  'Pretend confidence',
  'Make an “ok” gesture',
];

const TwinPartySpirtyDinnerAddPlayers = ({ route, navigation }) => {
  const modeTwinPartySpirtyDinner = route?.params?.mode || 'PARTY';
  const [screenTwinPartySpirtyDinner, setScreenTwinPartySpirtyDinner] =
    useState('ADD_PLAYERS');
  const [playersTwinPartySpirtyDinner, setPlayersTwinPartySpirtyDinner] =
    useState([]);
  const [nameTwinPartySpirtyDinner, setNameTwinPartySpirtyDinner] =
    useState('');
  const [playerIdxTwinPartySpirtyDinner, setPlayerIdxTwinPartySpirtyDinner] =
    useState(0);
  const inputRefTwinPartySpirtyDinner = useRef(null);
  const sessionRefTwinPartySpirtyDinner = useRef(0);
  const [categoryTwinPartySpirtyDinner, setCategoryTwinPartySpirtyDinner] =
    useState('QUESTION');
  const [idxTwinPartySpirtyDinner, setIdxTwinPartySpirtyDinner] = useState(0);
  const [
    stepSecondsTwinPartySpirtyDinner,
    setStepSecondsTwinPartySpirtyDinner,
  ] = useState(15);

  const stepTimerRefTwinPartySpirtyDinner = useRef(null);

  useEffect(() => {
    const timerTwinPartySpirtyDinner = setInterval(async () => {
      sessionRefTwinPartySpirtyDinner.current += 1;

      const storedTwinPartySpirtyDinner = await AsyncStorage.getItem(
        'twin_party_total_time',
      );
      const totalTwinPartySpirtyDinner = storedTwinPartySpirtyDinner
        ? Number(storedTwinPartySpirtyDinner)
        : 0;

      await AsyncStorage.setItem(
        'twin_party_total_time',
        String(totalTwinPartySpirtyDinner + 1),
      );
    }, 1000);

    return () => clearInterval(timerTwinPartySpirtyDinner);
  }, []);

  const addPlayerTwinPartySpirtyDinner = () => {
    const trimmedTwinPartySpirtyDinner = nameTwinPartySpirtyDinner.trim();
    if (!trimmedTwinPartySpirtyDinner) return;

    setPlayersTwinPartySpirtyDinner(players => [
      ...players,
      trimmedTwinPartySpirtyDinner,
    ]);

    setNameTwinPartySpirtyDinner('');
    inputRefTwinPartySpirtyDinner.current?.clear();
  };

  const removePlayerTwinPartySpirtyDinner = indexTwinPartySpirtyDinner => {
    setPlayersTwinPartySpirtyDinner(players =>
      players.filter((_, idx) => idx !== indexTwinPartySpirtyDinner),
    );

    if (
      playerIdxTwinPartySpirtyDinner >= indexTwinPartySpirtyDinner &&
      playerIdxTwinPartySpirtyDinner > 0
    ) {
      setPlayerIdxTwinPartySpirtyDinner(idx => idx - 1);
    }
  };

  const startGameTwinPartySpirtyDinner = () => {
    if (playersTwinPartySpirtyDinner.length < 2) return;

    setPlayerIdxTwinPartySpirtyDinner(0);
    setIdxTwinPartySpirtyDinner(0);
    setCategoryTwinPartySpirtyDinner('QUESTION');

    setScreenTwinPartySpirtyDinner('LOADER');
    setTimeout(() => setScreenTwinPartySpirtyDinner('GAME'), 3000);
  };

  const listTwinPartySpirtyDinner =
    categoryTwinPartySpirtyDinner === 'QUESTION'
      ? modeTwinPartySpirtyDinner === 'PARTY'
        ? QUESTION_PARTY_SPIRTY
        : QUESTION_CHILL_SPIRTY
      : ACTION_PARTY_SPIRTY;

  useEffect(() => {
    if (screenTwinPartySpirtyDinner !== 'GAME') return;
    if (modeTwinPartySpirtyDinner !== 'PARTY') return;

    clearInterval(stepTimerRefTwinPartySpirtyDinner);
    setStepSecondsTwinPartySpirtyDinner(15);

    stepTimerRefTwinPartySpirtyDinner.current = setInterval(() => {
      setStepSecondsTwinPartySpirtyDinner(prevState => {
        if (prevState <= 1) {
          clearInterval(stepTimerRefTwinPartySpirtyDinner.current);
          onContinueTwinPartySpirtyDinner();
          return 15;
        }
        return prevState - 1;
      });
    }, 1000);

    return () => clearInterval(stepTimerRefTwinPartySpirtyDinner.current);
  }, [
    idxTwinPartySpirtyDinner,
    categoryTwinPartySpirtyDinner,
    screenTwinPartySpirtyDinner,
    modeTwinPartySpirtyDinner,
  ]);

  const onContinueTwinPartySpirtyDinner = () => {
    if (modeTwinPartySpirtyDinner === 'PARTY') {
      clearInterval(stepTimerRefTwinPartySpirtyDinner);
    }

    setIdxTwinPartySpirtyDinner(prev => prev + 1);

    if (modeTwinPartySpirtyDinner === 'PARTY') {
      setCategoryTwinPartySpirtyDinner(prev =>
        prev === 'QUESTION' ? 'ACTION' : 'QUESTION',
      );
    }
  };

  const currentPlayerTwinPartySpirtyDinner =
    playersTwinPartySpirtyDinner[
      idxTwinPartySpirtyDinner % playersTwinPartySpirtyDinner.length
    ];

  const stepProgressTwinPartySpirtyDinner =
    modeTwinPartySpirtyDinner === 'PARTY'
      ? (15 - stepSecondsTwinPartySpirtyDinner) / 15
      : 0;

  if (screenTwinPartySpirtyDinner === 'ADD_PLAYERS') {
    return (
      <TwinPartySpirtyDinnerBackground>
        <View style={styles.containerTwinPartySpirtyDinner}>
          <View style={styles.headerTwinPartySpirtyDinner}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyBack.png')}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitleTwinPartySpirtyDinner}>
              {modeTwinPartySpirtyDinner === 'PARTY'
                ? 'Party mode'
                : 'Chill mode'}
            </Text>
          </View>

          <View style={styles.playersCardTwinPartySpirtyDinner}>
            <Text style={styles.playersTitleTwinPartySpirtyDinner}>
              Players:
            </Text>

            {playersTwinPartySpirtyDinner.map((player, index) => (
              <View key={index} style={styles.playerRowTwinPartySpirtyDinner}>
                <View style={styles.playerInputTwinPartySpirtyDinner}>
                  <Text style={styles.playerTextTwinPartySpirtyDinner}>
                    {player}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.iconBtnTwinPartySpirtyDinner}
                  onPress={() => removePlayerTwinPartySpirtyDinner(index)}
                >
                  <Image
                    source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyMinus.png')}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.playerRowTwinPartySpirtyDinner}>
              <TextInput
                value={nameTwinPartySpirtyDinner}
                ref={inputRefTwinPartySpirtyDinner}
                onChangeText={setNameTwinPartySpirtyDinner}
                placeholder="Player name"
                placeholderTextColor="#6F5FA1"
                style={styles.playerInputTwinPartySpirtyDinner}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.iconBtnTwinPartySpirtyDinner}
                onPress={addPlayerTwinPartySpirtyDinner}
              >
                <Image
                  source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyPlus.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          {playersTwinPartySpirtyDinner.length >= 2 && (
            <View style={styles.startWrapperTwinPartySpirtyDinner}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.startBtnTwinPartySpirtyDinner}
                onPress={startGameTwinPartySpirtyDinner}
              >
                <Text style={styles.startTextTwinPartySpirtyDinner}>START</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TwinPartySpirtyDinnerBackground>
    );
  }

  if (screenTwinPartySpirtyDinner === 'LOADER') {
    return (
      <TwinPartySpirtyDinnerBackground>
        <View style={styles.loaderContainerTwinPartySpirtyDinner}>
          <WebView
            originWhitelist={['*']}
            source={{ html: twinPartySpirtyDinnerLoaderHTML }}
            style={styles.loaderWebViewTwinPartySpirtyDinner}
            scrollEnabled={false}
          />
        </View>
      </TwinPartySpirtyDinnerBackground>
    );
  }

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.containerTwinPartySpirtyDinner}>
        <View style={styles.categoryCardTwinPartySpirtyDinner}>
          <Text style={styles.categoryTitleTwinPartySpirtyDinner}>
            Category:
          </Text>
          <Text style={styles.categoryTextTwinPartySpirtyDinner}>
            {categoryTwinPartySpirtyDinner}
          </Text>
        </View>

        <View style={styles.playerBadgeTwinPartySpirtyDinner}>
          <Text style={styles.playerNameTwinPartySpirtyDinner}>
            {currentPlayerTwinPartySpirtyDinner}
          </Text>
        </View>

        {modeTwinPartySpirtyDinner === 'PARTY' && (
          <View style={styles.progressBarTwinPartySpirtyDinner}>
            <View
              style={[
                styles.progressFillTwinPartySpirtyDinner,
                { width: `${stepProgressTwinPartySpirtyDinner * 100}%` },
              ]}
            />
          </View>
        )}

        <View style={styles.cardTwinPartySpirtyDinner}>
          <Text style={styles.cardTextTwinPartySpirtyDinner}>
            {
              listTwinPartySpirtyDinner[
                idxTwinPartySpirtyDinner % listTwinPartySpirtyDinner.length
              ]
            }
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.continueBtnTwinPartySpirtyDinner}
          onPress={onContinueTwinPartySpirtyDinner}
        >
          <Text style={styles.continueTextTwinPartySpirtyDinner}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.homeBtnTwinPartySpirtyDinner}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.homeTextTwinPartySpirtyDinner}>HOME</Text>
        </TouchableOpacity>
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

export default TwinPartySpirtyDinnerAddPlayers;

const styles = StyleSheet.create({
  containerTwinPartySpirtyDinner: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  headerTwinPartySpirtyDinner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  headerTitleTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  loaderContainerTwinPartySpirtyDinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWebViewTwinPartySpirtyDinner: {
    width: 360,
    height: 260,
    backgroundColor: 'transparent',
  },
  playersCardTwinPartySpirtyDinner: {
    backgroundColor: '#23113C',
    borderRadius: 24,
    padding: 20,
  },
  playersTitleTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  playerRowTwinPartySpirtyDinner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  playerInputTwinPartySpirtyDinner: {
    flex: 1,
    height: 61,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#31FFCF',
    justifyContent: 'center',
    paddingHorizontal: 18,
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  playerTextTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  iconBtnTwinPartySpirtyDinner: {
    width: 61,
    height: 61,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  iconTextTwinPartySpirtyDinner: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
  },
  startWrapperTwinPartySpirtyDinner: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  startBtnTwinPartySpirtyDinner: {
    height: 79,
    borderRadius: 26,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    alignSelf: 'center',
    marginTop: 20,
  },
  startTextTwinPartySpirtyDinner: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  categoryCardTwinPartySpirtyDinner: {
    backgroundColor: '#23113C',
    borderRadius: 23,
    paddingHorizontal: 12,
    height: 90,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  categoryTextTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryTitleTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  playerBadgeTwinPartySpirtyDinner: {
    borderWidth: 1,
    borderColor: '#31FFCF',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 16,
  },
  playerNameTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarTwinPartySpirtyDinner: {
    width: '100%',
    height: 10,
    borderRadius: 6,
    backgroundColor: '#2E1A4F',
    overflow: 'hidden',
    marginBottom: 22,
    padding: 2,
    borderWidth: 1,
    borderColor: '#31FFCF',
  },
  progressFillTwinPartySpirtyDinner: {
    height: '100%',
    backgroundColor: '#31FFCF',
  },
  cardTwinPartySpirtyDinner: {
    backgroundColor: '#23113C',
    borderRadius: 23,
    padding: 30,
    marginBottom: 80,
    marginTop: 20,
  },
  cardTextTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  continueBtnTwinPartySpirtyDinner: {
    height: 79,
    width: 280,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  continueTextTwinPartySpirtyDinner: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
  },
  homeBtnTwinPartySpirtyDinner: {
    height: 79,
    width: 188,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#31FFCF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  homeTextTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
