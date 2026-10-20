import { StyleSheet, View, FlatList, Alert, } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context';
import { PaperProvider, Appbar, TextInput, Button, Card, Text, IconButton } from 'react-native-paper';
import app from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { RootStackScreenProps } from './types';



export default function Places({ navigation }: RootStackScreenProps<'Places'>) {
    type Place = {
        key: string;
        address: string;
    };


    const database = getDatabase(app);

    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState<Place[]>([]);


    const handleSave = async () => {
        if (address != null) {
            push(ref(database, 'items/'), {
                address: address
            });
            setAddress('');
        } else {
            Alert.alert('Error', 'Type address first');
        }
    };

    useEffect(() => {
        return onValue(ref(database, 'items/'), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const addresses = Object.keys(data).map(key => ({
                    key,
                    ...data[key]
                }));
                setAddresses(addresses);
            } else {
                setAddresses([]);
            }
        });
    }, []);




    const handleDelete = async (key: string) => {
        try {
            await remove(ref(database, `items/${key}`));
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <PaperProvider>

            <SafeAreaProvider>
                <Appbar.Header elevated>
                    <Appbar.Content title="My Places" />
                </Appbar.Header>
                <SafeAreaView style={styles.container}>
                    <TextInput style={styles.input}
                        value={address}
                        placeholder='Type in address'
                        onChangeText={address => setAddress(address)}
                    />
                    <View style={styles.buttons}>
                        <Button mode="contained" icon="content-save" onPress={handleSave} style={styles.button}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </Button>

                    </View>
                    <FlatList
                        keyExtractor={item => item.key}
                        data={addresses}
                        renderItem={({ item }) =>
                            <Card style={{ marginBottom: 10 }} onLongPress={() => handleDelete(item.key)}>
                                <Card.Content>
                                    <View style={styles.row}>
                                    <Text variant="bodyMedium">{item.address}</Text>
                                    <Button onPress={() => navigation.navigate('Map', { address: item.address })} >
                                        <Text>show on map</Text>
                                    </Button>
                                    </View>
                                </Card.Content>
                            </Card>
                        }
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </PaperProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 8
    },
    buttons: {
        flexDirection: 'row',
        paddingTop: 20
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white'
    },
    list: {
        flexDirection: 'row',
        paddingTop: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

});
