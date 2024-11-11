// UserTable.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TextInput, FlatList, StyleSheet } from 'react-native';
import { fetchUsers, updateUser, deleteUser } from '../servicios/databaseService';

const UserTable = () => {
  const [users, setUsers] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({}); 

  // Función para obtener los usuarios al cargar el componente
  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  // Manejar el borrado de un usuario con confirmación
  const handleDeleteUser = (userId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await deleteUser(userId);
            setUsers((prevUsers) => {
              const updatedUsers = { ...prevUsers };
              delete updatedUsers[userId];
              return updatedUsers;
            });
          },
        },
      ]
    );
  };

  // Manejar el inicio de la edición de un usuario
  const handleEditUser = (userId) => {
    setEditingUser(userId);
    setUpdatedData(users[userId]); // Carga los datos actuales del usuario
  };

  // Manejar la actualización del usuario
  const handleUpdateUser = async () => {
    if (editingUser && updatedData) {
      await updateUser(editingUser, updatedData);
      setUsers((prevUsers) => ({
        ...prevUsers,
        [editingUser]: updatedData,
      }));
      setEditingUser(null);
      setUpdatedData({});
      alert("Usuario actualizado correctamente.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(users)}
        keyExtractor={(item) => item}
        renderItem={({ item: userId }) => (
          <View style={styles.row}>
            {editingUser === userId ? (
              <>
                <TextInput
                  style={styles.input}
                  value={updatedData.name || ""}
                  onChangeText={(text) => setUpdatedData({ ...updatedData, name: text })}
                  placeholder="Nombre del usuario"
                />
                <TextInput
                  style={styles.input}
                  value={updatedData.role || ""}
                  onChangeText={(text) => setUpdatedData({ ...updatedData, role: text })}
                  placeholder="Rol del usuario"
                />
                <Button title="Guardar" onPress={handleUpdateUser} />
                <Button title="Cancelar" onPress={() => setEditingUser(null)} />
              </>
            ) : (
              <>
                <Text style={styles.cell}>{users[userId].name}</Text>
                <Text style={styles.cell}>{users[userId].role}</Text>
                <Button title="Editar" onPress={() => handleEditUser(userId)} />
                <Button title="Eliminar" onPress={() => handleDeleteUser(userId)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  input: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 5,
  },
});

export default UserTable;
