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

const QUESTIONS_PARTY = [
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

const QUESTIONS_CHILL = [
  'Who is the calmest today?',
  'Who looks the most relaxed?',
  'Who is at their own pace right now?',
  'Who is listening more than talking today?',
  'Who is just enjoying the moment right now?',
  'Who looks thoughtful?',
  'Who looks the most balanced?',
  'Who is the least stressed?',
];

const ACTIONS_PARTY = [
  'Show maximum joy',
  'Make a pompous pose',
  'Show surprise',
  'Pretend confidence',
  'Make an “ok” gesture',
];

const SCREEN_ADD = 'ADD_PLAYERS';
const SCREEN_LOADER = 'LOADER';
const SCREEN_GAME = 'GAME';

const CATEGORY_QUESTION = 'QUESTION';
const CATEGORY_ACTION = 'ACTION';

const STEP_DEFAULT_SECONDS = 15;
const MAX_PLAYERS = 4;

const TwinPartySpirtyDinnerLineup = ({ route, navigation }) => {
  const mode = route?.params?.mode || 'PARTY';
  const isPartyMode = mode === 'PARTY';

  // стейти ------------------>

  const [screen, setScreen] = useState(SCREEN_ADD);
  const [roster, setRoster] = useState([]);
  const [pendingName, setPendingName] = useState('');
  const [cursor, setCursor] = useState(0);
  const [phase, setPhase] = useState(CATEGORY_QUESTION);
  const [secondsLeft, setSecondsLeft] = useState(STEP_DEFAULT_SECONDS);

  // рефи ------------------>

  const nameInputRef = useRef(null);
  const sessionTickerRef = useRef(null);
  const roundTickerRef = useRef(null);

  // ефекти ------------------>

  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem('twin_party_players')
      .then(stored => {
        if (!alive) return;
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setRoster(parsed);
              console.log('Loaded roster!!!', parsed);
            }
          } catch (e) {
            console.warn('fail', e);
          }
        }
      })
      .catch(err => {
        console.warn('read error', err);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const tick = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('twin_party_total_time');

        const totalTime = storedTime ? Number(storedTime) : 0;
        await AsyncStorage.setItem(
          'twin_party_total_time',
          String(totalTime + 1),
        );
      } catch (err) {
        console.error('tick error =>', err);
      }
    };

    sessionTickerRef.current = setInterval(tick, 1000);

    return () => {
      if (sessionTickerRef.current) {
        clearInterval(sessionTickerRef.current);
        sessionTickerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('twin_party_players', JSON.stringify(roster)).catch(
      err => {
        console.warn('not save roster', err);
      },
    );
  }, [roster]);

  // функціЇ ------------------>

  const addParticipant = () => {
    const name = (pendingName || '').trim();
    if (!name) return;

    if (roster.length >= MAX_PLAYERS) {
      console.log('max players reached');
      return;
    }

    setRoster(prev => {
      const next = [...prev, name];

      return next;
    });

    setPendingName('');

    try {
      nameInputRef.current?.clear();
    } catch (e) {
      console.log('failed =>');
    }
  };

  const removeParticipant = idx => {
    setRoster(prev => {
      const next = prev.filter((_, i) => i !== idx);

      return next;
    });

    setCursor(prevCursor => {
      if (prevCursor >= idx && prevCursor > 0) {
        return prevCursor - 1;
      }
      return prevCursor;
    });
  };

  const kickOff = () => {
    if (roster.length < 2) {
      console.log('not enough');
      return;
    }

    setCursor(0);
    setPhase(CATEGORY_QUESTION);
    setSecondsLeft(STEP_DEFAULT_SECONDS);

    setScreen(SCREEN_LOADER);

    setTimeout(() => {
      setScreen(SCREEN_GAME);
    }, 3000);
  };

  const currentPool =
    phase === CATEGORY_QUESTION
      ? isPartyMode
        ? QUESTIONS_PARTY
        : QUESTIONS_CHILL
      : ACTIONS_PARTY;

  useEffect(() => {
    if (screen !== SCREEN_GAME || !isPartyMode) return;

    if (roundTickerRef.current) {
      clearInterval(roundTickerRef.current);
      roundTickerRef.current = null;
    }
    setSecondsLeft(STEP_DEFAULT_SECONDS);

    roundTickerRef.current = setInterval(() => {
      setSecondsLeft(prevSecondsLeft => {
        if (prevSecondsLeft <= 1) {
          try {
            clearInterval(roundTickerRef.current);
            roundTickerRef.current = null;
          } catch (e) {}
          advanceTurn();
          return STEP_DEFAULT_SECONDS;
        }
        return prevSecondsLeft - 1;
      });
    }, 1000);

    return () => {
      if (roundTickerRef.current) {
        clearInterval(roundTickerRef.current);
        roundTickerRef.current = null;
      }
    };
  }, [screen, mode, cursor, phase]);

  const advanceTurn = () => {
    if (isPartyMode && roundTickerRef.current) {
      try {
        clearInterval(roundTickerRef.current);
      } catch (e) {}
      roundTickerRef.current = null;
    }

    setCursor(prevCursor => {
      const next = prevCursor + 1;

      return next;
    });

    if (isPartyMode) {
      setPhase(prev =>
        prev === CATEGORY_QUESTION ? CATEGORY_ACTION : CATEGORY_QUESTION,
      );
    }
  };

  const currentPlayer = roster.length > 0 ? roster[cursor % roster.length] : '';

  const stepProgress =
    isPartyMode && STEP_DEFAULT_SECONDS > 0
      ? (STEP_DEFAULT_SECONDS - secondsLeft) / STEP_DEFAULT_SECONDS
      : 0;

  const currentCardText =
    currentPool && currentPool.length
      ? currentPool[cursor % currentPool.length]
      : '';

  // ----------------- Рендер ------------------>

  if (screen === SCREEN_ADD) {
    return (
      <TwinPartySpirtyDinnerBackground>
        <View style={styles.shell}>
          <View style={styles.masthead}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.goBack();
                setRoster([]);
              }}
            >
              <Image
                source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyBack.png')}
              />
            </TouchableOpacity>

            <Text style={styles.heading}>
              {isPartyMode ? 'Party mode' : 'Chill mode'}
            </Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Players:</Text>

            {roster.map((p, i) => (
              <View key={`${p}-${i}`} style={styles.lineItem}>
                <View style={styles.nameHolder}>
                  <Text style={styles.nameDisplay}>{p}</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.minusBtn}
                  onPress={() => removeParticipant(i)}
                >
                  <Image
                    source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyMinus.png')}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.lineItem}>
              <TextInput
                value={pendingName}
                ref={nameInputRef}
                onChangeText={setPendingName}
                placeholder="Player name"
                placeholderTextColor="#6F5FA1"
                style={styles.entryField}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.plusBtn,
                  roster.length >= MAX_PLAYERS && styles.plusBtnDisabled,
                ]}
                onPress={addParticipant}
                disabled={roster.length >= MAX_PLAYERS}
              >
                <Image
                  source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyPlus.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          {roster.length >= 2 && (
            <View style={styles.kickoffWrap}>
              <TouchableOpacity
                style={styles.igniteBtn}
                activeOpacity={0.8}
                onPress={kickOff}
              >
                <Text style={styles.igniteText}>START</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TwinPartySpirtyDinnerBackground>
    );
  }

  if (screen === SCREEN_LOADER) {
    return (
      <TwinPartySpirtyDinnerBackground>
        <View style={styles.spinWrap}>
          <WebView
            originWhitelist={['*']}
            source={{ html: twinPartySpirtyDinnerLoaderHTML }}
            style={styles.frame}
            scrollEnabled={false}
          />
        </View>
      </TwinPartySpirtyDinnerBackground>
    );
  }

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.shell}>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Category:</Text>
          <Text style={styles.metaValue}>{phase}</Text>
        </View>

        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{currentPlayer}</Text>
        </View>

        {isPartyMode && (
          <View style={styles.timeTrack}>
            <View
              style={[
                styles.timeFill,
                { width: `${Math.max(0, Math.min(1, stepProgress)) * 100}%` },
              ]}
            />
          </View>
        )}

        <View style={styles.panel}>
          <Text style={styles.panelText}>{currentCardText}</Text>
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.8}
          onPress={advanceTurn}
        >
          <Text style={styles.nextText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exitBtn}
          activeOpacity={0.8}
          onPress={() => {
            if (roundTickerRef.current) {
              clearInterval(roundTickerRef.current);
              roundTickerRef.current = null;
            }
            navigation.goBack();
            setRoster([]);
          }}
        >
          <Text style={styles.exitText}>HOME</Text>
        </TouchableOpacity>
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

export default TwinPartySpirtyDinnerLineup;

// ----------------- Стилі ------------------>

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  masthead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  spinWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: 360,
    height: 260,
    backgroundColor: 'transparent',
  },
  panel: {
    backgroundColor: '#23113C',
    borderRadius: 24,
    padding: 20,
  },
  panelTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  entryField: {
    flex: 1,
    height: 61,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#31FFCF',
    justifyContent: 'center',
    paddingHorizontal: 18,
    color: '#fff',
    fontSize: 16,
  },
  nameHolder: {
    flex: 1,
    height: 61,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  nameDisplay: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  minusBtn: {
    width: 61,
    height: 61,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  plusBtn: {
    width: 61,
    height: 61,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  plusBtnDisabled: {
    opacity: 0.5,
    backgroundColor: '#31FFCF',
  },
  hintText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
  },
  kickoffWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  igniteBtn: {
    height: 79,
    borderRadius: 26,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    alignSelf: 'center',
    marginTop: 20,
  },
  igniteText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  metaBox: {
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
  },
  metaLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10,
  },
  metaValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  badgeWrap: {
    borderWidth: 1,
    borderColor: '#31FFCF',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 16,
  },
  badgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timeTrack: {
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
  timeFill: {
    height: '100%',
    backgroundColor: '#31FFCF',
  },
  panelText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  nextBtn: {
    height: 79,
    width: 280,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
    marginTop: 20,
  },
  nextText: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
  },
  exitBtn: {
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
  exitText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
