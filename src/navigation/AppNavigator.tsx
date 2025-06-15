import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Home as HomeIcon,
  UserCircle,
  Beaker,
  Factory,
  Map as MapIcon,
} from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { Login, Signup } from '@/screens/auth';
import ProductsScreen from '@/screens/bottomTabs/products';
import SuppliersScreen from '@/screens/bottomTabs/suppliers';
import CustomersScreen from '@/screens/bottomTabs/customers';
import MapScreen from '@/screens/bottomTabs/map';
import SettingsScreen from '@/screens/bottomTabs/settings';
import HomeScreen from '@/screens/bottomTabs/home';
import { AppRoutesConstants } from './constants';
import { navigationRef } from './action';
import { useAuth } from '@/provider/authContext';
import ForgotPasswordScreen from '@/screens/auth/ForgotPassword';
import SplashScreen from '@/screens/auth/SplashScreen';
import UserSettingsScreen from '@/screens/bottomTabs/usersettings';

// Import the existing tab screens

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color }) => <Beaker size={28} color={color} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tab.Screen
        name="Suppliers"
        component={SuppliersScreen}
        options={{
          tabBarIcon: ({ color }) => <Factory size={28} color={color} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ color }) => <UserCircle size={28} color={color} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => <MapIcon size={28} color={color} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon size={28} color={color} />,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      /> */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <SplashScreen />;
  }
  console.log('user', user);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          user
            ? AppRoutesConstants.BOTTOM_TAB_BAR_STACK
            : AppRoutesConstants.LOGIN
        }
      >
        <Stack.Screen name={AppRoutesConstants.LOGIN} component={Login} />
        <Stack.Screen name={AppRoutesConstants.SIGNUP} component={Signup} />
        <Stack.Screen
          name={AppRoutesConstants.USER_SETTING}
          component={UserSettingsScreen}
        />

        <Stack.Screen
          name={AppRoutesConstants.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />

        <Stack.Screen
          name={AppRoutesConstants.SETTING}
          component={SettingsScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={AppRoutesConstants.BOTTOM_TAB_BAR_STACK}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingBottom: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 8,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  headerTitle: {
    color: '#1E293B',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default AppNavigator;
