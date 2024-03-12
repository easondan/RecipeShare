import React,{useState} from 'react';
import { View, Text,TouchableOpacity,TextInput } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
const SearchPage = ({ route }) => {
  const { title,searchText,filters } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{searchText}</Text>
    </View>
  );
};

export default SearchPage;
