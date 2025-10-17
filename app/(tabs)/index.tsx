import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// 📦 Tipo de dato (TypeScript)
type NombreItem = string;

export default function App() {
  const [nombre, setNombre] = useState<string>('');
  const [lista, setLista] = useState<NombreItem[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  // Crear o actualizar
  const guardar = () => {
    if (nombre.trim() === '') return;

    if (editando !== null) {
      const nuevaLista = lista.map((item, index) =>
        index === editando ? nombre : item
      );
      setLista(nuevaLista);
      setEditando(null);
    } else {
      setLista([...lista, nombre]);
    }

    setNombre('');
  };

  // Editar
  const editar = (index: number) => {
    setNombre(lista[index]);
    setEditando(index);
  };

  // Eliminar
  const eliminar = (index: number) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD Súper Básico 💚</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe un nombre..."
        value={nombre}
        onChangeText={setNombre}
      />

      <Button title={editando !== null ? "Actualizar" : "Agregar"} onPress={guardar} />

      <FlatList
        data={lista}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => editar(index)} style={styles.btnEdit}>
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => eliminar(index)} style={styles.btnDelete}>
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00796B',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#B2DFDB',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    gap: 5,
  },
  btnEdit: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
  },
  btnDelete: {
    backgroundColor: '#E53935',
    padding: 5,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
  },
});
