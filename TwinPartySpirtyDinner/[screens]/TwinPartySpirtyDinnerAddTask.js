import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../[components]/Background';

const TwinPartySpirtyDinnerAddTask = () => {
  const nav = useNavigation();
  const route = useRoute();

  const { task: incomingTask } = route.params || {};
  const [pickedUri, setPickedUri] = useState(null);

  const openGallery = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.9,
          selectionLimit: 1,
        },
        resp => {
          if (!resp) return;
          if (resp.didCancel) {
            console.log('picker cancelled');
            return;
          }
          if (resp.errorCode) {
            console.warn('picker error', resp.errorCode, resp.errorMessage);
            return;
          }

          const uri = resp.assets?.[0]?.uri;
          if (uri) {
            console.log('picker uri', uri);

            setPickedUri(uri);
          } else {
            console.warn('picker err');
          }
        },
      );
    } catch (e) {
      console.error('e', e);
    }
  };

  const prettyDate = () => {
    const newDay = new Date();
    const dayDD = String(newDay.getDate()).padStart(2, '0');
    const monthMM = String(newDay.getMonth() + 1).padStart(2, '0');
    const yearYYYY = newDay.getFullYear();
    return `${dayDD}.${monthMM}.${yearYYYY}`;
  };

  const persistMoment = async () => {
    if (!pickedUri) {
      console.warn('no photo:(');
      return;
    }

    try {
      const storedMoments = await AsyncStorage.getItem('twin_party_moments');
      const existing = storedMoments ? JSON.parse(storedMoments) : [];

      const newMoment = {
        id: Date.now().toString(),
        photo: pickedUri,
        task: incomingTask || '',
        date: prettyDate(),
      };

      const next = [newMoment, ...existing];

      await AsyncStorage.setItem('twin_party_moments', JSON.stringify(next));
      console.log('saved!!!', newMoment.id);

      nav.goBack();
    } catch (e) {
      console.error('fail!', e);
    }
  };

  return (
    <Background>
      <View style={sty.shell}>
        <View style={sty.headerRow}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Text style={sty.backGlyph}>←</Text>
          </TouchableOpacity>
          <Text style={sty.titleText}>Additional task</Text>
        </View>

        <LinearGradient
          colors={['#FFF831', '#0DFF00', '#FF00C8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={sty.gradientBox}
        >
          <View style={sty.taskWrap}>
            <Text style={sty.taskLabel}>TASK:</Text>
            <Text style={sty.taskBody}>{incomingTask}</Text>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={sty.photoArea}
          activeOpacity={0.85}
          onPress={openGallery}
        >
          {pickedUri ? (
            <Image source={{ uri: pickedUri }} style={sty.photoFill} />
          ) : (
            <View style={sty.placeholder}>
              <Image
                source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyAddIng.png')}
                style={sty.plusIcon}
              />
              <Text style={sty.placeholderText}>Add photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Кнопка активна тільки коли є фотка */}

        <TouchableOpacity
          style={[sty.saveButton, !pickedUri && sty.saveDisabled]}
          disabled={!pickedUri}
          onPress={persistMoment}
        >
          <Text style={sty.saveLabel}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const sty = StyleSheet.create({
  shell: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  backGlyph: {
    color: '#fff',
    fontSize: 26,
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  gradientBox: {
    borderRadius: 24,
    marginBottom: 26,
  },
  taskWrap: {
    borderRadius: 24,
    paddingVertical: 26,
    paddingHorizontal: 22,
  },
  taskLabel: {
    color: '#000',
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskBody: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 30,
  },
  photoArea: {
    height: 180,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#31FFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    overflow: 'hidden',
  },
  photoFill: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
  },
  plusIcon: {
    marginBottom: 13,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  saveButton: {
    height: 80,
    width: 279,
    borderRadius: 26,
    backgroundColor: '#31FFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 50,
    alignSelf: 'center',
  },
  saveDisabled: {
    opacity: 0.5,
  },
  saveLabel: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default TwinPartySpirtyDinnerAddTask;
