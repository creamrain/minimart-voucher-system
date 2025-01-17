import React, { useState, useRef } from 'react';
import { Image, View, Text, Button, StyleSheet, TextInput, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PearsImage from './assets/images/pear.jpg';
import CookiesImage from './assets/images/cookie.jpg';
import { Ionicons } from 'react-native-vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

// Home Page Component
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    { name: 'Pears', price: 10, image: PearsImage },
    { name: 'Cookies', price: 7.99, image: CookiesImage },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', price: '', image: '' });
      setShowModal(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome User!</Text>

      <Button
        title="Check Vouchers"
        color="#FF6F00"
        onPress={() => alert('No Vouchers Found')}
      />
      <Text> </Text>
      <Button
        title="Check Transactional History"
        color="#FF6F00"
        onPress={() => alert('No transcational history found. Start shopping today!')}
      />

      <Text style={styles.shoppingTitle}>Shopping</Text>

      <View style={styles.productList}>
        {products.map((product, index) => (
          <View key={index} style={styles.productCard}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
        ))}
      </View>

      <Button title="+" onPress={() => setShowModal(true)} color="#FF6F00" />

      {showModal && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add New Product</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={newProduct.name}
            onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Product Image URL"
            value={newProduct.image}
            onChangeText={(text) => setNewProduct({ ...newProduct, image: text })}
          />
          <Button title="Add Product" onPress={addProduct} color="#003366" />
          <Button title="Close" onPress={() => setShowModal(false)} color="#999" />
        </View>
      )}
    </ScrollView>
  );
};

// Settings Page Component
const SettingsPage = () => {
  // PROFILE IMAGE
  const [image, setImage] = useState(null);

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
          setImage(result.assets[0].uri);
      }
  };

  // USERNAME
  const [username, setUsername] = useState('');

  // AGE
  const [age, setAge] = useState('');

  // ROLE
  const [role, setRole] = useState('');

  // FEEDBACK
  const [feedback, setFeedback] = useState('');

  return (
      <SafeAreaView style={styles.fullscreen}>
        <ScrollView contentContainerStyle={styles.container}>
              {/* Profile Image */}
              <View style={styles.profileImageContainer}>
                  {image && <Image source={{ uri: image }} style={styles.image} />}
                  <Pressable style={styles.imagebutton} onPress={pickImage}>
                      <Text style={[styles.buttonText]}>Change your Profile Picture</Text>
                  </Pressable>
              </View>

              {/* Username */}
              <View style={styles.usernameContainer}>
                  <Pressable>
                      <Text> Username:</Text>
                      <TextInput
                          style={styles.input}
                          onChangeText={(event) => setUsername(event)}
                          value={username}
                          placeholder='Edit your username here'
                          placeholderTextColor='grey'
                      />
                  </Pressable>
              </View>

              {/* Age */}
              <View style={styles.usernameContainer}>
                  <Pressable>
                      <Text> Age:</Text>
                      <TextInput
                          style={styles.input}
                          onChangeText={(event) => setAge(event)}
                          value={age}
                          keyboardType={'numeric'}
                          placeholder='Edit your age here'
                          placeholderTextColor='grey'
                      />
                  </Pressable>
              </View>

              {/* Role Picker */}
              <View style={styles.usernameContainer}>
                  <Text> Role:</Text>
                  <Picker
                      selectedValue={role}
                      onValueChange={(itemValue) => setRole(itemValue)}
                      style={[styles.picker, { borderColor: 'grey', borderWidth: 1 }]}
                  >
                      <Picker.Item label="Select your role" value="" style={[styles.pickerItem]} />
                      <Picker.Item label="Resident" value="resident" style={[styles.pickerItem]} />
                      <Picker.Item label="Admin" value="admin" style={[styles.pickerItem]} />
                      <Picker.Item label="Owner" value="owner" style={[styles.pickerItem]} />
                  </Picker>
              </View>

              {/* Send Feedback (need backend to 'send' feedback to admins) */}
              <View style={styles.usernameContainer}>
                  <Pressable>
                      <Text> Report an issue:</Text>
                      <TextInput
                          style={styles.input}
                          onChangeText={(event) => setFeedback(event)}
                          value={feedback}
                          placeholder='Bug'
                          placeholderTextColor='grey'
                      />
                  </Pressable>
              </View>

              {/* Log out */}
              <Pressable style={styles.imagebutton}>
                  <Text style={styles.buttonText}>Log out</Text>
              </Pressable>
              </ScrollView>
      </SafeAreaView>
  );
};

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF6F00', // Active color
          tabBarInactiveTintColor: '#999',  // Inactive color
          tabBarStyle: { backgroundColor: '#fff' }, // Optional: background color for the tab bar
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} /> // Home icon
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} /> // Settings icon
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f5f8',
  },
  welcomeText: {
    fontSize: 28,
    color: '#003366',
    marginBottom: 20,
  },
  shoppingTitle: {
    fontSize: 24,
    color: '#003366',
    marginVertical: 20,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  productCard: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', // Adjust the width for better alignment
  },
  productImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontWeight: 'bold',
    color: '#003366',
  },
  productPrice: {
    color: '#FF6F00',
    fontSize: 14,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -200 }, // Offset by half of the modal's width (width: 400px => 200px)
      { translateY: -175 }, // Offset by half of the modal's height (height: 350px => 175px)
    ],
    backgroundColor: '#fafafa',
    padding: 20,
    borderRadius: 8,
    elevation: 10,
    width: 400, 
    height: 350, 
  },  
  modalTitle: {
    fontSize: 22,
    color: '#003366',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  settingsText: {
    fontSize: 18,
    color: '#003366',
    marginTop: 20,
  },
  usernameContainer: {
    padding: 10,
  },
  picker: { 
    height: 40,
    width: '95%',
    marginVertical: 10,
    alignSelf: 'center',
    color: 'grey',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1, 
    borderRadius: 5,
    alignSelf: 'center',
  },
  pickerContainer: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  pickerItem: { 
    fontSize: 12, 
  },
  buttonText: {
     textAlign: 'center',
   },
   profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    top: 7,
    postiion: 'absolute',
  },
  imagebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '95%',
    marginVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});

export default App;
