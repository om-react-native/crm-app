import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { X, Pencil, ChevronDown, ChevronUp, Mail } from 'lucide-react-native';
import SupplierModal from './SupplierModal';
import CustomerModal from './CustomerModal';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
  } | null;
}

export default function ProductModal({ visible, onClose, product }: ProductModalProps) {
  const [notes, setNotes] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [productName, setProductName] = useState(product?.name || '');
  const [needsSource, setNeedsSource] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [supplierModalVisible, setSupplierModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);

  const suppliers = [
    { id: '1', name: 'ChemCorp International', type: 'producer' },
    { id: '2', name: 'Asian Polymers Co', type: 'producer' },
  ];

  const customers = [
    { id: '1', name: 'Acme Corp', type: 'End User' },
    { id: '2', name: 'PharmaCo', type: 'End User' },
  ];

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
  };

  const toggleNotes = () => {
    setIsNotesExpanded(!isNotesExpanded);
  };

  const handleSupplierPress = (supplier: any) => {
    setSelectedSupplier(supplier);
    setSupplierModalVisible(true);
  };

  const handleCustomerPress = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerModalVisible(true);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.titleContainer}>
                {isEditingName ? (
                  <TextInput
                    style={styles.titleInput}
                    value={productName}
                    onChangeText={setProductName}
                    onBlur={handleSaveName}
                    autoFocus
                  />
                ) : (
                  <>
                    <Text style={styles.modalTitle}>{productName}</Text>
                    <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
                      <Pencil size={20} color="#64748B" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <TouchableOpacity 
                style={styles.notesHeader} 
                onPress={toggleNotes}
              >
                <Text style={styles.label}>Notes</Text>
                {isNotesExpanded ? (
                  <ChevronUp size={20} color="#64748B" />
                ) : (
                  <ChevronDown size={20} color="#64748B" />
                )}
              </TouchableOpacity>

              {isNotesExpanded && (
                <View style={styles.notesContent}>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Add notes about this product..."
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity 
                      style={styles.checkboxRow}
                      onPress={() => setNeedsSource(!needsSource)}
                    >
                      <View style={[styles.checkbox, needsSource && styles.checkboxChecked]} />
                      <Text style={styles.checkboxText}>Need to source</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.checkboxRow}
                      onPress={() => setIsActive(!isActive)}
                    >
                      <View style={[styles.checkbox, isActive && styles.checkboxChecked]} />
                      <Text style={styles.checkboxText}>Active</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.label}>Suppliers</Text>
                <View style={styles.listContainer}>
                  {suppliers.map((supplier) => (
                    <Pressable
                      key={supplier.id}
                      style={styles.listItem}
                      onPress={() => handleSupplierPress(supplier)}
                    >
                      <Text style={styles.listItemTextLink}>{supplier.name}</Text>
                      <View style={[styles.typePill, styles.producerPill]}>
                        <Text style={[styles.typeText, styles.producerText]}>{supplier.type}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Customers</Text>
                <View style={styles.listContainer}>
                  {customers.map((customer) => (
                    <Pressable
                      key={customer.id}
                      style={styles.listItem}
                      onPress={() => handleCustomerPress(customer)}
                    >
                      <Text style={styles.listItemTextLink}>{customer.name}</Text>
                      <View style={[styles.typePill, styles.endUserPill]}>
                        <Text style={[styles.typeText, styles.endUserText]}>{customer.type}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <SupplierModal
        visible={supplierModalVisible}
        onClose={() => setSupplierModalVisible(false)}
        supplier={selectedSupplier}
        showOnlyNotesAndContacts
      />

      <CustomerModal
        visible={customerModalVisible}
        onClose={() => setCustomerModalVisible(false)}
        customer={selectedCustomer}
        showOnlyNotesAndContacts
      />
    </>
  );
}

const styles = StyleSheet.create({
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
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
  },
  titleInput: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
    flex: 1,
    padding: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
  },
  editButton: {
    padding: 4,
  },
  closeButton: {
    padding: 4,
    marginLeft: 16,
  },
  modalBody: {
    padding: 20,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notesContent: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  checkboxContainer: {
    gap: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  checkboxText: {
    color: '#1E293B',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  listContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  listItemTextLink: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#4F46E5',
    textDecorationLine: 'underline',
  },
  typePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  producerPill: {
    backgroundColor: '#DCFCE7',
  },
  endUserPill: {
    backgroundColor: '#FEF3C7',
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  producerText: {
    color: '#22C55E',
  },
  endUserText: {
    color: '#F59E0B',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  saveButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
});