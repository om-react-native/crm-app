import Toast from 'react-native-simple-toast';

type ToastType = 'success' | 'error' | 'info';

export const showToast = (message: string, type: ToastType = 'info') => {
  let prefix = '';
  switch (type) {
    case 'success':
      prefix = '✅ ';
      break;
    case 'error':
      prefix = '❌ ';
      break;
    case 'info':
      prefix = 'ℹ️ ';
      break;
  }

  Toast.show(`${prefix}${message}`, Toast.SHORT);
};
