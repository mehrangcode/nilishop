 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const preUrl = urlGeneral + urlVersion 

export const ProductApi = {
    getProducts : async () => {
        return axios.get(preUrl+ "/products")
    },
    getOneProduct : async (productId: any) => {
        return axios.get(preUrl+ "/products/"+ productId)
    },
    createProduct : async (data: any) => {
        return axios.post(preUrl+ "/products", data)
    },
    editeProduct : async (productId: string, data: any) => {
        return axios.put(preUrl+ "/products/"+ productId, data)
    },
    deleteProducts : async (productId: string) => {
        return axios.delete(preUrl+ "/products/"+productId)
    },
    getGalleryDir : async (path: string) => {
        return axios.post(preUrl+ "/loader", {path})
    },
    createNewFolder : async (path: string) => {
        return axios.post(preUrl+ "/gallery/createfolder", {path})
    },
    uploadNewFile : async (data: any) => {
        return axios.post(preUrl+ "/fileuploader", data)
    },
    
}