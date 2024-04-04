import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const ActionButton = ({ onPress, type = 'add', disabled = false }) => {

  const renderIconComponent = () => {
    switch(type) {
      case "share":
        return <MaterialIcon name='people' color='white' size= {40}/>;
      case "confirm":
        return <MaterialCommunityIcon name='check-bold' color="white" size= {40}/>;
      default:
        return <MaterialCommunityIcon name='plus' color="white" size= {40}/>;
    }
  }

  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled]} 
      onPress={onPress} 
      disabled={disabled}
      activeOpacity={0.6}
    >
      {renderIconComponent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D75B3F',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 40,
    elevation: 5, // Add elevation for drop shadow
  },
  disabled: {
    backgroundColor: 'rgba(215, 91, 63, 0.5)'
  }
});

export default ActionButton;
