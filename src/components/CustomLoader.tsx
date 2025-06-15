// src/components/CustomLoader.tsx

import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

interface CustomLoaderProps {
  visible: boolean;
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  visible,
  message = 'Loading...',
  size = 'large',
  color = '#4F46E5',
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size={size} color={color} />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    elevation: 5,
  },
  message: {
    marginTop: 10,
    fontSize: 14,
    color: '#334155',
  },
});
