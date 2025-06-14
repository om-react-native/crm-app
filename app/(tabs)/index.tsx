import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, Plus, Search, ChevronDown } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import TaskItem from '@/components/TaskItem';

const INITIAL_ACTIVE_TASKS = [
  {
    id: '1',
    description: 'Follow up with Acme Corp',
    status: 'Active',
  },
  {
    id: '2',
    description: 'Update safety data sheets',
    status: 'Active',
  },
  {
    id: '3',
    description: 'Review new supplier application',
    status: 'Active',
  },
];

const INITIAL_PRICE_UPDATES = [
  {
    id: '1',
    description: 'Hydrochloric Acid price increase from ChemCorp',
    status: 'Waiting',
    date: '2025-03-15',
  },
  {
    id: '2',
    description: 'Sodium Hydroxide Q2 pricing update needed',
    status: 'Waiting',
    date: '2025-03-14',
  },
];

const INITIAL_OCEAN_FREIGHT = [
  {
    id: '1',
    description: 'Shanghai to Los Angeles rates increased by 15%',
    status: 'Waiting',
    date: '2025-03-15',
  },
  {
    id: '2',
    description: 'New surcharge for Mediterranean routes',
    status: 'Waiting',
    date: '2025-03-14',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [taskInput, setTaskInput] = useState('');
  const [priceUpdateInput, setPriceUpdateInput] = useState('');
  const [oceanFreightInput, setOceanFreightInput] = useState('');
  const [priceUpdateSearch, setPriceUpdateSearch] = useState('');
  const [oceanFreightSearch, setOceanFreightSearch] = useState('');
  const [activeTasks, setActiveTasks] = useState(INITIAL_ACTIVE_TASKS);
  const [waitingTasks, setWaitingTasks] = useState<typeof INITIAL_ACTIVE_TASKS>([]);
  const [priceUpdates, setPriceUpdates] = useState(INITIAL_PRICE_UPDATES);
  const [oceanFreight, setOceanFreight] = useState(INITIAL_OCEAN_FREIGHT);
  const [showAllPriceUpdates, setShowAllPriceUpdates] = useState(false);
  const [showAllOceanFreight, setShowAllOceanFreight] = useState(false);

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = {
      id: Date.now().toString(),
      description: taskInput.trim(),
      status: 'Active',
    };
    setActiveTasks(prev => [...prev, newTask]);
    setTaskInput('');
  };

  const handleAddPriceUpdate = () => {
    if (priceUpdateInput.trim() === '') return;
    const newPriceUpdate = {
      id: Date.now().toString(),
      description: priceUpdateInput.trim(),
      status: 'Waiting',
      date: new Date().toISOString().split('T')[0],
    };
    setPriceUpdates(prev => [...prev, newPriceUpdate]);
    setPriceUpdateInput('');
  };

  const handleAddOceanFreight = () => {
    if (oceanFreightInput.trim() === '') return;
    const newOceanFreight = {
      id: Date.now().toString(),
      description: oceanFreightInput.trim(),
      status: 'Waiting',
      date: new Date().toISOString().split('T')[0],
    };
    setOceanFreight(prev => [...prev, newOceanFreight]);
    setOceanFreightInput('');
  };

  const handleRemoveTask = (id: string, isWaiting: boolean) => {
    if (isWaiting) {
      setWaitingTasks(prev => prev.filter(task => task.id !== id));
    } else {
      setActiveTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  const handleRemovePriceUpdate = (id: string) => {
    setPriceUpdates(prev => prev.filter(update => update.id !== id));
  };

  const handleRemoveOceanFreight = (id: string) => {
    setOceanFreight(prev => prev.filter(update => update.id !== id));
  };

  const handleNeedReply = (taskId: string) => {
    const taskToMove = activeTasks.find(task => task.id === taskId);
    if (taskToMove) {
      setActiveTasks(prev => prev.filter(task => task.id !== taskId));
      setWaitingTasks(prev => [...prev, { ...taskToMove, status: 'Need Reply' }]);
    }
  };

  const filteredPriceUpdates = priceUpdates.filter(update =>
    update.description.toLowerCase().includes(priceUpdateSearch.toLowerCase())
  );

  const filteredOceanFreight = oceanFreight.filter(update =>
    update.description.toLowerCase().includes(oceanFreightSearch.toLowerCase())
  );

  const displayedPriceUpdates = showAllPriceUpdates 
    ? filteredPriceUpdates 
    : filteredPriceUpdates.slice(0, 10);

  const displayedOceanFreight = showAllOceanFreight 
    ? filteredOceanFreight 
    : filteredOceanFreight.slice(0, 10);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <Settings size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.addTaskContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Add New Task</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addTaskForm}>
          <TextInput
            style={styles.taskInput}
            placeholder="Enter new task..."
            value={taskInput}
            onChangeText={setTaskInput}
            placeholderTextColor="#94A3B8"
            multiline={true}
            numberOfLines={2}
          />
        </View>
      </View>

      <View style={styles.tasksContainer}>
        <Text style={styles.sectionTitle}>Active Tasks</Text>
        {activeTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={() => handleRemoveTask(task.id, false)}
            onNeedReply={() => handleNeedReply(task.id)}
          />
        ))}
        {activeTasks.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No active tasks</Text>
          </View>
        )}
      </View>

      <View style={styles.waitingContainer}>
        <Text style={styles.sectionTitle}>Waiting for Reply</Text>
        {waitingTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={() => handleRemoveTask(task.id, true)}
            isWaiting
          />
        ))}
        {waitingTasks.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No tasks waiting for reply</Text>
          </View>
        )}
      </View>

      <View style={styles.priceUpdatesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Price Updates</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPriceUpdate}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addTaskForm}>
          <TextInput
            style={styles.taskInput}
            placeholder="Enter price update..."
            value={priceUpdateInput}
            onChangeText={setPriceUpdateInput}
            placeholderTextColor="#94A3B8"
            multiline={true}
            numberOfLines={2}
          />
        </View>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search price updates..."
            value={priceUpdateSearch}
            onChangeText={setPriceUpdateSearch}
            placeholderTextColor="#94A3B8"
          />
        </View>
        {displayedPriceUpdates.map((update) => (
          <View key={update.id} style={styles.priceUpdateItem}>
            <View style={styles.priceUpdateContent}>
              <Text style={styles.priceUpdateDate}>{update.date}</Text>
              <Text style={styles.priceUpdateDescription}>{update.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemovePriceUpdate(update.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        {filteredPriceUpdates.length > 10 && !showAllPriceUpdates && (
          <TouchableOpacity 
            style={styles.showMoreButton} 
            onPress={() => setShowAllPriceUpdates(true)}
          >
            <Text style={styles.showMoreText}>Show All</Text>
            <ChevronDown size={20} color="#4F46E5" />
          </TouchableOpacity>
        )}
        {filteredPriceUpdates.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No price updates</Text>
          </View>
        )}
      </View>

      <View style={styles.priceUpdatesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ocean Freight</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddOceanFreight}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addTaskForm}>
          <TextInput
            style={styles.taskInput}
            placeholder="Enter ocean freight update..."
            value={oceanFreightInput}
            onChangeText={setOceanFreightInput}
            placeholderTextColor="#94A3B8"
            multiline={true}
            numberOfLines={2}
          />
        </View>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ocean freight updates..."
            value={oceanFreightSearch}
            onChangeText={setOceanFreightSearch}
            placeholderTextColor="#94A3B8"
          />
        </View>
        {displayedOceanFreight.map((update) => (
          <View key={update.id} style={styles.priceUpdateItem}>
            <View style={styles.priceUpdateContent}>
              <Text style={styles.priceUpdateDate}>{update.date}</Text>
              <Text style={styles.priceUpdateDescription}>{update.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveOceanFreight(update.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        {filteredOceanFreight.length > 10 && !showAllOceanFreight && (
          <TouchableOpacity 
            style={styles.showMoreButton} 
            onPress={() => setShowAllOceanFreight(true)}
          >
            <Text style={styles.showMoreText}>Show All</Text>
            <ChevronDown size={20} color="#4F46E5" />
          </TouchableOpacity>
        )}
        {filteredOceanFreight.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>No ocean freight updates</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
  },
  settingsButton: {
    padding: 8,
  },
  addTaskContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addTaskForm: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
    marginBottom: 0,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
    height: 64,
    textAlignVertical: 'top',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },
  tasksContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  waitingContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  priceUpdatesContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 16,
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
  priceUpdateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  priceUpdateContent: {
    flex: 1,
    gap: 4,
  },
  priceUpdateDate: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
  },
  priceUpdateDescription: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  removeText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#EF4444',
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyStateText: {
    color: '#94A3B8',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 8,
  },
  showMoreText: {
    color: '#4F46E5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
});