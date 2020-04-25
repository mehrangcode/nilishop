 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig'
// import axios from 'axios'
import { LoginType } from "./model"
const authUrl = urlGeneral + urlVersion 

export const AuthApi = {
    login : async (data: LoginType) => {
        return axios.post(authUrl+ "/users/login", data)
    },

    register : async (data: LoginType) => {
        return axios.post(authUrl+ "/users/register", data)
    }
}