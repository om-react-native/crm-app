import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Search,
  Plus,
  ChevronRight,
  Filter as FilterIcon,
} from 'lucide-react-native';
import CustomerModal from '@/components/CustomerModal';
import CustomDropdown from '@/components/CustomDropdown';
import { TabNavigationProp } from '@/types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Customer {
  id: string;
  name: string;
  role: 'Individual' | 'Business';
}

const SAMPLE_CUSTOMERS: Customer[] = [
  { id: '1', name: 'John Smith', role: 'Individual' },
  { id: '2', name: 'Acme Corp', role: 'Business' },
  { id: '3', name: 'Jane Doe', role: 'Individual' },
];

type CustomersScreenProps = {
  navigation: TabNavigationProp;
};

export default function CustomersScreen({ navigation }: CustomersScreenProps) {
  console.log('navigation', navigation);
  const [activeTab, setActiveTab] = useState<'search' | 'add'>('search');
  const [newCustomer, setNewCustomer] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [active, setActive] = useState('All');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');

  const handleAddCustomer = () => {
    if (newCustomer.trim() === '') return;
    // Add customer logic here
    setNewCustomer('');
    setActiveTab('search');
  };

  const handleCustomerPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'search' && styles.activeTabText,
              ]}
            >
              Customer Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'add' && styles.activeTab]}
            onPress={() => setActiveTab('add')}
          >
            <Plus
              size={20}
              color={activeTab === 'add' ? '#4F46E5' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'add' && styles.activeTabText,
              ]}
            >
              Add Customer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'search' ? (
        <>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#64748B" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search customers..."
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Customers List Header with Filter Button */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Customer List</Text>
            <TouchableOpacity
              style={[
                styles.filterButton,
                showFilters && styles.filterButtonActive,
              ]}
              onPress={toggleFilters}
            >
              <FilterIcon
                size={20}
                color={showFilters ? '#4F46E5' : '#64748B'}
              />
              <Text
                style={[
                  styles.filterButtonText,
                  showFilters && styles.filterButtonTextActive,
                ]}
              >
                Filters
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filters Dropdown */}
          {showFilters && (
            <View style={styles.filtersDropdown}>
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Active</Text>
                <CustomDropdown
                  value={active}
                  onChange={setActive}
                  options={['All', 'Yes', 'No']}
                />
              </View>

              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Location</Text>
                <CustomDropdown
                  value={location}
                  onChange={setLocation}
                  options={['All', 'America', 'France', 'China']}
                />
              </View>

              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Type</Text>
                <CustomDropdown
                  value={type}
                  onChange={setType}
                  options={['All', 'Individual', 'Business']}
                />
              </View>
            </View>
          )}

          {/* Customers List */}
          <ScrollView bounces={false} style={styles.customersList}>
            {SAMPLE_CUSTOMERS.map(customer => (
              <Pressable
                key={customer.id}
                style={styles.customerItem}
                onPress={() => handleCustomerPress(customer)}
              >
                <Text style={styles.customerName}>{customer.name}</Text>
                <ChevronRight size={20} color="#64748B" />
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.addCustomerContainer}>
          <TextInput
            style={styles.addCustomerInput}
            placeholder="Enter customer name..."
            value={newCustomer}
            onChangeText={setNewCustomer}
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            style={styles.addCustomerButton}
            onPress={handleAddCustomer}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addCustomerButtonText}>Add Customer</Text>
          </TouchableOpacity>
        </View>
      )}

      <CustomerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        customer={selectedCustomer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    fontSize: 16,
    color: '#64748B',
  },
  activeTabText: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#1E293B',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  filterButtonActive: {
    backgroundColor: '#EEF2FF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748B',
  },
  filterButtonTextActive: {
    color: '#4F46E5',
  },
  filtersDropdown: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  customersList: {
    flex: 1,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  customerName: {
    fontSize: 16,
    color: '#1E293B',
  },
  addCustomerContainer: {
    padding: 16,
  },
  addCustomerInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
  },
  addCustomerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  addCustomerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
