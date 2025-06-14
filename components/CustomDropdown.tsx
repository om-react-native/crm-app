import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

const CustomDropdown = ({ value, onChange, options, icon, iconOnly }: CustomDropdownProps) => {
  const [visible, setVisible] = useState(false);

  const openDropdown = () => setVisible(true);
  const closeDropdown = () => setVisible(false);

  const handleSelect = (option: string) => {
    onChange(option);
    closeDropdown();
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.container, iconOnly && styles.iconOnlyContainer]} 
        onPress={openDropdown}
      >
        {icon ? (
          <View style={styles.iconContainer}>{icon}</View>
        ) : null}
        {!iconOnly && (
          <>
            <Text style={styles.selectedValue} numberOfLines={1}>{value}</Text>
            <ChevronDown size={16} color="#64748B" />
          </>
        )}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    value === item && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === item && styles.selectedOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    minWidth: 120,
  },
  iconOnlyContainer: {
    minWidth: 'auto',
    width: 44,
    justifyContent: 'center',
    padding: 0,
  },
  selectedValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 8,
  },
  selectedValue: {
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '80%',
    maxHeight: '60%',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  selectedOption: {
    backgroundColor: '#EFF6FF',
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
  },
  selectedOptionText: {
    fontWeight: '500',
    color: '#4F46E5',
  },
});

export default CustomDropdown;