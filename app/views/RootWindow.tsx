import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import SplashScreen from 'react-native-splash-screen';

import Sample from './Sample'

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const navigationRef = React.createRef<any>();
const Stack = createStackNavigator();

const RootStack = () => {

  useEffect(()=>{
    SplashScreen.hide();
  },[])
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ presentation: "card" }} name="sample" component={Sample} />
    </Stack.Navigator>
  );
};

const RootWindow = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default RootWindow;