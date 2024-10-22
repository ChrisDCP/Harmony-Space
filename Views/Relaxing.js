import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { getAudioUrl } from '../servicios/databaseServices';
import Player from '../Components/Player';

const Relaxing = () => {
  const [audioUrl, setAudioUrl] = useState('');

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

  return (
    <View>
      <View> 
        <Text>Pon un sonido de fondo</Text>
       {audioUrl ? (
         <Player audioUrl={audioUrl} />
        ) : (
         <Text>Cargando audio...</Text>
      )}</View>
     <View>
      <Text>Escucha una sesion de meditacion</Text>
     </View>
    </View>
  );
};

export default Relaxing
