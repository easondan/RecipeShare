import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ShareProfile from "./ShareProfile";
import { ScrollView } from "react-native-gesture-handler";
import { supabase } from '../lib/supabase'
import { useFocusEffect } from '@react-navigation/native';

const ShareModal = ({ cookbook, setModalVisible }) => {

  const [newEmail, setNewEmail] = useState("");

  const [possibleUsers, setPossibleUsers] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);
  const [updatedUserIds, setUpdatedUserIds] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        const { data: allUserData, error : allUserError } = await supabase.from('users').select();
        if (allUserError) {
          Alert.alert("ERROR", "Failed to load users!");
          console.error('Error fetching all users:', allUserError);
        }
        setPossibleUsers(allUserData);

        const { data: sharedUserData, error: sharedUserError } = await supabase
          .from('shared_cookbooks')
          .select('shared_user_id')  // Select user ids 
          .eq('cookbook_id', cookbook.id);  // Where cookbook_id matches current cookbook
        if (sharedUserError) {
          Alert.alert("ERROR", "Failed to load shared users!");
          console.error('Error fetching cookbook shared users:', sharedUserError);
        }
        // Filter out full shared user records 
        const sharedUserIds = sharedUserData.map(obj => obj.shared_user_id);
        const filteredUsers = []
        for (const user of allUserData) {
          if (sharedUserIds.includes(user.id)) {
            filteredUsers.push(user);
          }
        }
        setSharedUsers(filteredUsers);
        setUpdatedUserIds(sharedUserIds);
      }
      // Fetch possible users
      fetchUsers();
    }, [])
  );

  const addUser = () => {
    // Search possible users for requested user
    const user = possibleUsers.filter((user => user.email === newEmail))[0];
    if (!user) {
      Alert.alert("User Not Found", "The requested user doesn't exist!");
      return;
    }
    if (!updatedUserIds.includes(user.id)) {
      setSharedUsers([...sharedUsers, user]);
      setUpdatedUserIds([...updatedUserIds, user.id]);
    }
    if (deletedUsers.includes(user.id)) {
      // Remove from list of deletes if added back
      setDeletedUsers(deletedUsers.filter((id => id !== user.id)))
    }
  }

  const deleteUser = (userId) => {
    setDeletedUsers([...deletedUsers, userId]);
    setSharedUsers(sharedUsers.filter((user => user.id !== userId)))
    setUpdatedUserIds(updatedUserIds.filter((id => id !== userId)))
  }

  const saveShareCookbook = async () => {
    for (const user of possibleUsers) {
      if (updatedUserIds.includes(user.id) && !deletedUsers.includes(user.id)) {
        await supabase.from("shared_cookbooks").insert({
          "cookbook_id" : cookbook.id,
          "shared_user_id" : user.id
        });
      }
    }
    for (const userId of deletedUsers) {
      await supabase.from("shared_cookbooks").delete({
        "cookbook_id" : cookbook.id,
        "shared_user_id" : userId
      })
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => {setModalVisible(false)}}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Manage Sharing</Text>
        <View style={styles.cookbookTitleContainer}>
          <Text style={styles.titleModalText}>Add Members</Text>
          <View style={styles.addMemberContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Email Address"
                placeholderTextColor="#888"
                inputMode="text"
                keyboardType="default"
                multiline={true}
                onChangeText={setNewEmail}
              />
            </View>
            <TouchableOpacity onPress={addUser}>
              <Icon style={{padding: 5}} name="account-plus" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleModalText}>Manage Member Permissions</Text>
          <ScrollView>
            <View style={styles.userContainer}>
              {sharedUsers.map((user) => (
                <ShareProfile key={user.id} userData={user} deleteUser={deleteUser}/>
              ))}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveShareCookbook}>
          <Text style={{ color: "white", fontSize: 20, textAlign: 'center' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inputContainer: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  addMemberContainer: {
    margin: 10,
    marginTop: 5,
    flexDirection: "row",
    alignItems: 'center'
  },
  userContainer: {
    margin: 10,
    gap: 5,
    backgroundColor: 'blue'
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingTop: 0,
    width: "85%",
  },
  closeIcon: {
    top: 10,
    right: 10,
    padding: 5,
    position: "absolute",
  },
  input: {
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 15,
  },
  titleModalText: {
    fontSize: 18,
    margin: 10,
    marginBottom: 0
  },
  saveButton: {
    padding: 20,
    margin: 40,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: "#D75B3F",
  }
});

export default ShareModal;
