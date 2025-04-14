import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import paoDeAcucarLogo from '../../assets/logo.png';

export default function Lista() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
      const sum = list.reduce((acc, curr) => acc + parseFloat(curr.price) * parseInt(curr.quantity), 0);
    setTotalPrice(sum);
  }, [list]);

  const handleAddItem = () => {
    setList([...list, { item, price, quantity }]);
    setItem('');
    setPrice('');
    setQuantity('1');
  };

  const handleRemoveItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={paoDeAcucarLogo} style={styles.logo} />
        <View>
          <Text style={styles.subtitle}>Lista e calculadora</Text>
          <Text style={styles.title}>Lista de Compras</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Produto"
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.quantityInput}
          placeholder="Qtd."
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.item} - {item.quantity}x</Text>
            <Text style={styles.listItemText}>R$ {parseFloat(item.price) * parseInt(item.quantity)}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(index)}>
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {totalPrice.toFixed(2)}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#008000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: '#fff',
  },
  quantityInput: {
    width: 60,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#008000',
    borderRadius: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff0000',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
