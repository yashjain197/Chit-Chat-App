import axios from "axios";
import { Platform } from "react-native";

const ADDRESS = Platform.OS == 'ios' 
 ?'http://192.168.0.117:8000' 
 :'http://10.0.2.2:8000'

const api = axios.create({
    baseURL: ADDRESS,
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': false,
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}
})

export default api