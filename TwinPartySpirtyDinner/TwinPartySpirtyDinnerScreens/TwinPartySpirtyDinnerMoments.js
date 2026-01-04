import React, { useCallback } from 'react';
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
    momentsTwinPartySpirtyDinner: scrapbook,
    setMomentsTwinPartySpirtyDinner: setScrapbook,
    loadMomentsTwinPartySpirtyDinner: loadScrapbook,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      try {
        loadScrapbook();
        console.log('ok !');
      } catch (e) {
        console.warn('failed', e);
      }
    }, [loadScrapbook]),
  );

  const deleteMoment = async id => {
    try {
      const nextLocal = scrapbook.filter(moment => moment.id !== id);
      setScrapbook(nextLocal);

      console.log('deleted!', id);

      const savedMoments = await AsyncStorage.getItem('twin_party_moments');
      let persisted = [];

      if (savedMoments) {
        try {
          const parsedJSON = JSON.parse(savedMoments);
          if (Array.isArray(parsedJSON)) persisted = parsedJSON;
        } catch (e) {
          console.warn('[Moments] parse persisted moments failed', e);
          persisted = [];
        }
      }

      const nextPersist = persisted.filter(moment => moment.id !== id);

      await AsyncStorage.setItem(
        'twin_party_moments',
        JSON.stringify(nextPersist),
      );
      console.log('deleted from storage!!', id);
    } catch (e) {
      console.error('deleteMoment failed', e);
    }
  };

  const shareMoment = async item => {
    try {
      const message = item?.task || 'Twin Party moment';
      const url = item?.photo;

      console.log('sharing ok', item?.id);

      await Share.share(
        {
          message,
          url,
        },
        {},
      );
      console.log('[Moments] share finished', item?.id);
    } catch (e) {
      console.warn('[Moments] share failed', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={sty.card}>
      <Image source={{ uri: item.photo }} style={sty.photo} />

      <Text style={sty.date}>{item.date}</Text>

      <View style={sty.controls}>
        <TouchableOpacity
          style={[sty.controlBtn, sty.deleteBtn]}
          onPress={() => deleteMoment(item.id)}
          accessibilityLabel="Delete moment"
        >
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyDell.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[sty.controlBtn, sty.shareBtn]}
          onPress={() => shareMoment(item)}
          accessibilityLabel="Share moment"
        >
          <Image
            source={require('../../assets/twinPartySpirtyDinnerImages/twinPartyShr.png')}
          />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={['#00000000', '#000000']} style={sty.fade} />
    </View>
  );

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={sty.container}>
        <Text style={sty.title}>PARTY MOMENTS</Text>

        {!scrapbook || scrapbook.length === 0 ? (
          <Text style={sty.empty}>
            There are no completed tasks yet — play a little longer to unlock
            moments and photo challenges.
          </Text>
        ) : (
          <FlatList
            data={scrapbook}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        )}
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 42,
  },
  fade: {
    position: 'absolute',
    height: '40%',
    bottom: 0,
    width: '100%',
  },
  empty: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 120,
    paddingHorizontal: 40,
  },
  card: {
    borderRadius: 23,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#31FFCF',
  },
  photo: {
    width: '100%',
    height: 180,
  },
  date: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    zIndex: 2,
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    flexDirection: 'row',
    zIndex: 2,
  },
  controlBtn: {
    width: 61,
    height: 61,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#FF3131',
    marginRight: 10,
  },
  shareBtn: {
    backgroundColor: '#31FFCF',
  },
});

export default TwinPartySpirtyDinnerMoments;
