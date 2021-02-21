import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { connect } from 'react-redux';

import {
    Button,
    Input, LoadingView,
} from '../common';
import axios from "axios";
import clientRequest from '../../config/requestAxios';
import AsyncStorage  from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  // Internal State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);

  useEffect(() => {
      clearTokenLogout();
  }, []);
  const clearTokenLogout = async () => {
    const token = await AsyncStorage.getItem(
        'authen_token',
    );
    if (token !== null) {
        await AsyncStorage.removeItem(
            'authen_token'
        );
    }
  }
  const onClickLogin = async () => {
        // if (email && password) {
            setLoginLoader(true);
            const requestURL = `rest/default/V1/integration/admin/token`;
        await axios.post(requestURL, {
                    username: 'an',
                    password: 'admin@123'
                    // username: email,
                    // password: password
                })
                .then((res) => {
                    if (res.status === 200) {
                        AsyncStorage.setItem(
                            'authen_token',
                            res.data
                        );
                    }
                    setLoginLoader(false);
                    navigation.navigate('MainTabScreen');
                })
                .catch((err) => {
                    setLoginLoader(false);
                })
        // }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Mummum Login</Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Name..."
                    placeholderTextColor="#003f5c"
                    // value={email}
                    onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    // value={password}
                    onChangeText={text => setPassword(text)}/>
            </View>
            {loginLoader ? (
                <LoadingView size='small'/>
            ) : (
                <Button
                    title="LOGIN"
                    style={styles.loginBtn}
                    onPress={onClickLogin}
                />
            )
            }
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:35,
        color:"#fb5b5a",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    }
});



export default connect(null, null)(Login);
