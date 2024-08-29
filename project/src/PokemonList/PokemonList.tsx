import { ActivityIndicator, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import PokemonCard from "../Components/PokemonCard";

interface Pokemon{
  name: string;
  url: string;
}
export default function PokemonList () {
  const [pokemon, setPokemon]= useState<Pokemon[]>([])
  const [next, setNext] = useState<string>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const load = () => {
    if(isLoadingMore) return
    if(next){
      setIsLoadingMore(true) ;
      fetch(next)
      .then(res => res.json())
      .then(data => {
        setPokemon(prevState => ([...prevState,...data.results]))
        setNext(data.next)
        setIsLoadingMore(false)
      })
    }
  }
  useEffect(() =>{
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(res => res.json())
    .then(data => {
      setPokemon(data.results)
      setNext(data.next)
    })
  },[])
  console.log(pokemon)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList data={pokemon} keyExtractor={item => item.name}
        renderItem={({ item }) => <PokemonCard url={item.url}/>}
        onEndReached={(load)}
        ListFooterComponent={() => isLoadingMore ? <ActivityIndicator/>: null}
        />
    </SafeAreaView>
  );
}
