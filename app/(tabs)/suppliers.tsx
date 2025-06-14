import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Search, Plus, Filter as FilterIcon, ChevronRight } from 'lucide-react-native';
import CustomDropdown from '@/components/CustomDropdown';
import SupplierModal from '@/components/SupplierModal';

interface Supplier {
  id: string;
  name: string;
  role: 'producer' | 'reseller';
}

const SAMPLE_SUPPLIERS: Supplier[] = [
  { id: '1', name: 'ChemCorp International', role: 'producer' },
  { id: '2', name: 'Global Chemicals Ltd', role: 'reseller' },
  { id: '3', name: 'Asian Polymers Co', role: 'producer' },
];

export default function SuppliersScreen() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Filter states
  const [verified, setVerified] = useState('All');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [complete, setComplete] = useState('All');

  const handleSupplierPress = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
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
            <Text style={[styles.tabText, styles.activeTabText]}>Supplier Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Plus size={20} color="#64748B" />
            <Text style={styles.tabText}>Add Supplier</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bars */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search suppliers..."
            placeholderTextColor="#94A3B8"
            value={supplierSearch}
            onChangeText={setSupplierSearch}
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

      {/* Suppliers List Header with Filter Button */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Suppliers</Text>
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
            <Text style={styles.filterLabel}>Verified</Text>
            <CustomDropdown
              value={verified}
              onChange={setVerified}
              options={['All', 'Yes', 'No']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Complete</Text>
            <CustomDropdown
              value={complete}
              onChange={setComplete}
              options={['All', 'Yes', 'No']}
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

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Type</Text>
            <CustomDropdown
              value={type}
              onChange={setType}
              options={['All', 'Producer', 'Reseller']}
            />
          </View>
        </View>
      )}

      {/* Suppliers List */}
      <ScrollView style={styles.suppliersList}>
        {SAMPLE_SUPPLIERS.map((supplier) => (
          <Pressable
            key={supplier.id}
            style={styles.supplierItem}
            onPress={() => handleSupplierPress(supplier)}
          >
            <View style={styles.supplierInfo}>
              <Text style={styles.supplierName}>{supplier.name}</Text>
              <View style={[
                styles.rolePill,
                supplier.role === 'producer' ? styles.producerPill : styles.resellerPill
              ]}>
                <Text style={[
                  styles.roleText,
                  supplier.role === 'producer' ? styles.producerText : styles.resellerText
                ]}>{supplier.role}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </Pressable>
        ))}
      </ScrollView>

      <SupplierModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        supplier={selectedSupplier}
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
  suppliersList: {
    flex: 1,
  },
  supplierItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  supplierInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supplierName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  rolePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  producerPill: {
    backgroundColor: '#DCFCE7',
  },
  resellerPill: {
    backgroundColor: '#FEF3C7',
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    textTransform: 'capitalize',
  },
  producerText: {
    color: '#22C55E',
  },
  resellerText: {
    color: '#F59E0B',
  },
});