import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button, Pressable, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';


const PearsImage = require('./assets/images/pear.jpg');
const CookiesImage = require('./assets/images/cookie.jpg');

// Home Page Component
const HomePage = ({ navigation }) => {
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

  const openProductDetails = (product) => {
    navigation.navigate('ProductDetails', { product });
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
        onPress={() => alert('No transactional history found. Start shopping today!')}
      />

      <Text style={styles.shoppingTitle}>Shopping</Text>

      <View style={styles.productList}>
        {products.map((product, index) => (
          <Pressable key={index} onPress={() => openProductDetails(product)}>
            <View style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          </Pressable>
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

// Product Details Page Component
const ProductDetailsPage = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.productTitle}>{product.name}</Text>
      <Image source={product.image} style={styles.productImage2} />
      <Text style={styles.productPrice}>Price: ${product.price}</Text>
      <Text style={styles.productPrice}>Quantity: 5</Text>
      <Button
        title="Out of Stock?"
        color="#FF6F00"
        onPress={() => alert('Request receieved, check your inbox for future stock updates.')}
      />
    </View>
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

            {/*  Admin Picker */}
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
                    <Picker.Item label="Others" value="others" style={[styles.pickerItem]} />
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
    </SafeAreaView>
    );
  };


const { width } = Dimensions.get('window');

const styles = {
  container: { flex: 1, padding: 16 },
  welcomeText: { fontSize: 24, marginBottom: 16 },
  shoppingTitle: { fontSize: 18, marginVertical: 16 },
  productList: { flexDirection: 'row', flexWrap: 'wrap' },
  productCard: { width: 200, padding: 10, margin: 10, backgroundColor: '#f5f5f5' },
  productImage: { width: 160, height: 100 },
  productName: { fontSize: 16, marginTop: 8 },
  productPrice: { fontSize: 14, color: '#888' },
  modal: { padding: 20, backgroundColor: 'white', marginTop: 20 },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  productTitle: { fontSize: 24, marginBottom: 16 },
  settingsText: { fontSize: 20, marginTop: 20 },
  detailsContainer: { padding: 10, alignItems: 'center' },
  productTitle: { fontSize: 24, marginBottom: 16 },  
  productImage2: { width: width*0.7, height: 300, marginBottom: 16 },
  productPrice: { fontSize: 18, marginBottom: 16 },
  picker: { 
    height: 40,
    width: '100%',
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
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  pickerItem: {
    fontSize: 12, 
  },
  usernameContainer: {
    padding: 10,
  },
  pickerContainer: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
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
  //  backgroundColor: theme.color,
  },

};

export { HomePage, ProductDetailsPage, SettingsPage };
