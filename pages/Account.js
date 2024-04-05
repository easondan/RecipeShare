import React, { useState,useCallback } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import {useFocusEffect} from '@react-navigation/native'
const Account = () => {
  const [fullName, setFullName] = useState("");
  const [newName, setNewName] = useState("");

  const handleNameChange = async () => {
    if(newName.trim() !== "") {
      const value = await supabase.auth.getUser();
      const {error:updateError} = await supabase.from('users')        
      .update({ full_name: newName })
      .eq("id" ,value.data.user.id);
      setFullName(newName);
      setNewName("");
    }
  };
  const fetchData=  async()=>{
    const value = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('users')
    .select().eq('id',value.data.user.id);
    setFullName(data[0].full_name);

  }
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.fullNameText}>Full Name: {fullName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new full name"
        onChangeText={setNewName}
        value={newName}
      />
      <TouchableOpacity style={styles.button} onPress={handleNameChange}>
        <Text style={styles.buttonText}>Change Name</Text>
      </TouchableOpacity>
    </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fullNameText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Account;
