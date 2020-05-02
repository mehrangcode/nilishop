 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const PanelUrl = urlGeneral + urlVersion 

export const PanelApi = {
    getProducts : async () => {
        return axios.get(PanelUrl+ "/products")
    },
    
}