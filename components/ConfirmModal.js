import React from 'react'
import { View, Text, Button, Modal, StyleSheet, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Octicons';

const ConfirmModal = ({ isVisible, onCancel, onConfirm, msg }) => {
  return (
    <Modal>
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          
          <Icon name="x-circle-fill" size={50} color="red"/>
          <Text style={styles.actionText}>Are you sure?</Text>

          <Text>
            You're about to delete the recipe '{recipeData.name}'
            This action cannot be undone. 
          </Text>

        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
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
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  actionText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    elevation: 5
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  }
})

export default ConfirmModal;
