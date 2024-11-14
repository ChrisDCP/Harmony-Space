import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Cards = ({ onPress, type }) => {

  const getIcon = () => {
    switch (type) {
      case 'meditation':
        return <Ionicons name="body" size={40} color="white" />;
      case 'music':
        return <Ionicons name="musical-note" size={40} color="white" />;
      case 'bot':
        return <Ionicons name="chatbubble-ellipses-outline" size={40} color="white" />;
      case 'profile':
        return (
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>Perfil</Text>
          </View>
        );
    }
  };

  const getGradientColors = () => {
    switch (type) {
      case 'meditation':
        return ['#9C27B0', '#7B1FA2'];
      case 'music':
        return ['#7C4DFF', '#651FFF'];
      case 'bot':
        return ['#3F51B5', '#303F9F'];
      case 'profile':
        return ['#5E35B1', '#4527A0'];
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {getIcon()}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  profileText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cards;