import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const TwinPartySpirtyDinnerAddTask = () => {
  const navigationTwinPartySpirtyDinner = useNavigation();
  const routeTwinPartySpirtyDinner = useRoute();
  const { task: taskTwinPartySpirtyDinner } = routeTwinPartySpirtyDinner.params;
  const [photoTwinPartySpirtyDinner, setPhotoTwinPartySpirtyDinner] =
    useState(null);

  const pickPhotoTwinPartySpirtyDinner = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.9,
        selectionLimit: 1,
      },
      responseTwinPartySpirtyDinner => {
        if (responseTwinPartySpirtyDinner.didCancel) return;
        if (responseTwinPartySpirtyDinner.errorCode) return;

        const uriTwinPartySpirtyDinner =
          responseTwinPartySpirtyDinner.assets?.[0]?.uri;

        if (uriTwinPartySpirtyDinner) {
          setPhotoTwinPartySpirtyDinner(uriTwinPartySpirtyDinner);
        }
      },
    );
  };

  const formatDateTwinPartySpirtyDinner = () => {
    const dateTwinPartySpirtyDinner = new Date();
    const dayTwinPartySpirtyDinner = String(
      dateTwinPartySpirtyDinner.getDate(),
    ).padStart(2, '0');
    const monthTwinPartySpirtyDinner = String(
      dateTwinPartySpirtyDinner.getMonth() + 1,
    ).padStart(2, '0');
    const yearTwinPartySpirtyDinner = dateTwinPartySpirtyDinner.getFullYear();
    return `${dayTwinPartySpirtyDinner}.${monthTwinPartySpirtyDinner}.${yearTwinPartySpirtyDinner}`;
  };

  const saveMomentTwinPartySpirtyDinner = async () => {
    const storedTwinPartySpirtyDinner = await AsyncStorage.getItem(
      'twin_party_moments',
    );
    const momentsTwinPartySpirtyDinner = storedTwinPartySpirtyDinner
      ? JSON.parse(storedTwinPartySpirtyDinner)
      : [];

    const newMomentTwinPartySpirtyDinner = {
      id: Date.now().toString(),
      photo: photoTwinPartySpirtyDinner,
      task: taskTwinPartySpirtyDinner,
      date: formatDateTwinPartySpirtyDinner(),
    };

    await AsyncStorage.setItem(
      'twin_party_moments',
      JSON.stringify([
        newMomentTwinPartySpirtyDinner,
        ...momentsTwinPartySpirtyDinner,
      ]),
    );

    navigationTwinPartySpirtyDinner.goBack();
  };

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.containerTwinPartySpirtyDinner}>
        <View style={styles.headerTwinPartySpirtyDinner}>
          <TouchableOpacity
            onPress={() => navigationTwinPartySpirtyDinner.goBack()}
          >
            <Text style={styles.backTwinPartySpirtyDinner}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitleTwinPartySpirtyDinner}>
            Additional task
          </Text>
        </View>

        <LinearGradient
          colors={['#FFF831', '#0DFF00', '#FF00C8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientWrapperTwinPartySpirtyDinner}
        >
          <View style={styles.taskCardTwinPartySpirtyDinner}>
            <Text style={styles.taskLabelTwinPartySpirtyDinner}>TASK:</Text>
            <Text style={styles.taskTextTwinPartySpirtyDinner}>
              {taskTwinPartySpirtyDinner}
            </Text>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.photoCardTwinPartySpirtyDinner}
          activeOpacity={0.8}
          onPress={pickPhotoTwinPartySpirtyDinner}
        >
          {photoTwinPartySpirtyDinner ? (
            <Image
              source={{ uri: photoTwinPartySpirtyDinner }}
              style={styles.photoTwinPartySpirtyDinner}
            />
          ) : (
            <>
              <Image
                source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyAddIng.png')}
                style={styles.addIconTwinPartySpirtyDinner}
              />
              <Text style={styles.addPhotoTextTwinPartySpirtyDinner}>
                Add photo
              </Text>
            </>
          )}
        </TouchableOpacity>

        {photoTwinPartySpirtyDinner && (
          <TouchableOpacity
            style={[
              styles.saveBtnTwinPartySpirtyDinner,
              !photoTwinPartySpirtyDinner &&
                styles.saveDisabledTwinPartySpirtyDinner,
            ]}
            disabled={!photoTwinPartySpirtyDinner}
            onPress={saveMomentTwinPartySpirtyDinner}
          >
            <Text style={styles.saveTextTwinPartySpirtyDinner}>SAVE</Text>
          </TouchableOpacity>
        )}
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const styles = StyleSheet.create({
  containerTwinPartySpirtyDinner: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerTwinPartySpirtyDinner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  backTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 26,
  },
  headerTitleTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  gradientWrapperTwinPartySpirtyDinner: {
    borderRadius: 24,
    marginBottom: 26,
  },
  taskCardTwinPartySpirtyDinner: {
    borderRadius: 24,
    paddingVertical: 26,
    paddingHorizontal: 22,
  },
  taskLabelTwinPartySpirtyDinner: {
    color: '#000',
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskTextTwinPartySpirtyDinner: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 30,
  },
  photoCardTwinPartySpirtyDinner: {
    height: 180,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#31FFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    overflow: 'hidden',
  },
  photoTwinPartySpirtyDinner: {
    width: '100%',
    height: '100%',
  },
  addIconTwinPartySpirtyDinner: {
    marginBottom: 13,
  },
  addPhotoTextTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  saveBtnTwinPartySpirtyDinner: {
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
  saveDisabledTwinPartySpirtyDinner: {
    opacity: 0.5,
  },
  saveTextTwinPartySpirtyDinner: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default TwinPartySpirtyDinnerAddTask;
