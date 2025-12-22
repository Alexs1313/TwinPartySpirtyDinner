import { createStackNavigator } from '@react-navigation/stack';
import TwinPartySpirtyDinnerTab from './TwinPartySpirtyDinnerTab';
import TwinPartySpirtyDinnerOnboard from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerOnboard';
import TwinPartySpirtyDinnerLoader from '../TwinPartySpirtyDinnerComponents/TwinPartySpirtyDinnerLoader';
import TwinPartySpirtyDinnerAddPlayers from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerAddPlayers';
import TwinPartySpirtyDinnerAddTask from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerAddTask';
import TwinPartySpirtyDinnerMoments from '../TwinPartySpirtyDinnerScreens/TwinPartySpirtyDinnerMoments';

const Stack = createStackNavigator();

const TwinPartySpirtyDinnerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TwinPartySpirtyDinnerLoader"
        component={TwinPartySpirtyDinnerLoader}
      />
      <Stack.Screen
        name="TwinPartySpirtyDinnerOnboard"
        component={TwinPartySpirtyDinnerOnboard}
      />
      <Stack.Screen
        name="TwinPartySpirtyDinnerTab"
        component={TwinPartySpirtyDinnerTab}
      />
      <Stack.Screen
        name="TwinPartySpirtyDinnerAddPlayers"
        component={TwinPartySpirtyDinnerAddPlayers}
      />
      <Stack.Screen
        name="TwinPartySpirtyDinnerAddTask"
        component={TwinPartySpirtyDinnerAddTask}
      />
      <Stack.Screen
        name="TwinPartySpirtyDinnerMoments"
        component={TwinPartySpirtyDinnerMoments}
      />
    </Stack.Navigator>
  );
};

export default TwinPartySpirtyDinnerStack;
