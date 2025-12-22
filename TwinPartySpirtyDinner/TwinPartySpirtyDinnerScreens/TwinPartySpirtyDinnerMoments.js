import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TwinPartySpirtyDinnerBackground from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerBackground';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../TwinPartySpirtyDinnerStore/twinPartySpirtyDinnerContext';

const TwinPartySpirtyDinnerMoments = () => {
  const {
    momentsTwinPartySpirtyDinner,
    setMomentsTwinPartySpirtyDinner,
    loadMomentsTwinPartySpirtyDinner,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadMomentsTwinPartySpirtyDinner();
    }, []),
  );

  const deleteMomentTwinPartySpirtyDinner = async idTwinPartySpirtyDinner => {
    const updatedTwinPartySpirtyDinner = momentsTwinPartySpirtyDinner.filter(
      moment => moment.id !== idTwinPartySpirtyDinner,
    );
    setMomentsTwinPartySpirtyDinner(updatedTwinPartySpirtyDinner);
    await AsyncStorage.setItem(
      'twin_party_moments',
      JSON.stringify(updatedTwinPartySpirtyDinner),
    );
  };

  const shareMomentTwinPartySpirtyDinner = async itemTwinPartySpirtyDinner => {
    Share.share({
      message: `${itemTwinPartySpirtyDinner.task}`,
      url: itemTwinPartySpirtyDinner.photo,
    });
  };

  const renderItemTwinPartySpirtyDinner = ({ item }) => (
    <View style={styles.cardTwinPartySpirtyDinner}>
      <Image
        source={{ uri: item.photo }}
        style={styles.imageTwinPartySpirtyDinner}
      />

      <Text style={styles.dateTwinPartySpirtyDinner}>{item.date}</Text>

      <View style={styles.actionsTwinPartySpirtyDinner}>
        <TouchableOpacity
          style={[
            styles.actionBtnTwinPartySpirtyDinner,
            styles.deleteTwinPartySpirtyDinner,
          ]}
          onPress={() => deleteMomentTwinPartySpirtyDinner(item.id)}
        >
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyDell.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtnTwinPartySpirtyDinner,
            styles.shareTwinPartySpirtyDinner,
          ]}
          onPress={() => shareMomentTwinPartySpirtyDinner(item)}
        >
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyShr.png')}
          />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={['#00000000', '#000000']}
        style={styles.gradientTwinPartySpirtyDinner}
      />
    </View>
  );

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.containerTwinPartySpirtyDinner}>
        <Text style={styles.titleTwinPartySpirtyDinner}>PARTY MOMENTS</Text>

        {momentsTwinPartySpirtyDinner.length === 0 ? (
          <Text style={styles.emptyTextTwinPartySpirtyDinner}>
            There are no completed tasks, try to play more time and have the
            opportunity
          </Text>
        ) : (
          <FlatList
            data={momentsTwinPartySpirtyDinner}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={renderItemTwinPartySpirtyDinner}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
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
  titleTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 42,
  },
  gradientTwinPartySpirtyDinner: {
    position: 'absolute',
    height: '40%',
    bottom: 0,
    width: '100%',
  },
  emptyTextTwinPartySpirtyDinner: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 120,
    paddingHorizontal: 40,
  },
  cardTwinPartySpirtyDinner: {
    borderRadius: 23,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#31FFCF',
  },
  imageTwinPartySpirtyDinner: {
    width: '100%',
    height: 180,
  },
  dateTwinPartySpirtyDinner: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    zIndex: 2,
  },
  actionsTwinPartySpirtyDinner: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    flexDirection: 'row',
    gap: 10,
    zIndex: 2,
  },
  actionBtnTwinPartySpirtyDinner: {
    width: 61,
    height: 61,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteTwinPartySpirtyDinner: {
    backgroundColor: '#FF3131',
  },
  shareTwinPartySpirtyDinner: {
    backgroundColor: '#31FFCF',
  },
});

export default TwinPartySpirtyDinnerMoments;
