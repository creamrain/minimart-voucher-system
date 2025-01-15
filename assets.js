import { StyleSheet, StatusBar, SafeAreaView, SectionList, View, Text, Button, TextInput, Modal, TouchableOpacity, Dimensions, Switch, Alert, Image, Pressable, ScrollView, ImageBackground, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

// front end purposes
const initialData = [
    {
        title: 'Welcome!',
        subtitle: 'Muhammadiyah Welfare Home',
        data: []
    }
];

// home screen
export const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.fullscreen}>
            <ImageBackground source={theme.backgroundImage} style={styles.imageBackground}>
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item.title + index}
                    renderItem={({ item }) => (
                        <View style={[styles.item, { backgroundColor: item.color }]}>
                            <Text style={[styles.title]}>{item.title}</Text>
                            {item.details && (
                                <View style={styles.detailsContainer}>
                                    <Text style={[styles.detail, { color: theme.color }]}>Stock: {item.goal}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setItemToDelete(item);
                                            setDeleteModalVisible(true);
                                        }}
                                        style={styles.deleteButton}
                                    >
                                        <Text style={[styles.deleteButtonText]}> Delete </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => openEditModal(item)}
                                        style={styles.editButton}
                                    >
                                        <Text style={[styles.deleteButtonText]}> Edit </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            <TouchableOpacity
                                style={[styles.gotoDetailsButton]}
                                onPress={() => navigation.navigate('Details', { item, additionalDetails: 'Some additional details here' })}
                            >
                                <Text style={[styles.gotoDetailsText]}>Go to {item.title} details</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <View style={[styles.headerContainer, { backgroundColor: section.color }]}>
                            <Text style={[styles.headerTitle]}>{section.title}</Text>
                            {section.subtitle && <Text style={[styles.headerSubtitle]}>{section.subtitle}</Text>}
                        </View>
                    )}
                    renderSectionFooter={({ section: { title } }) => (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => openModal(title)} style={styles.addButton}>
                                <Text style={[styles.addButtonIcon, { color: theme.color }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* add modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addModalVisible}
                    onRequestClose={() => setAddModalVisible(!addModalVisible)}
                >
                    <View style={[styles.addButtonModalView, { backgroundColor: theme.background }]}>
                        <Text style={[styles.modalText, { color: theme.color }]}>Enter new {currentSection.toLowerCase()} name</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholderTextColor={'grey'}
                            placeholder={`Enter new ${currentSection.toLowerCase()} name`}
                            value={newItemName}
                            onChangeText={text => setNewItemName(text)}
                        />
                        <Text style={[styles.modalText, { color: theme.color }]}>What is your daily goal?</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholderTextColor={'grey'}
                            placeholder="Enter daily goal"
                            value={dailyGoal}
                            keyboardType="numeric"
                            onChangeText={text => setDailyGoal(text)}

                        />
                        <Text style={[styles.modalText, { color: theme.color }]}>Select item color:</Text>
                        <ColorPicker
                            selectedColor={selectedColor}
                            onColorChange={(color) => setSelectedColor(color)}
                        />
                        <TouchableOpacity style={styles.button} onPress={addNewItem}>
                            <Text style={[styles.buttonText, { color: theme.color }]}>Add Item</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setAddModalVisible(!addModalVisible)}
                        >
                            <Text style={[styles.buttonText, { color: theme.color }]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* delete modal */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={deleteModalVisible}
                    onRequestClose={() => setDeleteModalVisible(false)}
                >
                    <View style={[styles.modalContainer]}>
                        <View style={[styles.modalView, { backgroundColor: theme.background }]}>
                            <Text style={{ color: theme.color }}>Are you sure you want to delete this item?</Text>
                            <View style={styles.modalButtons}>
                                <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
                                <Button title="Delete" onPress={handleDelete} />
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* edit modal */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={editModalVisible}
                    onRequestClose={() => setEditModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalView, { backgroundColor: theme.background }]}>
                            <Text style={{ color: theme.color }}>EDIT</Text>
                            <TextInput
                                style={[styles.input, { color: theme.color }]}
                                placeholder="Name"
                                value={editedData.title}
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setEditedData({ ...editedData, title: text })}
                            />
                            <TextInput
                                style={[styles.input, { color: theme.color }]}
                                placeholder="Goal"
                                value={editedData.goal.toString()}
                                placeholderTextColor={'grey'}
                                onChangeText={(text) => setEditedData({ ...editedData, goal: isNaN(parseInt(text)) ? '' : parseInt(text) })}
                            />
                            <View style={styles.modalButtons}>
                                <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                                <Button title="Confirm edit" onPress={handleEdit} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    );
};

// settings screen
export const SettingsScreen = () => {

    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const uid = loggedInUser.uid;

    useEffect(() => {
        console.log("SETTINGS");
        fetch_user_settings(uid);
    }, [])

    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false)

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
    const usernameInputRef = useRef(null);
    const [username, setUsername] = useState('');

    // AGE
    const ageInputRef = useRef(null);
    const [age, setAge] = useState('');

    // SCHOOL
    const [school, setSchool] = useState('');

    // MOTIVATIONALMESSAGE
    const msgInputRef = useRef(null);
    const [msg, setMsg] = useState('');

    // DARKMODE   
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // FEEDBACK
    const feedbackInputRef = useRef(null);
    const [feedback, setFeedback] = useState('');

    return (
        <SafeAreaView style={styles.fullscreen}>
            <ImageBackground source={theme.backgroundImage} style={styles.imageBackground}>
                {/* Profile Image */}
                <View style={styles.profileImageContainer}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <Pressable style={styles.imagebutton} onPress={pickImage}>
                        <Text style={[styles.buttonText, { color: theme.color }]}>Change your Profile Picture</Text>
                    </Pressable>
                </View>

                {/* Username */}
                <View style={styles.usernameContainer}>
                    <Pressable onPress={() => usernameInputRef?.current?.focus()}>
                        <Text style={{ color: theme.color }}> Username:</Text>
                        <TextInput
                            ref={usernameInputRef}
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
                    <Pressable onPress={() => ageInputRef?.current?.focus()}>
                        <Text style={{ color: theme.color }}> Age:</Text>
                        <TextInput
                            ref={ageInputRef}
                            style={styles.input}
                            onChangeText={(event) => setAge(event)}
                            value={age}
                            keyboardType={'numeric'}
                            placeholder='Edit your age here'
                            placeholderTextColor='grey'
                        />
                    </Pressable>
                </View>

                {/* School Picker */}
                <View style={styles.usernameContainer}>
                    <Text style={{ color: theme.color }}> School:</Text>
                    <Picker
                        selectedValue={school}
                        onValueChange={(itemValue) => setSchool(itemValue)}
                        style={[styles.picker2, { borderColor: 'grey', borderWidth: 1 }, { backgroundColor: theme.background }]}
                    >
                        <Picker.Item label="Select your school" value="" style={[styles.pickerItem, { backgroundColor: theme.background }]} />
                        <Picker.Item label="School 1" value="school1" style={[styles.pickerItem, { backgroundColor: theme.background }]} />
                        <Picker.Item label="School 2" value="school2" style={[styles.pickerItem, { backgroundColor: theme.background }]} />
                        <Picker.Item label="School 3" value="school3" style={[styles.pickerItem, { backgroundColor: theme.background }]} />
                    </Picker>
                </View>

                {/* Motivational Message */}
                <View style={styles.usernameContainer}>
                    <Pressable onPress={() => msgInputRef?.current?.focus()}>
                        <Text style={{ color: theme.color }}> Add a motivational message for your future self:</Text>
                        <TextInput
                            ref={msgInputRef}
                            style={styles.input}
                            onChangeText={(event) => setMsg(event)}
                            value={msg}
                            placeholder='Consistency breeds success.'
                            placeholderTextColor='grey'
                        />
                    </Pressable>
                </View>

                {/* Dark Mode */}
                <View style={styles.switchContainer}>
                    <Text style={{ color: theme.color }}> Dark Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        value={darkMode}
                        onValueChange={(value) => {
                            setDarkMode(value);
                            EventRegister.emit('ChangeTheme', value)
                        }}
                    />
                </View>

                {/* Send Feedback (need backend to 'send' feedback to admins) */}
                <View style={styles.usernameContainer}>
                    <Pressable onPress={() => feedbackInputRef?.current?.focus()}>
                        <Text style={{ color: theme.color }}> Report an issue:</Text>
                        <TextInput
                            ref={feedbackInputRef}
                            style={styles.input}
                            onChangeText={(event) => setFeedback(event)}
                            value={feedback}
                            placeholder='Bug'
                            placeholderTextColor='grey'
                        />
                    </Pressable>
                </View>

                {/* Log out */}
                <Pressable style={styles.imagebutton} onPress={() => {
                    setLoggedInUser(null)
                }}>
                    <Text style={styles.buttonText}>Log out</Text>
                </Pressable>

            </ImageBackground>
        </SafeAreaView>
    );
};

// colours
const colors = {
    background: '#f8f8f8', //light grey
    tab: '#ff6347', //orange
    accent: '#ffffff', //black
    primary: '#000000' //white
};

export const Stack = createNativeStackNavigator();

export const Tab = createBottomTabNavigator();

// tab navigation
export function TabNavigator() {
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: colors.background }}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: colors.tab,
                tabBarInactiveBackgroundColor: colors.tab,
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.primary,
            }}
        >
            <Tab.Screen
                name="Homescreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}