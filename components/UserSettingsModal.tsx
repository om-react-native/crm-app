import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, Mail, User, Lock, ChevronRight } from 'lucide-react-native';

interface UserSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function UserSettingsModal({ visible, onClose }: UserSettingsModalProps) {
  const [currentUser] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Administrator'
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>User Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Current User Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current User</Text>
              <View style={styles.userCard}>
                <View style={styles.userAvatar}>
                  <User size={24} color="#4F46E5" />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{currentUser.name}</Text>
                  <Text style={styles.userRole}>{currentUser.role}</Text>
                  <View style={styles.emailContainer}>
                    <Mail size={16} color="#64748B" />
                    <Text style={styles.userEmail}>{currentUser.email}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Account Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Settings</Text>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <User size={20} color="#64748B" />
                  <Text style={styles.settingText}>Profile Information</Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Lock size={20} color="#64748B" />
                  <Text style={styles.settingText}>Change Password</Text>
                </View>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Email Notifications</Text>
                <TouchableOpacity style={styles.toggle}>
                  <View style={[styles.toggleKnob, styles.toggleActive]} />
                </TouchableOpacity>
              </View>
              <View style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Dark Mode</Text>
                <TouchableOpacity style={styles.toggle}>
                  <View style={styles.toggleKnob} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.signOutButton}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
  },
  modalBody: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#1E293B',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#4F46E5',
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  preferenceLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1E293B',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    padding: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleActive: {
    transform: [{ translateX: 20 }],
    backgroundColor: '#4F46E5',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  signOutButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});