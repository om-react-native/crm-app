import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  '(tabs)': undefined;
  'sign-in': undefined;
  'sign-up': undefined;
};

export type TabParamList = {
  products: undefined;
  suppliers: undefined;
  customers: undefined;
  map: undefined;
  settings: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>; 