import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Calculadora() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handlePress = (value) => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult(null);
  };

  const handleDelete = () => {
    setExpression((prevExpression) => prevExpression.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(expression);
      setResult(evalResult);
      setHistory([...history, { expression, result: evalResult }]);
      setExpression('');
    } catch (error) {
      alert('Erro na expressão');
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.subHeaderText}>Calculadora</Text>
        </View>
      </View>
      <View style={styles.display}>
        <Text style={styles.displayText}>{expression}</Text>
        {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('/')}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('*')}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.numberButton]} onPress={() => handlePress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handleCalculate()}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]} onPress={() => handlePress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete()}>
            <Text style={styles.buttonText}>DEL</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
        <Text style={styles.clearButtonText}>Limpar Histórico</Text>
      </TouchableOpacity>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>{item.expression} = {item.result}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10, // Reduzindo o padding geral
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Reduzindo o marginBottom
  },
  logo: {
    width: 80, 
    height: 50, 
    marginRight: 10,
  },
  headerText: {
    fontSize: 24, // Reduzindo o tamanho da fonte
    fontWeight: 'bold',
    color: '#000',
  },
  subHeaderText: {
    fontSize: 26, // Reduzindo o tamanho da fonte
    fontWeight: 'bold',
    color: '#008000',
  },
  display: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10, // Reduzindo o marginBottom
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  result: {
    fontSize: 17,
    color: 'red',
    marginTop: 1,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Alinhando os botões na linha
    marginBottom: 10, // Reduzindo o marginBottom
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginLeft: 13
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  numberButton: {
    backgroundColor: '#4CAF50', // Amarelo
  },
  operationButton: {
    backgroundColor: '#8990a2', // Azul
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 17,
  
  },
  clearButton: {
    backgroundColor: '#008000', // Verde
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 15 // Reduzindo o marginBottom
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 18,
    color: '#333',
  },
});
