import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { PARTY_MOMENT_PHOTO_CHALLENGE } from '../[data]/twinPartySpirtyPhotoChalllenge';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../[components]/Background';

const TwinPartySpirtyDinnerHome = ({ navigation }) => {
  // states refs

  const [tickCount, setTickCount] = useState(0);
  const [chosenMode, setChosenMode] = useState('');
  const clockRef = useRef(null);

  const [accumSeconds, setAccumSeconds] = useState(0);
  const [upcomingTask, setUpcomingTask] = useState(null);

  // effects

  useFocusEffect(
    useCallback(() => {
      fetchTask();
    }, []),
  );

  const fetchTask = async () => {
    try {
      const storedTask = await AsyncStorage.getItem('twin_party_current_task');
      if (storedTask) {
        setUpcomingTask(storedTask);
        console.log('loaded stored task =>');
        return;
      }

      const pickPhoto =
        PARTY_MOMENT_PHOTO_CHALLENGE[
          Math.floor(Math.random() * PARTY_MOMENT_PHOTO_CHALLENGE.length)
        ];
      setUpcomingTask(pickPhoto);
      try {
        await AsyncStorage.setItem('twin_party_current_task', pickPhoto);
      } catch (e) {
        console.warn('fail', e);
      }
      console.log('picked ->', pickPhoto);
    } catch (e) {
      console.warn('fetchTask failed', e);
    }
  };

  useEffect(() => {
    if (!upcomingTask) {
      const pick =
        PARTY_MOMENT_PHOTO_CHALLENGE[
          Math.floor(Math.random() * PARTY_MOMENT_PHOTO_CHALLENGE.length)
        ];
      setUpcomingTask(pick);
    }
  }, [upcomingTask]);

  useEffect(() => {
    const loadTime = async () => {
      try {
        const raw = await AsyncStorage.getItem('twin_party_total_time');
        setAccumSeconds(raw ? Number(raw) : 0);
      } catch (e) {
        console.warn('[Home] loadTime failed', e);
      }
    };

    const unsub = navigation.addListener('focus', loadTime);
    return unsub;
  }, [navigation]);

  useEffect(() => {
    clockRef.current = setInterval(() => {
      setTickCount(prev => {
        if (prev >= 300) {
          clearInterval(clockRef.current);
          return 300;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(clockRef.current);
      clockRef.current = null;
    };
  }, []);

  const progress = Math.min(accumSeconds / 60, 1);

  const readyFlag = accumSeconds >= 60;

  const openTaskHandler = async () => {
    const taskToSend = upcomingTask || PARTY_MOMENT_PHOTO_CHALLENGE[0];

    navigation.navigate('TwinPartySpirtyDinnerAddTask', {
      task: taskToSend,
    });

    try {
      await AsyncStorage.removeItem('twin_party_total_time');
      setAccumSeconds(0);
    } catch (e) {
      console.warn('fail', e);
    }

    const newPick =
      PARTY_MOMENT_PHOTO_CHALLENGE[
        Math.floor(Math.random() * PARTY_MOMENT_PHOTO_CHALLENGE.length)
      ];
    try {
      await AsyncStorage.setItem('twin_party_current_task', newPick);
      setUpcomingTask(newPick);
    } catch (e) {
      console.warn('fail', e);
      setUpcomingTask(newPick);
    }
  };

  return (
    <Background>
      <View style={ui.deck}>
        <View style={ui.mast}>
          <View style={ui.copyWrap}>
            <Text style={ui.hintText}>
              {readyFlag ? 'Additional task ready' : `${upcomingTask}`}
            </Text>

            <View style={ui.progressTrack}>
              <View
                style={[ui.progressFill, { width: `${progress * 100}%` }]}
              />
            </View>
          </View>

          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyHomeLogo.png')}
            />
          ) : (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/icon.png')}
              style={{ width: 64, height: 64, borderRadius: 14 }}
            />
          )}
        </View>

        {readyFlag && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={ui.taskArea}
            onPress={openTaskHandler}
          >
            <LinearGradient
              colors={['#FFF831', '#0DFF00', '#FF00C8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={ui.taskButton}
            >
              <Text style={ui.taskButtonText}>Open task</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View>
          <Text style={ui.chooseLabel}>Choose a mode:</Text>
          {Platform.OS === 'android' && (
            <Image
              source={require('../../assets/twinPartySpirtyDinnerImages/grapes.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 80,
                width: 380,
                height: 280,
                zIndex: -1,
              }}
            />
          )}
          <TouchableOpacity
            style={[ui.modeRow, chosenMode === 'PARTY' && ui.modeActive]}
            onPress={() => setChosenMode('PARTY')}
          >
            <View
              style={[
                ui.indicator,
                chosenMode === 'PARTY' && ui.indicatorActive,
              ]}
            />
            <Text
              style={[ui.modeText, chosenMode === 'PARTY' && ui.modeTextActive]}
            >
              Party Mode
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ui.modeRow, chosenMode === 'CHILL' && ui.modeActive]}
            onPress={() => setChosenMode('CHILL')}
          >
            <View
              style={[
                ui.indicator,
                chosenMode === 'CHILL' && ui.indicatorActive,
              ]}
            />
            <Text
              style={[ui.modeText, chosenMode === 'CHILL' && ui.modeTextActive]}
            >
              Chill Mode
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[ui.bigStart, !chosenMode && ui.disabledStart]}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('TwinPartySpirtyDinnerAddPlayers', {
              mode: chosenMode,
            })
          }
        >
          <Text style={ui.bigStartText}>START</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const ui = StyleSheet.create({
  deck: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    padding: 24,
    paddingBottom: 130,
  },
  mast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  copyWrap: {
    width: '70%',
    flex: 1,
    marginRight: 18,
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 10,
    width: '80%',
  },
  progressTrack: {
    width: '90%',
    height: 18,
    borderRadius: 6,
    backgroundColor: '#23113C',
    overflow: 'hidden',
    marginBottom: 22,
    padding: 2,
    borderWidth: 1,
    borderColor: '#31FFCF',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#31FFCF',
    borderRadius: 7,
  },
  taskArea: {
    alignSelf: 'flex-start',
  },
  taskButton: {
    width: 191,
    height: 52,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  taskButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chooseLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    marginTop: 50,
  },
  modeRow: {
    width: '65%',
    height: 80,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#31FFCF55',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modeActive: {
    borderColor: '#31FFCF',
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#31FFCF',
    marginRight: 14,
    opacity: 0.6,
  },
  indicatorActive: {
    opacity: 1,
  },
  modeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#31FFCF',
    opacity: 0.6,
  },
  modeTextActive: {
    opacity: 1,
  },
  bigStart: {
    width: '74%',
    height: 170,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  disabledStart: {
    opacity: 0.7,
  },
  bigStartText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default TwinPartySpirtyDinnerHome;
