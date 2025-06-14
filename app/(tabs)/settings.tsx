import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Plus, ChevronRight, Mail, Shield, LogOut } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Manager' | 'User';
  status: 'Active' | 'Pending';
}

export default function SettingsScreen() {
  const router = useRouter();
  const [users] = useState<UserType[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Administrator',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Manager',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      role: 'User',
      status: 'Pending'
    }
  ]);

  const handleAddUser = () => {
    // Handle adding new user
  };

  const handleUserPress = (user: UserType) => {
    router.push('/usersettings');
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.userList}>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userCard}
            onPress={() => handleUserPress(user)}
          >
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <User size={24} color="#4F46E5" />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <View style={styles.userMeta}>
                  <View style={styles.emailContainer}>
                    <Mail size={14} color="#64748B" />
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <View style={styles.roleContainer}>
                    <Shield size={14} color="#64748B" />
                    <Text style={styles.userRole}>{user.role}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.userActions}>
              <View style={[
                styles.statusBadge,
                user.status === 'Active' ? styles.statusActive : styles.statusPending
              ]}>
                <Text style={[
                  styles.statusText,
                  user.status === 'Active' ? styles.statusActiveText : styles.statusPendingText
                ]}>{user.status}</Text>
              </View>
              <ChevronRight size={20} color="#64748B" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
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
  userList: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 4,
  },
  userMeta: {
    gap: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userRole: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusActive: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  statusActiveText: {
    color: '#22C55E',
  },
  statusPendingText: {
    color: '#F59E0B',
  },
  logoutContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
});