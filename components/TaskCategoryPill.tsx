import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskCategoryPillProps {
  category: 'Product' | 'Customer' | 'Supplier';
}

const TaskCategoryPill = ({ category }: TaskCategoryPillProps) => {
  const getCategoryStyle = () => {
    switch (category) {
      case 'Customer':
        return {
          backgroundColor: '#DCFCE7',
          textColor: '#22C55E',
        };
      case 'Product':
        return {
          backgroundColor: '#EFF6FF',
          textColor: '#3B82F6',
        };
      case 'Supplier':
        return {
          backgroundColor: '#F3E8FF',
          textColor: '#A855F7',
        };
      default:
        return {
          backgroundColor: '#F1F5F9',
          textColor: '#64748B',
        };
    }
  };

  const { backgroundColor, textColor } = getCategoryStyle();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TaskCategoryPill;