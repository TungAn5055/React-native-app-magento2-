import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
axios.defaults.baseURL = 'https://vietship.de/';

axios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authen_token');
        if(token !== null) {
            config.headers.common.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // error => {
    //   if (error.response.status === 401 || error.response.status === 503) {
    //     window.location.href = process.env.REACT_APP_DEFAULT_LOGIN_URL;
    //   }
    //   return Promise.reject(error.response); // transform response.response -> response
    // },
);
// axios.defaults.headers.common.Authorization =
//     'Bearer 4kmdxwstu5562ykoz96nwa8ehroau1ms';


