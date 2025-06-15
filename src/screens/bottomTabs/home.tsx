import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Settings, Plus, Search, ChevronDown } from 'lucide-react-native';

import TaskItem from '@/components/TaskItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from '@/services/taskService';
import { Task } from '@/types/task';
import CustomLoader from '@/components/CustomLoader';
import { pushScreen } from '@/navigation/action';
import { AppRoutesConstants } from '@/navigation/constants';
import {
  addPriceUpdate,
  deletePriceUpdate,
  fetchPriceUpdates,
  PriceUpdate,
} from '@/services/priceUpdateService';
import { isEmpty } from 'lodash';
import {
  addOceanFreight,
  deleteOceanFreight,
  fetchOceanFreight,
  OceanFreight,
} from '@/services/oceanFreightService';

const userId = auth().currentUser?.uid;

export default function HomeScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [priceUpdateInput, setPriceUpdateInput] = useState('');
  const [oceanFreightInput, setOceanFreightInput] = useState('');
  const [priceUpdateSearch, setPriceUpdateSearch] = useState('');
  const [oceanFreightSearch, setOceanFreightSearch] = useState('');

  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [waitingTasks, setWaitingTasks] = useState<Task[]>([]);
  const [priceUpdates, setPriceUpdates] = useState<PriceUpdate[]>([]);

  const [oceanFreight, setOceanFreight] = useState<OceanFreight[]>([]);
  const [showAllPriceUpdates, setShowAllPriceUpdates] = useState(false);
  const [showAllOceanFreight, setShowAllOceanFreight] = useState(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      loadTasks();
      loadPriceUpdate();
      loadOceanFreight();
    }
  }, []);

  const loadTasks = async () => {
    try {
      const snapshot = await fetchTasks(userId ?? ''); // snapshot = Firebase docs
      const allTasks: Task[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          status: data.status,
          userId: data.userId,
          createdAt: data.createdAt,
        };
      });

      setActiveTasks(allTasks.filter(t => t.status === 'active'));
      setWaitingTasks(allTasks.filter(t => t.status === 'waiting'));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleAddTask = async () => {
    setShowLoader(true);
    if (!taskInput.trim()) return;
    const newTask = await addTask(userId ?? '', taskInput.trim());
    setActiveTasks(prev => [newTask, ...prev]);
    setTaskInput('');
    setShowLoader(false);
  };

  const handleNeedReply = async (taskId: string) => {
    await updateTaskStatus(taskId, 'waiting');
    loadTasks(); // refresh
  };

  const handleRemoveTask = async (taskId: string, isWaiting: boolean) => {
    setShowLoader(true);
    await deleteTask(taskId);
    if (isWaiting) {
      setWaitingTasks(prev => prev.filter(t => t.id !== taskId));
    } else {
      setActiveTasks(prev => prev.filter(t => t.id !== taskId));
    }
    setShowLoader(false);
  };

  const loadPriceUpdate = async () => {
    setShowLoader(true);

    const updates = await fetchPriceUpdates();
    setPriceUpdates(updates);
    setShowLoader(false);
  };

  const handleAddPriceUpdate = async () => {
    if (isEmpty(priceUpdateInput.trim())) {
      Alert.alert('Alert', 'Please add some description for price update');
      return;
    }

    setShowLoader(true);
    await addPriceUpdate(priceUpdateInput.trim());
    const updates = await fetchPriceUpdates();
    setPriceUpdates(updates);
    setPriceUpdateInput('');
    setShowLoader(false);
  };
  const handleRemovePriceUpdate = async (id: string) => {
    setShowLoader(true);
    await deletePriceUpdate(id);
    const updates = await fetchPriceUpdates();
    setPriceUpdates(updates);
    setShowLoader(false);
  };

  const displayedPriceUpdates = priceUpdates
    .filter(update =>
      update.description
        .toLowerCase()
        .includes(priceUpdateSearch.toLowerCase()),
    )
    .slice(0, showAllPriceUpdates ? priceUpdates.length : 10);

  const filteredPriceUpdates = priceUpdates.filter(update =>
    update.description.toLowerCase().includes(priceUpdateSearch.toLowerCase()),
  );

  const loadOceanFreight = async () => {
    const updates = await fetchOceanFreight();
    setOceanFreight(updates);
  };

  const handleAddOceanFreight = async () => {
    setShowLoader(true);
    await addOceanFreight(oceanFreightInput.trim());
    const updates = await fetchOceanFreight();
    setOceanFreight(updates);
    setOceanFreightInput('');
    setShowLoader(false);
  };

  // Remove
  const handleRemoveOceanFreight = async (id: string) => {
    setShowLoader(true);
    await deleteOceanFreight(id);
    const updates = await fetchOceanFreight();
    setOceanFreight(updates);
    setShowLoader(false);
  };

  const filteredOceanFreight = oceanFreight.filter(update =>
    update.description.toLowerCase().includes(oceanFreightSearch.toLowerCase()),
  );

  const displayedOceanFreight = showAllOceanFreight
    ? filteredOceanFreight
    : filteredOceanFreight.slice(0, 10);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomLoader visible={showLoader} />

        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              pushScreen(AppRoutesConstants.SETTING);
            }}
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
          {activeTasks.map(task => (
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
          {waitingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={() => handleRemoveTask(task.id, true)}
              isWaiting
            />
          ))}
          {waitingTasks.length === 0 && (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No tasks waiting for reply
              </Text>
            </View>
          )}
        </View>

        <View style={styles.priceUpdatesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price Updates</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddPriceUpdate}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addTaskForm}>
            <TextInput
              style={styles.taskInput}
              placeholder="Enter price update description..."
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
          {displayedPriceUpdates.map(update => (
            <View key={update.id} style={styles.priceUpdateItem}>
              <View style={styles.priceUpdateContent}>
                <Text style={styles.priceUpdateDate}>{update.date}</Text>
                <Text style={styles.priceUpdateDescription}>
                  {update.description}
                </Text>
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddOceanFreight}
            >
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
          {displayedOceanFreight.map(update => (
            <View key={update.id} style={styles.priceUpdateItem}>
              <View style={styles.priceUpdateContent}>
                <Text style={styles.priceUpdateDate}>{update.date}</Text>
                <Text style={styles.priceUpdateDescription}>
                  {update.description}
                </Text>
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
              <Text style={styles.emptyStateText}>
                No ocean freight updates
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  waitingContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  priceUpdatesContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
