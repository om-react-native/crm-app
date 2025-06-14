import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Search, Plus, Filter as FilterIcon, ChevronRight } from 'lucide-react-native';
import CustomDropdown from '@/components/CustomDropdown';
import CustomerModal from '@/components/CustomerModal';

interface Customer {
  id: string;
  name: string;
  role: 'End User' | 'Reseller';
}

const SAMPLE_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Acme Corp', role: 'End User' },
  { id: '2', name: 'TechChem Industries', role: 'Reseller' },
  { id: '3', name: 'PharmaCo', role: 'End User' },
];

export default function CustomersScreen() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Filter states
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');

  const handleCustomerPress = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Customer Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Plus size={20} color="#64748B" />
            <Text style={styles.tabText}>Add Customer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bars */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            placeholderTextColor="#94A3B8"
            value={customerSearch}
            onChangeText={setCustomerSearch}
          />
        </View>
        <View style={[styles.searchInputContainer, styles.productSearchContainer]}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by product..."
            placeholderTextColor="#94A3B8"
            value={productSearch}
            onChangeText={setProductSearch}
          />
        </View>
      </View>

      {/* Customers List Header with Filter Button */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Customers</Text>
        <TouchableOpacity 
          style={[styles.filterButton, showFilters && styles.filterButtonActive]} 
          onPress={toggleFilters}
        >
          <FilterIcon size={20} color={showFilters ? '#4F46E5' : '#64748B'} />
          <Text style={[styles.filterButtonText, showFilters && styles.filterButtonTextActive]}>
            Filters
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters Dropdown */}
      {showFilters && (
        <View style={styles.filtersDropdown}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Type</Text>
            <CustomDropdown
              value={type}
              onChange={setType}
              options={['All', 'End User', 'Reseller']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Status</Text>
            <CustomDropdown
              value={status}
              onChange={setStatus}
              options={['All', 'Buying', 'High Interest', 'Low Interest', 'Inactive']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Location</Text>
            <CustomDropdown
              value={location}
              onChange={setLocation}
              options={['All', 'United States', 'China', 'Germany', 'Japan', 'India', 'United Kingdom', 'France']}
            />
          </View>
        </View>
      )}

      {/* Customers List */}
      <ScrollView style={styles.customersList}>
        {SAMPLE_CUSTOMERS.map((customer) => (
          <Pressable
            key={customer.id}
            style={styles.customerItem}
            onPress={() => handleCustomerPress(customer)}
          >
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{customer.name}</Text>
              <View style={[
                styles.rolePill,
                customer.role === 'End User' ? styles.endUserPill : styles.resellerPill
              ]}>
                <Text style={[
                  styles.roleText,
                  customer.role === 'End User' ? styles.endUserText : styles.resellerText
                ]}>{customer.role}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </Pressable>
        ))}
      </ScrollView>

      <CustomerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        customer={selectedCustomer}
      />
    </View>
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
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  activeTabText: {
    color: '#4F46E5',
    fontFamily: 'Inter_500Medium',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
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
  productSearchContainer: {
    borderStyle: 'dashed',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
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
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    gap: 6,
    backgroundColor: '#F8FAFC',
  },
  filterButtonActive: {
    backgroundColor: '#EEF2FF',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
    width: 120,
  },
  customersList: {
    flex: 1,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  customerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  rolePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  endUserPill: {
    backgroundColor: '#DCFCE7',
  },
  resellerPill: {
    backgroundColor: '#FEF3C7',
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  endUserText: {
    color: '#22C55E',
  },
  resellerText: {
    color: '#F59E0B',
  },
});