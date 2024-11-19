import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Diary = () => {
  const [entries, setEntries] = useState([
    { id: 1, date: '2024-11-12', title: 'Un día productivo', content: 'Hoy logré completar todas mis tareas y me siento muy satisfecho.' },
    { id: 2, date: '2024-11-11', title: 'Reflexiones sobre la semana', content: 'Esta semana ha sido desafiante pero he aprendido mucho sobre mí mismo.' },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const today = new Date().toISOString().split('T')[0];
      setEntries([
        { id: entries.length + 1, date: today, ...newEntry },
        ...entries
      ]);
      setNewEntry({ title: '', content: '' });
      setModalVisible(false);
    }
  };

  return (
    <LinearGradient colors={['#4C1D95', '#5B21B6']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Diario</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.entriesList}>
        {entries.map(entry => (
          <View key={entry.id} style={styles.entryCard}>
            <Text style={styles.entryDate}>{entry.date}</Text>
            <Text style={styles.entryTitle}>{entry.title}</Text>
            <Text style={styles.entryContent} numberOfLines={3}>{entry.content}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient colors={['#4C1D95', '#5B21B6']} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Entrada</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="#A78BFA"
              value={newEntry.title}
              onChangeText={(text) => setNewEntry({...newEntry, title: text})}
            />
            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="¿Qué quieres recordar hoy?"
              placeholderTextColor="#A78BFA"
              multiline
              value={newEntry.content}
              onChangeText={(text) => setNewEntry({...newEntry, content: text})}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addEntry} style={styles.saveButton}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 20,
    padding: 10,
  },
  entriesList: {
    flex: 1,
  },
  entryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  entryDate: {
    color: '#A78BFA',
    fontSize: 12,
    marginBottom: 4,
  },
  entryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  entryContent: {
    color: '#E9D5FF',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    color: 'white',
    width: '100%',
    marginBottom: 12,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#6B7280',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Diary;