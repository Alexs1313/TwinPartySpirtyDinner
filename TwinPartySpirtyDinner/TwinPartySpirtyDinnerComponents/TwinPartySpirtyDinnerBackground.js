import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TwinPartySpirtyDinnerBackground = ({ children }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#1a0c37ff', '#100E1A']}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

export default TwinPartySpirtyDinnerBackground;
