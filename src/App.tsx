import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {navigationRef} from './navigators/RootNavigation';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Routes} from './constants/NavigationUtils';
import screenMap from './navigators/MainNavigator';
import store from './redux/store';

export const AutumnNotesContext = React.createContext({});
const App = () => {
  const StackNavigator = createStackNavigator(screenMap, {
    headerMode: 'none',
    initialRouteName: Routes.HOMESCREEN,
  });

  const MainNavigator = createAppContainer(StackNavigator);
  return (
    <AutumnNotesContext.Provider value={{}}>
      <Provider store={store}>
        <MainNavigator ref={navigationRef} />
      </Provider>
    </AutumnNotesContext.Provider>
  );
};

export default App;
