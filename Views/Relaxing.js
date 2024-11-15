import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAudioUrl } from '../servicios/databaseServices';
import Player from '../Components/Player';

const AudioButton = ({ title, onPress, color }) => (
  <View style={[styles.audioButton, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.audioButtonText}>{title}</Text>
    <Ionicons name="play" size={24} color="white" />
  </View>
);

const Relaxing = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isVisible, setIsvisible]= useState(false)

  const onClose =()=>{setIsvisible(false)}

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
    setIsvisible(true)
  };

  return (
    <LinearGradient colors={['#599DE6', '#F1A3Ef','#A57CFE']} style={styles.container}
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
          <Text style={styles.headerTitle}>Area de relajacion</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="diamond" size={24} color="white" style={styles.headerIcon} />
            <Ionicons name="person" size={24} color="white" />
          </View>
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pon un sonido ambiente</Text>
            <View style={styles.audioGrid}>
              <AudioButton title="Reduce el estrés" onPress={() => handleAudioPress("Reduce el estrés")} color="#8E44AD" />
              <AudioButton title="Reduce la ansiedad" onPress={() => handleAudioPress("Reduce la ansiedad")} color="#3498DB" />
              <AudioButton title="Ataque de pánico" onPress={() => handleAudioPress("Ataque de pánico")} color="#E91E63" />
              <AudioButton title="Relajación express" onPress={() => handleAudioPress("Relajación express")} color="#9C27B0" />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medita </Text>
            <View style={styles.audioGrid}>
              <AudioButton title="Música para dormir" onPress={() => handleAudioPress("Música para dormir")} color="#2196F3" />
              <AudioButton title="Respiración guiada" onPress={() => handleAudioPress("Respiración guiada")} color="#00BCD4" />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relaja el cuerpo y Respira</Text>
            <View style={styles.audioGrid}>
              <AudioButton title="Música para dormir" onPress={() => handleAudioPress("Música para dormir")} color="#2196F3" />
              <AudioButton title="Respiración guiada" onPress={() => handleAudioPress("Respiración guiada")} color="#00BCD4" />
            </View>
          </View>
        </ScrollView>
        {selectedAudio && audioUrl && (
          <Player audioUrl={audioUrl} title={selectedAudio} isVisible={isVisible} onClose={onClose}/>
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
    top:8
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
    top:20,
    backgroundColor:'white',
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign:'center',
    lineHeight:52
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