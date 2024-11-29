import React, { useState } from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {datasource} from "./Data";

const Add = ({navigation}) => {
    const [Name, setName] = useState('');
    const [calories, setCalories] = useState();
    const [Image, setImage] = useState('');

    return (
        <View style={{ padding: 10,paddingTop:30 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Name:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setName(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>ImageLink:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setImage(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Calories:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setCalories(text)} />
            </View>

            <Button title="SUBMIT"
                    onPress={() =>{
                        let item = {key:Name , image:Image, calories:calories};

                        let indexnum = 0;

                        datasource[indexnum].data.push(item);

                        navigation.navigate('Home');
                    } }/>
        </View>
    );
};

export default Add;
