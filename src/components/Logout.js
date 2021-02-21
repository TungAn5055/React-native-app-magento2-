import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage  from '@react-native-community/async-storage';
const Logout = ({navigation}) => {
  // Internal State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoader, setLoginLoader] = useState(false);

  useEffect(() => {
      clearTokenLogout();
      navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
      });
      navigation.navigate('LoginDrawer');
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
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Mummum Logout</Text>
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



export default connect(null, null)(Logout);
