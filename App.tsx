import { NavigationContainer } from '@react-navigation/native';
import TwinPartySpirtyDinnerStack from './TwinPartySpirtyDinner/TwinPartySpirtyDinnerNavigation/TwinPartySpirtyDinnerStack';
import { ContextProvider } from './TwinPartySpirtyDinner/TwinPartySpirtyDinnerStore/twinPartySpirtyDinnerContext';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <TwinPartySpirtyDinnerStack />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
