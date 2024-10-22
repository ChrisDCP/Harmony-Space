import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAudioUrl } from '../servicios/databaseServices';
import Player from '../Components/Player';

const AudioButton = ({ title, onPress, color }) => (
  <TouchableOpacity style={[styles.audioButton, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.audioButtonText}>{title}</Text>
    <Ionicons name="play" size={24} color="white" />
  </TouchableOpacity>
);

const Relaxing = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [selectedAudio, setSelectedAudio] = useState(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const url = await getAudioUrl('BackgroundSounds/Eterna.m4a');
        setAudioUrl(url);
      } catch (error) {
        console.error("Error al obtener la URL del audio:", error);
      }
    };

    fetchAudio();
  }, []);

  const handleAudioPress = (title) => {
    setSelectedAudio(title);

  };

  return (
    <LinearGradient colors={['#9C27B0', '#2196F3']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.headerTitle}>Area de relajacion</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="diamond" size={24} color="white" style={styles.headerIcon} />
            <Ionicons name="person" size={24} color="white" />
          </View>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meditaciones</Text>
            <View style={styles.audioGrid}>
              <AudioButton title="Reduce el estrés" onPress={() => handleAudioPress("Reduce el estrés")} color="#8E44AD" />
              <AudioButton title="Reduce la ansiedad" onPress={() => handleAudioPress("Reduce la ansiedad")} color="#3498DB" />
              <AudioButton title="Ataque de pánico" onPress={() => handleAudioPress("Ataque de pánico")} color="#E91E63" />
              <AudioButton title="Relajación express" onPress={() => handleAudioPress("Relajación express")} color="#9C27B0" />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sonidos de fondo</Text>
            <View style={styles.audioGrid}>
              <AudioButton title="Música para dormir" onPress={() => handleAudioPress("Música para dormir")} color="#2196F3" />
              <AudioButton title="Respiración guiada" onPress={() => handleAudioPress("Respiración guiada")} color="#00BCD4" />
            </View>
          </View>
        </ScrollView>
        {selectedAudio && audioUrl && (
          <Player audioUrl={audioUrl} title={selectedAudio} />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:10
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginRight: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  audioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  audioButton: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Relaxing;