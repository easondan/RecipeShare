import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

const FilterModal = ({ visible, onClose, onApply }) => {
  const [course, setCourse] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [servings, setServings] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState(1440); // Default maximum preparation time in minutes
  const [maxCookTime, setMaxCookTime] = useState(1440); // Default maximum cook time in minutes
  const [error, setError] = useState('');

  const applyFilters = () => {
    // Convert difficulty to specific casing
    const formattedDifficulty = difficulty.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

    // Validate difficulty

const isValidDifficulty = /^(?:Easy|Medium|Hard)?$/i.test(formattedDifficulty);
if (!isValidDifficulty) {
  setError('Difficulty must be Easy, Medium, Hard, or blank');
  return;
}


    // Convert max times to minutes
    const maxPrepTimeInMinutes = Math.round(maxPrepTime);
    const maxCookTimeInMinutes = Math.round(maxCookTime);

    // Pass filters to parent component
    onApply({ course, cuisine, difficulty: formattedDifficulty, servings, maxPrepTime: maxPrepTimeInMinutes, maxCookTime: maxCookTimeInMinutes });
    // Clear error if there was one
    setError('');
    onClose();
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours} hours ${Math.round(minutes)} minutes`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Filters</Text>
          <View style={styles.filterContainer}>
            <Text>Course:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter course"
              value={course}
              onChangeText={setCourse}
            />
            <Text>Cuisine:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cuisine"
              value={cuisine}
              onChangeText={setCuisine}
            />
            <Text>Difficulty:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter difficulty"
              value={difficulty}
              onChangeText={setDifficulty}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text>Servings:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter servings"
              value={servings}
              onChangeText={setServings}
            />
            <Text>Max Preparation Time: {formatTime(maxPrepTime)}</Text>
            <Slider
              style={{ width: '100%', marginBottom: 10 }}
              minimumValue={0}
              maximumValue={1440} // Maximum value for 24 hours
              value={maxPrepTime}
              onValueChange={(value) => setMaxPrepTime(value)}
            />
            <Text>Max Cook Time: {formatTime(maxCookTime)}</Text>
            <Slider
              style={{ width: '100%', marginBottom: 10 }}
              minimumValue={0}
              maximumValue={1440} // Maximum value for 24 hours
              value={maxCookTime}
              onValueChange={(value) => setMaxCookTime(value)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#333333" />
            <Button title="Apply Filters" onPress={applyFilters} color="#FF5733" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FilterModal;
