import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import {
  Button,
  Input,
} from '../common';

import {ThemeContext} from '../theme';
import { DIMENS, SPACING } from '../constants';
import {createStackNavigator} from "@react-navigation/stack";
import {useTheme} from "react-native-paper";
import HomeScreen from "./HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";

const HomeStack = createStackNavigator();

const Login = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const {colors} = useTheme();
  // Internal State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Reference
  const passwordInput = useRef();




  const renderButtons = () => {
    // if (loading) {
    //   return <Spinner style={{ marginTop: 30 }} />;
    // }

    return (
        <View>
          <Button
              disabled={email === '' || password === ''}
              // onPress={onLoginPress}
          >
            {/*{translate('login.loginButton')}*/}
          </Button>
        </View>
    );
  };

  const renderMessages = () => {
    // if (error) {
    //   return <Text style={styles.error(theme)}>{error}</Text>;
    // }
    //
    // if (success) {
    //   return <Text style={styles.success(theme)}>{success}</Text>;
    // }
  };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>HeyAPP</Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({email:text})}/>
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({password:text})}/>
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
                title="LOGIN"
                // titleStyle={styles.loginButtonText}
                // style={styles.loginText}
                style={styles.loginBtn}
                onPress={() => navigation.navigate('MainTabScreen')}
            />

            <TouchableOpacity>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>


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
        fontSize:50,
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
