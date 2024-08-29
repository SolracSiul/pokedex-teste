import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PokemonList from "./src/PokemonList/PokemonList";
import PokemonDetails from "./src/PokemonDetails/Details"


export const Layout = () =>{
  const Stack = createNativeStackNavigator()

  return(
  <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
              name="PokemonList"
              component={PokemonList}
              options={({ navigation }) => ({
                title: 'Pokemons',
                
              })}
            />
              <Stack.Screen name="Details" component={PokemonDetails}></Stack.Screen>
  

          </Stack.Navigator>
        </NavigationContainer>

  )
}
const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    
        <Layout/>
      
  );
};

export default App;