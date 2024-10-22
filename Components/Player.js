import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

const Player = ({ audioUrl }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState({});

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload the sound from memory when the component unmounts
        }
      : undefined;
  }, [sound]);

  const handlePlayPause = async () => {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl }, {}, (status) => setStatus(status));
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } else if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View>
      <Button title={isPlaying ? 'Pausar' : 'Reproducir'} onPress={handlePlayPause} />
      <Text>Reproduciendo: {isPlaying ? 'Sí' : 'No'}</Text>
    </View>
  );
};

export default Player;
