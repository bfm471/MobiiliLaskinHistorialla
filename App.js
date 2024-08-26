import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [numbers, setNumbers] = useState({
    first: '',
    second: '',
  });
  const [result, setResult] = useState('');
  const [calculations, setCalculations] = useState([]);
  const inputFocus = useRef(null);
  let localResult;

  const handleTotal = () => {
    if (numbers.first && numbers.second) {
      localResult = Number(numbers.first) + Number(numbers.second);
      setResult(localResult);
      addToList("+");
    }
  }

  const handleDifference = () => {
    if (numbers.first && numbers.second) {
    localResult = Number(numbers.first) - Number(numbers.second);
    setResult(localResult);
    addToList("-");
    }
  }

  const addToList = (operator) => {
    setCalculations([`${numbers.first} ${operator} ${numbers.second} = ${localResult}`, ...calculations])
    setNumbers({});
    inputFocus.current.focus();
  }

  useEffect(() => {
    inputFocus.current.focus();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.laskincontainer}>
        <Text style={styles.result}>Result: {result}</Text>
        <TextInput
          style={styles.input}
          value={numbers.first}
          inputMode='numeric'
          returnKeyType='done'
          onFocus={() => setResult('')}
          onChangeText={text => setNumbers({ ...numbers, first: text })}
          ref={inputFocus}
        />
        <TextInput
          style={styles.input}
          value={numbers.second}
          inputMode='numeric'
          returnKeyType='done'
          onFocus={() => setResult('')}
          onChangeText={text => setNumbers({ ...numbers, second: text })}
        />
        <View style={styles.buttonContainer}>
          <Button size="lg" title='+' onPress={handleTotal} />
          <Button title='-' onPress={handleDifference}/>
        </View>
      </View>
      <View style={styles.listcontainer}>
        <FlatList 
          data={calculations}
          renderItem={({item}) => <Text style={styles.list}>{item}</Text>}
          ListHeaderComponent={<Text style={styles.listheader}>History</Text>}
          ListEmptyComponent={<Text>No calculations yet...</Text>}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  laskincontainer: {
    flex: 1,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    width: 150,
    padding: 8,
  },
  buttonContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'center',
  },
  listcontainer: {
    flex: 2,
  },
  list: {
    width: 150,
    height: 30,
    textAlign: 'center',
    padding: 2,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'hotpink',
    borderRadius: 10,
    marginBottom: 3,
  },
  listheader: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  }
});
