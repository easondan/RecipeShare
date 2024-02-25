import React,{useState} from 'react';
import { View, Text,TouchableOpacity,TextInput } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
const SearchRecipe = ({ route }) => {
  const { searchData } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{searchData}</Text>
    </View>
  );
};

export default SearchRecipe;
