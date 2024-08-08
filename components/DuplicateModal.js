import {React,useState} from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const DuplicateModal = ({ isVisible, onCancel, onConfirm, type, name,setName}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
      // TODO does not close on backdrop click, could use 'react-native-modal' for this
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          
          {/* <Icon name="x-circle-fill" size={50} color="red"/> */}
          <Text style={styles.actionText}>Copy {type}</Text>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={type + " Name"} 
          value={name}
          onChangeText={setName}
        />
        </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm} activeOpacity={0.7}>
              <Text style={[styles.buttonText, {color : 'white', fontWeight: 'bold'}]}>Duplicate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchContainer: {
    width: 220,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9DC698',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    margin: 5, 
    alignItems:'center'
  },
  modalCard: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 5,
    // TODO iOS elevation
    margin: 20,
  },
  actionText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    paddingBottom: 0
  },
  msgText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 30,
    marginTop: 15,
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: '#D75B3F',
    backgroundColor: "#D75B3F",
    borderRadius: 20,
    margin: 10
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 20,
    margin: 10
  },
  buttonText: {
    color: '#222222',
    textAlign: 'center',
    letterSpacing: 1.5,
    fontSize: 20,
    minWidth: 75,
    margin: 15
  }
})

export default  DuplicateModal;
