import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [tareas, setTareas] = useState<string[]>([]);
  const [texto, setTexto] = useState("");

  const agregarTarea = () => {
    if (texto.trim() !== "") {
      setTareas([...tareas, texto]);
      setTexto("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="Escribe una tarea..."
      />
      <Button title="Agregar" onPress={agregarTarea} />
      <FlatList
        data={tareas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10 },
  item: { fontSize: 18, padding: 5, backgroundColor: "#eee", marginVertical: 4 },
});
