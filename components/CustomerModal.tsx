import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, ChevronDown, Mail, Pencil, ChevronUp, Upload, File, Trash2 } from 'lucide-react-native';
import CustomDropdown from './CustomDropdown';

interface CustomerModalProps {
  visible: boolean;
  onClose: () => void;
  customer: {
    id: string;
    name: string;
    role: string;
  } | null;
  showOnlyNotesAndContacts?: boolean;
}

interface Contact {
  name: string;
  phone: string;
  email: string;
}

interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isPrimary: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export default function CustomerModal({ visible, onClose, customer, showOnlyNotesAndContacts }: CustomerModalProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [customerName, setCustomerName] = useState(customer?.name || '');
  const [type, setType] = useState('End User');
  const [status, setStatus] = useState('Buying');
  const [notes, setNotes] = useState('');
  const [isSectionsExpanded, setIsSectionsExpanded] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@acme.com'
    }
  ]);
  const [locations, setLocations] = useState<Location[]>([
    {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      isPrimary: true
    }
  ]);
  const [selectedProducts] = useState(['Hydrochloric Acid', 'Sodium Hydroxide']);
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Credit Application.pdf',
      type: 'PDF',
      uploadDate: '2025-03-15',
      size: '1.8 MB'
    },
    {
      id: '2',
      name: 'Purchase Agreement.pdf',
      type: 'PDF',
      uploadDate: '2025-03-14',
      size: '2.2 MB'
    }
  ]);

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleRemoveLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleAddContact = () => {
    // Add contact logic
  };

  const handleAddLocation = () => {
    // Add location logic
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    // Here you would typically update the customer name in your data store
  };

  const toggleSections = () => {
    setIsSectionsExpanded(!isSectionsExpanded);
  };

  const handleUploadDocument = () => {
    // Handle document upload logic
  };

  const handleRemoveDocument = (documentId: string) => {
    // Handle document removal logic
  };

  return (
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
                  value={customerName}
                  onChangeText={setCustomerName}
                  onBlur={handleSaveName}
                  autoFocus
                />
              ) : (
                <>
                  <Text style={styles.modalTitle}>{customerName}</Text>
                  <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
                    <Pencil size={20} color="#64748B" />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {!showOnlyNotesAndContacts && (
              <>
                <TouchableOpacity 
                  style={styles.sectionHeader} 
                  onPress={toggleSections}
                >
                  <Text style={styles.sectionHeaderText}>Details</Text>
                  {isSectionsExpanded ? (
                    <ChevronUp size={24} color="#64748B" />
                  ) : (
                    <ChevronDown size={24} color="#64748B" />
                  )}
                </TouchableOpacity>

                {isSectionsExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.section}>
                      <Text style={styles.label}>Type</Text>
                      <CustomDropdown
                        value={type}
                        onChange={setType}
                        options={['End User', 'Reseller']}
                      />
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.label}>Status</Text>
                      <CustomDropdown
                        value={status}
                        onChange={setStatus}
                        options={['Buying', 'High Interest', 'Low Interest', 'Inactive']}
                      />
                    </View>

                    <View style={styles.section}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.label}>Locations</Text>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={handleAddLocation}
                        >
                          <Text style={styles.addButtonText}>Add Location</Text>
                        </TouchableOpacity>
                      </View>
                      {locations.map((location, index) => (
                        <View key={index} style={styles.locationCard}>
                          <View style={styles.locationHeader}>
                            {location.isPrimary && (
                              <View style={styles.primaryBadge}>
                                <Text style={styles.primaryBadgeText}>Primary</Text>
                              </View>
                            )}
                            <View style={styles.locationActions}>
                              <TouchableOpacity>
                                <Text style={styles.editText}>Edit</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleRemoveLocation(index)}>
                                <Text style={styles.deleteText}>Delete</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <Text style={styles.locationText}>{location.address}</Text>
                          <Text style={styles.locationText}>
                            {location.city}, {location.state} {location.zip}
                          </Text>
                          <Text style={styles.locationText}>{location.country}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </>
            )}

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.label}>Contacts</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddContact}
                >
                  <Text style={styles.addButtonText}>Add Contact</Text>
                </TouchableOpacity>
              </View>
              {contacts.map((contact, index) => (
                <View key={index} style={styles.contactCard}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactDetail}>{contact.phone}</Text>
                    <View style={styles.emailContainer}>
                      <Mail size={16} color="#64748B" />
                      <Text style={styles.contactDetail}>{contact.email}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveContact(index)}
                  >
                    <Text style={styles.removeText}>Remove Contact</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add notes about this customer..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {!showOnlyNotesAndContacts && (
              <>
                <View style={styles.section}>
                  <Text style={styles.label}>Products</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Search products..."
                  />
                  <View style={styles.selectedProducts}>
                    <Text style={styles.subLabel}>Selected Products</Text>
                    {selectedProducts.map((product, index) => (
                      <View key={index} style={styles.productItem}>
                        <Text style={styles.productName}>{product}</Text>
                        <TouchableOpacity>
                          <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.label}>Documents</Text>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={handleUploadDocument}
                    >
                      <Upload size={16} color="#4F46E5" />
                      <Text style={styles.uploadButtonText}>Upload</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.documentsContainer}>
                    {documents.map((document) => (
                      <View key={document.id} style={styles.documentItem}>
                        <View style={styles.documentIcon}>
                          <File size={24} color="#64748B" />
                        </View>
                        <View style={styles.documentInfo}>
                          <Text style={styles.documentName}>{document.name}</Text>
                          <View style={styles.documentMeta}>
                            <Text style={styles.documentMetaText}>{document.uploadDate}</Text>
                            <Text style={styles.documentMetaText}>{document.size}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={styles.documentAction}
                          onPress={() => handleRemoveDocument(document.id)}
                        >
                          <Trash2 size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    padding: 8,
  },
  modalBody: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
  },
  expandedContent: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
    marginBottom: 8,
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
  },
  locationCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  primaryBadgeText: {
    color: '#22C55E',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  locationActions: {
    flexDirection: 'row',
    gap: 16,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
    marginBottom: 4,
  },
  editText: {
    color: '#4F46E5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  contactCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  contactInfo: {
    marginBottom: 12,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  removeButton: {
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#EF4444',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  selectedProducts: {
    marginTop: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  uploadButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  documentsContainer: {
    marginTop: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  documentIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 4,
  },
  documentMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  documentMetaText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  documentAction: {
    padding: 8,
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