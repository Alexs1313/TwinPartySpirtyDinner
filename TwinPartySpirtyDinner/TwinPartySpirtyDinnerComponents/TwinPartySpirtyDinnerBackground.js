import { ScrollView, View } from 'react-native';

const TwinPartySpirtyDinnerBackground = ({ children }) => {
  return (
    <View style={{ backgroundColor: '#1A0932', flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default TwinPartySpirtyDinnerBackground;
