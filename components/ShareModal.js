import React, { useState, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ShareProfile from "./ShareProfile";
import { supabase } from '../lib/supabase'

const ShareModal = ({ cookbook, setModalVisible }) => {

  const emailInputRef = useRef(null);
  const [newEmail, setNewEmail] = useState("");

  const [possibleUsers, setPossibleUsers] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);

  const [existingUserIds, setExistingUserIds] = useState([]);
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  const [addedUserIds, setAddedUserIds] = useState([]);

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
        setExistingUserIds(sharedUserIds);
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
    if (!existingUserIds.includes(user.id) && !addedUserIds.includes(user.id)) {
      setSharedUsers([...sharedUsers, user]);
      setAddedUserIds([...addedUserIds, user.id]);
    }
    if (deletedUserIds.includes(user.id)) {
      // Remove from list of deletes if added back
      setDeletedUserIds(deletedUserIds.filter((id => id !== user.id)))
    }
    // Clear field, simulates "sent" request
    if (emailInputRef.current) {
      emailInputRef.current.clear();
    }
  }

  const deleteUser = (userId) => {
    if (addedUserIds.includes(userId)) {
      setAddedUserIds(addedUserIds.filter((id => id !== userId)))
    }
    setDeletedUserIds([...deletedUserIds, userId]);
    setSharedUsers(sharedUsers.filter((user => user.id !== userId)))
  }

  const saveShareCookbook = async () => {
    setModalVisible(false);
    for (const id of addedUserIds) {
      const { error } = await supabase
        .from("shared_cookbooks")
        .insert({
          "cookbook_id" : cookbook.id,
          "shared_user_id" : id
        });
      if (error) {
        console.error('Error inserting users:', error);
      }
    }
    for (const id of deletedUserIds) {
      const { error } = await supabase
        .from("shared_cookbooks")
        .delete()
        .eq("cookbook_id", cookbook.id)
        .eq("shared_user_id", id);
      if (error) {
        console.error('Error deleting users:', error);
      }
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
                placeholder="Enter an email address"
                placeholderTextColor="#888"
                inputMode="text"
                keyboardType="default"
                multiline={true}
                ref={emailInputRef}
                onChangeText={setNewEmail}
              />
            </View>
            <TouchableOpacity onPress={addUser}>
              <Icon style={{padding: 5}} name="account-plus" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleModalText}>Manage Member Permissions</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.userContainer}>
              {sharedUsers.map((user) => (
                <ShareProfile key={user.id} userData={user} deleteUser={deleteUser}/>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={0.7} style={styles.saveButton} onPress={saveShareCookbook}>
            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 20, textAlign: 'center' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const userHeight = 45;
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
    alignItems: 'center',
  },
  scrollView: {
    maxHeight: (3 * userHeight) + 32,
  },
  userContainer: {
    padding: 10,
    gap: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingTop: 0,
    width: "85%",
    justifyContent: 'center'
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
    width: 120,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: "#D75B3F",
  }
});

export default ShareModal;
