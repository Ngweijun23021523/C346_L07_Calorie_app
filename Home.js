import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Button, ScrollView,Alert} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import { datasource } from './Data';
import {useState} from "react";


const styles = StyleSheet.create({
    opacityStyle: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightgreen',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginLeft:10,
        fontStyle: 'italic',


    },
    headerText: {
        fontSize: 20,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:20

    },
    iconStyle: {
        marginRight: 10
    },
    buttonContainer: {

        top: 0,
        width: '100%',
        padding: 10,
        backgroundColor: 'green',
        flexDirection: 'column',
        paddingTop:50

    },

    image:{
        width:80 ,
        height:80,
        alignSelf: 'right',
        resizeMode: 'contain',

    },
    calculate:{
        bottom: 0,
        width: '100%',
        padding: 10,
        backgroundColor: 'green',
        flexDirection: 'column',

    },
});



const Home = ({navigation}) => {
    const [TotalCalories, setTotalCalories] = useState(0);
    const recommendedCalories = {
        male: 2000,
        female: 1600
    };

    const renderItem = ({ item,index,section }) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() => {
                                  navigation.navigate('Edit', { index: index, type: section.title, key: item.key ,image:item.image ,calories:item.calories});
                              }}
            >

                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.textStyle}>{item.key}</Text>
                <Text style={styles.textStyle}>{item.calories} calories</Text>
            </TouchableOpacity>
        );
    };


    const calculateCalories = () => {
        let total = 0;
        datasource.forEach(section => {
            section.data.forEach(item => {
                total += Number(item.calories);
            });
        });
        setTotalCalories(total);

        const message = `
        Total Calories: ${total}\n
        Recommended for males: ${recommendedCalories.male} calories
        Recommended for females: ${recommendedCalories.female} calories
        `;

        if (total > recommendedCalories.male) {
            Alert.alert('Excess Calorie Intake (Male)', message);
        } else if (total > recommendedCalories.female) {
            Alert.alert('Excess Calorie Intake (Female)', message);
        } else {
            Alert.alert('Calorie Intake Within Limits', message);
        }

    };




    return (

            <View>
                <View style={styles.buttonContainer}>
                    <Button title="Add Food"  onPress={() => navigation.navigate('Add')}/>
                </View>
                <SectionList
                    sections={datasource}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title, bgcolor,iconName, } }) => (
                        <View style={[styles.sectionHeader, { backgroundColor: bgcolor }]}>
                            <Icon name={iconName} size={20} color="#fff" style={styles.iconStyle} />

                            <Text style={styles.headerText}>{title}</Text>


                        </View>
                    )}

                />

                <View style={styles.calculate}>
                    <Button title="Calculate calories" onPress={calculateCalories} value={TotalCalories} />
                </View>
            </View>

    );
}

export default Home;
