import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onRemove: () => void;
  onNeedReply?: () => void;
  isWaiting?: boolean;
}

const TaskItem = ({
  task,
  onRemove,
  onNeedReply,
  isWaiting,
}: TaskItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <X size={20} color="#94A3B8" />
      </TouchableOpacity>

      <View style={styles.taskContent}>
        <Text style={styles.description}>{task.text}</Text>
      </View>

      {!isWaiting && onNeedReply && (
        <TouchableOpacity style={styles.needReplyButton} onPress={onNeedReply}>
          <Text style={styles.needReplyText}>Need Reply</Text>
        </TouchableOpacity>
      )}

      {isWaiting && (
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{task.status}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  removeButton: {
    padding: 4,
  },
  taskContent: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  needReplyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EEF2FF',
  },
  needReplyText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#4F46E5',
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEF3C7',
  },
  status: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#F59E0B',
  },
});

export default TaskItem;
