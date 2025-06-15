import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BadgeCheck,
} from 'lucide-react-native';
import { User } from '@/services/userService';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserFormModal: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const [newUser, setNewUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    role: 'Manager',
    status: 'Active',
    id: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!newUser.name.trim()) errs.name = 'Name is required';
    if (!newUser.email.includes('@')) errs.email = 'Invalid email';
    if (newUser.password.length < 6) errs.password = 'Min 6 characters';
    if (!['User', 'Manager', 'Administrator'].includes(newUser.role))
      errs.role = 'Role must be User, Manager, or Administrator';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(newUser);
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'Manager',
        status: 'Active',
        id: '',
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New User</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Name */}
            <View style={styles.inputContainer}>
              <UserIcon size={18} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Name"
                value={newUser.name}
                onChangeText={text => {
                  setNewUser(prev => ({ ...prev, name: text }));
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                }}
                style={[styles.input, errors.name && styles.inputError]}
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            {/* Email */}
            <View style={styles.inputContainer}>
              <Mail size={18} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Email"
                value={newUser.email}
                onChangeText={text => {
                  setNewUser(prev => ({ ...prev, email: text }));
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                style={[styles.input, errors.email && styles.inputError]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password */}
            <View style={styles.inputContainer}>
              <Lock size={18} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={newUser.password}
                onChangeText={text => {
                  setNewUser(prev => ({ ...prev, password: text }));
                  if (errors.password)
                    setErrors(prev => ({ ...prev, password: '' }));
                }}
                style={[styles.input, errors.password && styles.inputError]}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#94A3B8" />
                ) : (
                  <Eye size={20} color="#94A3B8" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Role */}
            <View style={styles.inputContainer}>
              <BadgeCheck size={18} color="#64748B" style={styles.inputIcon} />
              <TextInput
                placeholder="Role (User / Manager / Administrator)"
                value={newUser.role}
                onChangeText={text => {
                  setNewUser(prev => ({ ...prev, role: text as any }));
                  if (errors.role) setErrors(prev => ({ ...prev, role: '' }));
                }}
                style={[styles.input, errors.role && styles.inputError]}
              />
            </View>
            {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserFormModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#111827',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
  },
  cancelText: {
    color: '#1E293B',
    fontWeight: 'bold',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 6,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
