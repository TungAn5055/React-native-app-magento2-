import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authen_token');
        console.log('show token');
        console.log(token);
        if(token !== null) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
    } catch(e) {
        console.log(e)
    }
}
getToken();
axios.defaults.baseURL = 'https://vietship.de/';
// axios.defaults.headers.common.Authorization =
//     'Bearer 4kmdxwstu5562ykoz96nwa8ehroau1ms';


