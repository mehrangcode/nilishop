 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const PanelUrl = urlGeneral + urlVersion 

export const PanelApi = {
    getProducts : async () => {
        return axios.get(PanelUrl+ "/products")
    },
    getOneProduct : async (productId: any) => {
        return axios.get(PanelUrl+ "/products/"+ productId)
    },
    createProduct : async (data: any) => {
        return axios.post(PanelUrl+ "/products", data)
    },
    deleteProducts : async (productId: string) => {
        return axios.delete(PanelUrl+ "/products/"+productId)
    },
    
}