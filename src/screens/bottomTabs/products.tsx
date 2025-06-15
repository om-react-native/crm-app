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
import ProductModal from '@/components/ProductModal';
import CustomDropdown from '@/components/CustomDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: string;
  name: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Hydrochloric Acid' },
  { id: '2', name: 'Sodium Hydroxide' },
  { id: '3', name: 'Ethanol' },
];

export default function ProductsScreen() {
  const [activeTab, setActiveTab] = useState<'search' | 'add'>('search');
  const [newProduct, setNewProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [active, setActive] = useState('All');
  const [location, setLocation] = useState('All');
  const [needToSource, setNeedToSource] = useState('All');

  const handleAddProduct = () => {
    if (newProduct.trim() === '') return;
    // Add product logic here
    setNewProduct('');
    setActiveTab('search');
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
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
              Product Search
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
              Add Product
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
                placeholder="Search products..."
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Products List Header with Filter Button */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Product List</Text>
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
                <Text style={styles.filterLabel}>Need to Source</Text>
                <CustomDropdown
                  value={needToSource}
                  onChange={setNeedToSource}
                  options={['All', 'Yes', 'No']}
                />
              </View>
            </View>
          )}

          {/* Products List */}
          <ScrollView bounces={false} style={styles.productsList}>
            {SAMPLE_PRODUCTS.map(product => (
              <Pressable
                key={product.id}
                style={styles.productItem}
                onPress={() => handleProductPress(product)}
              >
                <Text style={styles.productName}>{product.name}</Text>
                <ChevronRight size={20} color="#64748B" />
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.addProductContainer}>
          <TextInput
            style={styles.addProductInput}
            placeholder="Enter product name..."
            value={newProduct}
            onChangeText={setNewProduct}
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            style={styles.addProductButton}
            onPress={handleAddProduct}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addProductButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      )}

      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
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
  productsList: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  addProductContainer: {
    padding: 16,
    gap: 16,
  },
  addProductInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
    backgroundColor: '#FFFFFF',
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    height: 44,
    borderRadius: 8,
    gap: 8,
  },
  addProductButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
