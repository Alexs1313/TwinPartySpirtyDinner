import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { twinPartySpirtyDinnerLoaderHTML } from '../TwinPartySpirtyDinnerConsts/twinPartySpirtyDinnerLoaderHTML';
import TwinPartySpirtyDinnerBackground from './TwinPartySpirtyDinnerBackground';

const TwinPartySpirtyDinnerLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      navigation.replace('TwinPartySpirtyDinnerOnboard');
    }, 5000);

    return () => clearTimeout(loaderTimer);
  }, [navigation]);

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={styles.loaderContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: twinPartySpirtyDinnerLoaderHTML }}
          style={{ width: 360, height: 260, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TwinPartySpirtyDinnerLoader;
