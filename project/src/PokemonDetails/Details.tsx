import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface Pokemon {
    name: string;
    stats: Stat[];
}

function Details({ route }: { route: { params: { order: string } } }) {
    const { order } = route.params;
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null); 

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${order}/`);
                const data: Pokemon = await response.json();
                setPokemonData(data);
            } catch (error) {
                console.error('Erro ao buscar os dados do Pokémon:', error);
            }
        };

        fetchPokemonData();
    }, [order]); 

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{pokemonData?.name}</Text> 
                    {pokemonData?.stats.map((stat, index) => (
                        <View key={index} style={styles.statContainer}>
                            <Text style={styles.statName}>{stat.stat.name}</Text>
                            <Text style={styles.statValue}>Base Stat: {stat.base_stat}</Text>
                            <Text style={styles.statValue}>Effort: {stat.effort}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statContainer: {
        marginVertical: 8,
    },
    statName: {
        fontSize: 18,
        fontWeight: '600',
    },
    statValue: {
        fontSize: 16,
    },
});

export default Details;
