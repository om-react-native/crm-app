import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Plus, Search, ChevronRight } from 'lucide-react-native';
import { popScreen } from '@/navigation/action';
import { SafeAreaView } from 'react-native-safe-area-context';
import { changePassword, User } from '@/services/userService';
import CustomLoader from '@/components/CustomLoader';

interface Customer {
  id: string;
  name: string;
  type: string;
  status: string;
}

export default function UserSettingsScreen(props: any) {
  const user: User = props.route.params.user;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [myCustomers] = useState<Customer[]>([
    { id: '1', name: 'Acme Corp', type: 'End User', status: 'Active' },
    {
      id: '2',
      name: 'TechChem Industries',
      type: 'Reseller',
      status: 'Active',
    },
  ]);

  const [availableCustomers] = useState<Customer[]>([
    { id: '3', name: 'PharmaCo', type: 'End User', status: 'Active' },
    { id: '4', name: 'Global Chemicals', type: 'Reseller', status: 'Active' },
    { id: '5', name: 'BioTech Solutions', type: 'End User', status: 'Active' },
  ]);

  const updateCurrentUserPassword = async () => {
    try {
      setLoading(true);
      await changePassword(user as any, currentPassword, newPassword);
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log('hello');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => popScreen()}>
          <ArrowLeft size={24} color="#64748B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Settings</Text>
      </View>
      <CustomLoader visible={loading} />

      <ScrollView style={styles.content}>
        {/* Password Change Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.passwordForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm New Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                updateCurrentUserPassword();
              }}
              style={styles.updateButton}
            >
              <Text style={styles.updateButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Customers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Customers</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Customer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search customers..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.customersList}>
            {myCustomers.map(customer => (
              <View key={customer.id} style={styles.customerCard}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <View style={styles.customerMeta}>
                    <View
                      style={[
                        styles.typeBadge,
                        customer.type === 'End User'
                          ? styles.endUserBadge
                          : styles.resellerBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeBadgeText,
                          customer.type === 'End User'
                            ? styles.endUserText
                            : styles.resellerText,
                        ]}
                      >
                        {customer.type}
                      </Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </View>
            ))}
          </View>
        </View>

        {/* Available Customers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Customers</Text>
          <View style={styles.customersList}>
            {availableCustomers.map(customer => (
              <View key={customer.id} style={styles.customerCard}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <View style={styles.customerMeta}>
                    <View
                      style={[
                        styles.typeBadge,
                        customer.type === 'End User'
                          ? styles.endUserBadge
                          : styles.resellerBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeBadgeText,
                          customer.type === 'End User'
                            ? styles.endUserText
                            : styles.resellerText,
                        ]}
                      >
                        {customer.type}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.addToListButton}>
                  <Plus size={20} color="#4F46E5" />
                  <Text style={styles.addToListText}>Add to List</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
    marginBottom: 20,
  },
  passwordForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  updateButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  customersList: {
    gap: 12,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 4,
  },
  customerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  endUserBadge: {
    backgroundColor: '#DCFCE7',
  },
  resellerBadge: {
    backgroundColor: '#FEF3C7',
  },
  typeBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  endUserText: {
    color: '#22C55E',
  },
  resellerText: {
    color: '#F59E0B',
  },
  addToListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  addToListText: {
    color: '#4F46E5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
});
