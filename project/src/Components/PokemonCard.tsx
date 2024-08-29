import React from 'react'
import { Text, Image, View , TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


interface PokemonProps{
    url: string;
}
interface Pokemon {
    name: string;
    order: number;
    sprites:{
        other:{
            'official-artwork':{
                front_default:string
            }
        }
    }
    types:{
        slot: number;
        type:{
            name: string;
        }
    }
}
function PokemonCard({url}: PokemonProps) {
    const [pokemon, setPokemon] = useState<Pokemon>()
    const navigation = useNavigation();
    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => setPokemon(data))
    },[url])
    if(!pokemon) return null;
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Details",  { order: pokemon.order})}>
        <View>
            <Image source={{uri: pokemon.sprites.other['official-artwork'].front_default}}
            style={styles.image}/>
        </View>
        <Text>{pokemon.order}</Text>
        <Text>{pokemon.name}</Text>

    </TouchableOpacity>
  )
}

export default PokemonCard

const styles = StyleSheet.create({
    container:{
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 100,
        height: 100,
        marginRight: 12,
    },
    name:{
        fontWeight: 'bold',
        fontSize: 32,
    }
})