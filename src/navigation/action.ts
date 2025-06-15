import {
    CommonActions,
    createNavigationContainerRef,
    StackActions,
  } from '@react-navigation/native';

  import { AppRoutesConstants } from './constants';
  
  export const navigationRef = createNavigationContainerRef();
  
  export function navigate(routeName: string, params?: object): void {
    if (navigationRef?.isReady?.()) {
      navigationRef?.dispatch?.(CommonActions.navigate(routeName, params));
    }
  }
  
  export function pushScreen(
    routeName: string,
    params?: object,
  ): void {
    if (navigationRef?.isReady?.()) {
      navigationRef?.dispatch?.(StackActions.push(routeName, params));
    }
  }
  
  export function replaceScreen(routeName: string, params?: object): void {
    if (navigationRef?.isReady?.()) {
      navigationRef?.dispatch?.(StackActions.replace(routeName, params));
    }
  }
  
  export function resetStack(
    routeName: string = AppRoutesConstants.LOGIN,
    params?: object,
  ): void {
    if (navigationRef?.isReady?.()) {
      navigationRef?.dispatch?.(
        CommonActions.reset({
          index: 0,
          routes: [{name: routeName, params: params}],
        }),
      );
    }
  }
  
  export function popScreen(numberOfScreens: number = 1): void {
    if (navigationRef?.isReady?.()) {
      if (numberOfScreens > 1) {
        navigationRef?.dispatch?.(StackActions.pop(numberOfScreens));
      } else {
        navigationRef?.dispatch?.(CommonActions.goBack());
      }
    }
  }
  

  