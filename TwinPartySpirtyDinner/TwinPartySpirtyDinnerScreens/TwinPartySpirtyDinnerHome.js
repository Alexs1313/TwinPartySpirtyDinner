import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { PARTY_MOMENT_PHOTO_CHALLENGE } from '../TwinPartySpirtyDinnerData/twinPartySpirtyPhotoChalllenge';
import { useFocusEffect } from '@react-navigation/native';

const TwinPartySpirtyDinnerHome = ({ navigation }) => {
  const [secondsTwinPartySpirtyDinner, setSecondsTwinPartySpirtyDinner] =
    useState(0);
  const [modeTwinPartySpirtyDinner, setModeTwinPartySpirtyDinner] =
    useState('');
  const timerRefTwinPartySpirtyDinner = useRef(null);
  const [
    totalSecondsTwinPartySpirtyDinner,
    setTotalSecondsTwinPartySpirtyDinner,
  ] = useState(0);
  const [
    previewTaskTwinPartySpirtyDinner,
    setPreviewTaskTwinPartySpirtyDinner,
  ] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadTaskTwinPartySpirtyDinner();
    }, []),
  );

  const loadTaskTwinPartySpirtyDinner = async () => {
    const storedTaskTwinPartySpirtyDinner = await AsyncStorage.getItem(
      'twin_party_current_task',
    );

    if (storedTaskTwinPartySpirtyDinner) {
      setPreviewTaskTwinPartySpirtyDinner(storedTaskTwinPartySpirtyDinner);
    } else {
      const randomTwinPartySpirtyDinner =
        PARTY_MOMENT_PHOTO_CHALLENGE[
          Math.floor(Math.random() * PARTY_MOMENT_PHOTO_CHALLENGE.length)
        ];

      setPreviewTaskTwinPartySpirtyDinner(randomTwinPartySpirtyDinner);
      await AsyncStorage.setItem(
        'twin_party_current_task',
        randomTwinPartySpirtyDinner,
      );
    }
  };

  useEffect(() => {
    if (!previewTaskTwinPartySpirtyDinner) {
      const randomTwinPartySpirtyDinner =
        PARTY_MOMENT_PHOTO_CHALLENGE[
          Math.floor(Math.random() * PARTY_MOMENT_PHOTO_CHALLENGE.length)
        ];
      setPreviewTaskTwinPartySpirtyDinner(randomTwinPartySpirtyDinner);
    }
  }, [previewTaskTwinPartySpirtyDinner]);

  useEffect(() => {
    const loadTimeTwinPartySpirtyDinner = async () => {
      const storedTwinPartySpirtyDinner = await AsyncStorage.getItem(
        'twin_party_total_time',
      );
      setTotalSecondsTwinPartySpirtyDinner(
        storedTwinPartySpirtyDinner ? Number(storedTwinPartySpirtyDinner) : 0,
      );
    };

    const focusTwinPartySpirtyDinner = navigation.addListener(
      'focus',
      loadTimeTwinPartySpirtyDinner,
    );
    return focusTwinPartySpirtyDinner;
  }, [navigation]);

  useEffect(() => {
    timerRefTwinPartySpirtyDinner.current = setInterval(() => {
      setSecondsTwinPartySpirtyDinner(prevState => {
        if (prevState >= 300) {
          clearInterval(timerRefTwinPartySpirtyDinner.current);
          return 300;
        }
        return prevState + 1;
      });
    }, 1000);

    return () => clearInterval(timerRefTwinPartySpirtyDinner.current);
  }, []);

  const progressTwinPartySpirtyDinner = Math.min(
    totalSecondsTwinPartySpirtyDinner / 60,
    1,
  );

  const isReadyTwinPartySpirtyDinner = totalSecondsTwinPartySpirtyDinner >= 60;

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.containerTwinPartySpirtyDinner}>
        <View style={styles.headerRowTwinPartySpirtyDinner}>
          <View style={styles.textBlockTwinPartySpirtyDinner}>
            <Text style={styles.timerTextTwinPartySpirtyDinner}>
              {isReadyTwinPartySpirtyDinner
                ? 'Additional task ready'
                : `${previewTaskTwinPartySpirtyDinner}`}
            </Text>

            <View style={styles.progressBarTwinPartySpirtyDinner}>
              <View
                style={[
                  styles.progressFillTwinPartySpirtyDinner,
                  { width: `${progressTwinPartySpirtyDinner * 100}%` },
                ]}
              />
            </View>
          </View>

          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyHomeLogo.png')}
          />
        </View>

        {isReadyTwinPartySpirtyDinner && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.taskWrapperTwinPartySpirtyDinner}
            onPress={async () => {
              navigation.navigate('TwinPartySpirtyDinnerAddTask', {
                task: previewTaskTwinPartySpirtyDinner,
              });

              await AsyncStorage.removeItem('twin_party_total_time');
              setTotalSecondsTwinPartySpirtyDinner(0);

              const newTaskTwinPartySpirtyDinner =
                PARTY_MOMENT_PHOTO_CHALLENGE[
                  Math.floor(
                    Math.random() * PARTY_MOMENT_PHOTO_CHALLENGE.length,
                  )
                ];

              await AsyncStorage.setItem(
                'twin_party_current_task',
                newTaskTwinPartySpirtyDinner,
              );

              setPreviewTaskTwinPartySpirtyDinner(newTaskTwinPartySpirtyDinner);
            }}
          >
            <LinearGradient
              colors={['#FFF831', '#0DFF00', '#FF00C8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.taskBtnTwinPartySpirtyDinner}
            >
              <Text style={styles.taskBtnTextTwinPartySpirtyDinner}>
                Open task
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <Text style={styles.chooseTextTwinPartySpirtyDinner}>
          Choose a mode:
        </Text>

        <TouchableOpacity
          style={[
            styles.modeBtnTwinPartySpirtyDinner,
            modeTwinPartySpirtyDinner === 'PARTY' &&
              styles.modeActiveTwinPartySpirtyDinner,
          ]}
          onPress={() => setModeTwinPartySpirtyDinner('PARTY')}
        >
          <View
            style={[
              styles.dotTwinPartySpirtyDinner,
              modeTwinPartySpirtyDinner === 'PARTY' &&
                styles.dotActiveTwinPartySpirtyDinner,
            ]}
          />
          <Text
            style={[
              styles.modeTextTwinPartySpirtyDinner,
              modeTwinPartySpirtyDinner === 'PARTY' &&
                styles.modeTextActiveTwinPartySpirtyDinner,
            ]}
          >
            Party Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeBtnTwinPartySpirtyDinner,
            modeTwinPartySpirtyDinner === 'CHILL' &&
              styles.modeActiveTwinPartySpirtyDinner,
          ]}
          onPress={() => setModeTwinPartySpirtyDinner('CHILL')}
        >
          <View
            style={[
              styles.dotTwinPartySpirtyDinner,
              modeTwinPartySpirtyDinner === 'CHILL' &&
                styles.dotActiveTwinPartySpirtyDinner,
            ]}
          />
          <Text
            style={[
              styles.modeTextTwinPartySpirtyDinner,
              modeTwinPartySpirtyDinner === 'CHILL' &&
                styles.modeTextActiveTwinPartySpirtyDinner,
            ]}
          >
            Chill Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.startBtnTwinPartySpirtyDinner,
            !modeTwinPartySpirtyDinner &&
              styles.startDisabledTwinPartySpirtyDinner,
          ]}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('TwinPartySpirtyDinnerAddPlayers', {
              mode: modeTwinPartySpirtyDinner,
            })
          }
        >
          <Text style={styles.startTextTwinPartySpirtyDinner}>START</Text>
        </TouchableOpacity>
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const styles = StyleSheet.create({
  containerTwinPartySpirtyDinner: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    padding: 24,
    paddingBottom: 130,
  },
  headerRowTwinPartySpirtyDinner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    width: '100%',
  },
  textBlockTwinPartySpirtyDinner: {
    width: '70%',
    flex: 1,
  },
  timerTextTwinPartySpirtyDinner: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 10,
    width: '80%',
  },
  progressBarTwinPartySpirtyDinner: {
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
  progressFillTwinPartySpirtyDinner: {
    height: '100%',
    backgroundColor: '#31FFCF',
    borderRadius: 7,
  },
  taskWrapperTwinPartySpirtyDinner: {
    alignSelf: 'flex-start',
  },
  taskBtnTwinPartySpirtyDinner: {
    width: 191,
    height: 52,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  taskBtnTextTwinPartySpirtyDinner: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chooseTextTwinPartySpirtyDinner: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    marginTop: 50,
  },
  modeBtnTwinPartySpirtyDinner: {
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
  modeActiveTwinPartySpirtyDinner: {
    borderColor: '#31FFCF',
  },
  dotTwinPartySpirtyDinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#31FFCF',
    marginRight: 14,
    opacity: 0.6,
  },
  dotActiveTwinPartySpirtyDinner: {
    opacity: 1,
  },
  modeTextTwinPartySpirtyDinner: {
    fontSize: 20,
    fontWeight: '600',
    color: '#31FFCF',
    opacity: 0.6,
  },
  modeTextActiveTwinPartySpirtyDinner: {
    opacity: 1,
  },
  startBtnTwinPartySpirtyDinner: {
    width: '74%',
    height: 170,
    borderRadius: 23,
    backgroundColor: '#31FFCF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  startDisabledTwinPartySpirtyDinner: {
    opacity: 0.7,
  },
  startTextTwinPartySpirtyDinner: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default TwinPartySpirtyDinnerHome;
