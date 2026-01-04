import { NavigationContainer } from '@react-navigation/native';
import TwinPartySpirtyDinnerStack from './TwinPartySpirtyDinner/[navigation]/TwinPartySpirtyDinnerStack';
import { ContextProvider } from './TwinPartySpirtyDinner/[store]/twinPartySpirtyDinnerContext';

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
