import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Search, Filter as FilterIcon } from 'lucide-react-native';
import CustomDropdown from '@/components/CustomDropdown';

interface SearchResult {
  id: string;
  name: string;
  type: 'Customer' | 'Supplier';
  location: string;
  needsSource?: boolean;
  verified?: boolean;
  status?: string;
}

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [needsSource, setNeedsSource] = useState('All');
  const [verified, setVerified] = useState('All');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [country, setCountry] = useState('All');

  // Sample data - in a real app, this would come from your backend
  const sampleData: SearchResult[] = [
    {
      id: '1',
      name: 'Acme Corp',
      type: 'Customer',
      location: 'New York, USA',
      needsSource: false,
      verified: true,
      status: 'Active',
    },
    {
      id: '2',
      name: 'ChemCorp International',
      type: 'Supplier',
      location: 'Shanghai, China',
      needsSource: true,
      verified: true,
      status: 'Active',
    },
    {
      id: '3',
      name: 'TechChem Industries',
      type: 'Customer',
      location: 'Berlin, Germany',
      needsSource: false,
      verified: false,
      status: 'Inactive',
    },
    {
      id: '4',
      name: 'Global Chemicals Ltd',
      type: 'Supplier',
      location: 'London, UK',
      needsSource: true,
      verified: false,
      status: 'Pending',
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    let filtered = sampleData.filter(
      item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase()),
    );

    // Apply filters
    if (needsSource !== 'All') {
      filtered = filtered.filter(item =>
        needsSource === 'Yes' ? item.needsSource : !item.needsSource,
      );
    }
    if (verified !== 'All') {
      filtered = filtered.filter(item =>
        verified === 'Yes' ? item.verified : !item.verified,
      );
    }
    if (type !== 'All') {
      filtered = filtered.filter(item => item.type === type);
    }
    if (status !== 'All') {
      filtered = filtered.filter(item => item.status === status);
    }
    if (country !== 'All') {
      filtered = filtered.filter(item => item.location.includes(country));
    }

    setSearchResults(filtered);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers and suppliers..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showFilters && styles.filterButtonActive,
          ]}
          onPress={toggleFilters}
        >
          <FilterIcon size={20} color={showFilters ? '#4F46E5' : '#64748B'} />
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

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Need to Source</Text>
            <CustomDropdown
              value={needsSource}
              onChange={setNeedsSource}
              options={['All', 'Yes', 'No']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Verified</Text>
            <CustomDropdown
              value={verified}
              onChange={setVerified}
              options={['All', 'Yes', 'No']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Type</Text>
            <CustomDropdown
              value={type}
              onChange={setType}
              options={['All', 'Customer', 'Supplier']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Status</Text>
            <CustomDropdown
              value={status}
              onChange={setStatus}
              options={['All', 'Active', 'Inactive', 'Pending']}
            />
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Country</Text>
            <CustomDropdown
              value={country}
              onChange={setCountry}
              options={[
                'All',
                'USA',
                'China',
                'Germany',
                'UK',
                'France',
                'Japan',
                'India',
              ]}
            />
          </View>
        </View>
      )}

      {searchQuery.trim() !== '' && (
        <ScrollView style={styles.resultsContainer}>
          {searchResults.map(result => (
            <TouchableOpacity key={result.id} style={styles.resultItem}>
              <View>
                <Text style={styles.resultName}>{result.name}</Text>
                <Text style={styles.resultLocation}>{result.location}</Text>
                <View style={styles.resultMeta}>
                  {result.needsSource && (
                    <View style={[styles.badge, styles.needsSourceBadge]}>
                      <Text style={[styles.badgeText, styles.needsSourceText]}>
                        Needs Source
                      </Text>
                    </View>
                  )}
                  {result.verified && (
                    <View style={[styles.badge, styles.verifiedBadge]}>
                      <Text style={[styles.badgeText, styles.verifiedText]}>
                        Verified
                      </Text>
                    </View>
                  )}
                  {result.status && (
                    <View
                      style={[
                        styles.badge,
                        result.status === 'Active'
                          ? styles.activeBadge
                          : result.status === 'Inactive'
                          ? styles.inactiveBadge
                          : styles.pendingBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          result.status === 'Active'
                            ? styles.activeText
                            : result.status === 'Inactive'
                            ? styles.inactiveText
                            : styles.pendingText,
                        ]}
                      >
                        {result.status}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.typeBadge,
                  result.type === 'Customer'
                    ? styles.customerBadge
                    : styles.supplierBadge,
                ]}
              >
                <Text
                  style={[
                    styles.typeText,
                    result.type === 'Customer'
                      ? styles.customerText
                      : styles.supplierText,
                  ]}
                >
                  {result.type}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          {searchResults.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          )}
        </ScrollView>
      )}

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map interface will be displayed here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    gap: 6,
    backgroundColor: '#F8FAFC',
    alignSelf: 'flex-start',
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
  filtersContainer: {
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
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    maxHeight: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 4,
  },
  resultLocation: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  resultMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  needsSourceBadge: {
    backgroundColor: '#FEF3C7',
  },
  needsSourceText: {
    color: '#F59E0B',
  },
  verifiedBadge: {
    backgroundColor: '#DCFCE7',
  },
  verifiedText: {
    color: '#22C55E',
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
  },
  activeText: {
    color: '#22C55E',
  },
  inactiveBadge: {
    backgroundColor: '#FEE2E2',
  },
  inactiveText: {
    color: '#EF4444',
  },
  pendingBadge: {
    backgroundColor: '#F3E8FF',
  },
  pendingText: {
    color: '#A855F7',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  customerBadge: {
    backgroundColor: '#DCFCE7',
  },
  supplierBadge: {
    backgroundColor: '#F3E8FF',
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  customerText: {
    color: '#22C55E',
  },
  supplierText: {
    color: '#A855F7',
  },
  noResults: {
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  mapText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
});
