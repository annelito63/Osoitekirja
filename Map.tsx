import { StyleSheet, View, StatusBar } from 'react-native';
import { RootStackScreenProps } from "./types";
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Map({ route }: RootStackScreenProps<'Map'>) {

    const { address } = route.params;
    const [place, setPlace] = useState(address);

    useEffect(() => {
        findPlace();
    }, []);

    const [lat, setLat] = useState(60.200692);
    const [lon, setLon] = useState(24.934302);
    const [latD, setLatD] = useState(0.0322);
    const [lonD, setLonD] = useState(0.0221);
    const [region, setRegion] = useState({
        latitude: lat,
        longitude: lon,
        latitudeDelta: latD,
        longitudeDelta: lonD,
    })

    const findPlace = () => {
        fetch(`https://geocode.maps.co/search?q=${place}&api_key=6ab28ca9135d7862906985pbce48604`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch:" + response.statusText);

                return response.json()
            })
            .then(data => {
                setLat(Number(data[0].lat));
                setLon(Number(data[0].lon));
                setRegion({
                    latitude: Number(data[0].lat),
                    longitude: Number(data[0].lon),
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                });

            })
            .catch(err => console.error(err));

    };

    return (
        <View style={styles.container}>
            <MapView
                style={{ width: '100%', height: '80%' }}
                region={region}>

                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lon
                    }}
                    title={place}
                />
            </MapView>


            <StatusBar />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white'
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});