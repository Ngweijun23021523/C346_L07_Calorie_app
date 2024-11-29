import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import { datasource } from './Data';

const Edit = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.key);
    const [image, setImage] = useState(route.params.image || '');
    const [calories,setCalories] = useState(route.params.calories);

    return (
        <View style={{ padding: 10 , paddingTop:30}}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Name:</Text>
                <TextInput
                    value={name}
                    style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image Link:</Text>
                <TextInput
                    value={image}
                    style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
                    onChangeText={(text) => setImage(text)}
                />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Calories:</Text>
                <TextInput
                    value={calories}
                    style={{ borderWidth: 1, padding: 5, borderRadius: 5 }}
                    onChangeText={(text) => setCalories(text)}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Button
                    title="Save"
                    onPress={() => {
                        const indexNum = route.params.type === 'Food' ? 0 : 1;
                        datasource[indexNum].data[route.params.index] = { key: name, image ,calories};
                        navigation.navigate('Home');
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        let indexNum =1
                        if(route.params.type === "Food"){
                            indexNum=   0;
                        }
                        Alert.alert('Are you sure?', '', [
                            {
                                text: 'Yes',
                                onPress: () => {
                                    datasource[indexNum].data.splice(route.params.index, 1);
                                    navigation.navigate('Home');
                                },
                            },
                            { text: 'No' },
                        ]);
                    }}
                />
            </View>
        </View>
    );
};


export default Edit;
