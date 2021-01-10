import React from 'react';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {DrawerContent} from '../src/components/DrawerContent';
import MainTabScreen from '../src/components/MainTabScreen';
import {AuthContext} from '../components/context';
import store from './store';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
