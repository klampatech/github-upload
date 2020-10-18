import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';


// Create Home Screen
function HomeScreen({ navigation }) {
  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => setDataSource(json))
    setRefreshing(false);
  });

  return (
    <View style={ styles.container }>
      <Text style={{ textAlign: 'center', textAlignVertical: 'top', color: '#555555'}}>( Pull to refresh... )</Text>
      <FlatList
        data={dataSource}
        keyExtractor={({ id }, index) => id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={ styles.list }
            onPress={() => {
              navigation.navigate('Details', {
                itemId: item.id,
                otherParam:

                // Details Page
                <React.Fragment>
                  <View>
                    <Text style={{fontSize: 30, paddingBottom: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 15}}>{item.company.name}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', paddingBottom: 10}}>Contact Information</Text>
                    <Text style={{ paddingBottom: 20 }}>{item.email}</Text>
                    <Text>{item.address.street}</Text>
                    <Text>{item.address.suite}</Text>
                    <Text>{item.address.city}</Text>
                    <Text>{item.address.zipcode}</Text>
                    <Text>{item.phone}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', paddingBottom: 10}}>Other Information</Text>
                    <Text>{item.website}</Text>
                    <Text>{item.company.catchPhrase}</Text>
                    <Text>{item.company.bs}</Text>
                  </View>
                </React.Fragment>
              });
            }}>
            <View style={{ paddingBottom: 40, paddingLeft: 60, flexDirection: 'row', alignItems: 'flex-start' }}>
              <Icon style={{ paddingRight: 20, alignSelf: 'flex-start' }} name='person-circle-outline' type='ionicon' size={35} color="#555555"/>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
            </View>
            <Text style={{ paddingLeft: 115, color: 'white' }}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Create Details Screen
function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: 40, paddingTop: 40 }}>
      {otherParam}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 5,
    paddingTop: 40
  },

  list: {
    paddingTop: 30,
    paddingBottom: 30,
    margin: 5,
    backgroundColor: '#4086AA',
    borderColor: '#91C3DC',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});

export default App;