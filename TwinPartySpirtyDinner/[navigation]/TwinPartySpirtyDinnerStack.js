import { createStackNavigator } from '@react-navigation/stack';
import TwinPartySpirtyDinnerTab from './TwinPartySpirtyDinnerTab';
import TwinPartySpirtyDinnerOnboard from '../[screens]/TwinPartySpirtyDinnerOnboard';
import TwinPartySpirtyDinnerAddPlayers from '../[screens]/TwinPartySpirtyDinnerAddPlayers';
import TwinPartySpirtyDinnerAddTask from '../[screens]/TwinPartySpirtyDinnerAddTask';
import TwinPartySpirtyDinnerMoments from '../[screens]/TwinPartySpirtyDinnerMoments';
import Loader from '../[components]/Loader';

const Stack = createStackNavigator();

const TwinPartySpirtyDinnerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Loader" component={Loader} />
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
