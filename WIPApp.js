import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create loading boolean and dataSource array for json results


// Make API call and set loading to false
componentDidMount() {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then((responseJson) => {
    this.setState({
      loading: false,
      dataSource: responseJson
    })
  })
}

// Create Home Screen
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title='Go to details'
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// Create Details Screen
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

// Create Stack object
const Stack = createStackNavigator();

// Define prop routes for screens
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;