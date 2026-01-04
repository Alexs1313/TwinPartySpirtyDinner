import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import TwinPartySpirtyDinnerBackground from './Background';
import { twinPartySpirtyDinnerLoaderHTML } from '../[constants]/twinPartySpirtyDinnerLoaderHTML';

const Loader = () => {
  const nav = useNavigation();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      try {
        nav.replace('TwinPartySpirtyDinnerOnboard');

        console.log('[Loader] nav!');
      } catch (err) {
        console.warn('replace failed', err);
        try {
          nav.navigate('TwinPartySpirtyDinnerOnboard');
        } catch (err2) {
          console.error('failed', err2);
        }
      }
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('[Loader] timer cleared on unmount');
      }
    };
  }, [nav]);

  return (
    <TwinPartySpirtyDinnerBackground>
      <View style={sty.wrapper} accessibilityLabel="loader-screen">
        <WebView
          originWhitelist={['*']}
          source={{ html: twinPartySpirtyDinnerLoaderHTML }}
          style={sty.webview}
          scrollEnabled={false}
        />
      </View>
    </TwinPartySpirtyDinnerBackground>
  );
};

const sty = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: 360,
    height: 260,
    backgroundColor: 'transparent',
  },
});

export default Loader;
