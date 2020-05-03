 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const PanelUrl = urlGeneral + urlVersion 

export const CategoryApi = {
    getCategoryList : async () => {
        return axios.get(PanelUrl+ "/category")
    },
    getOneCategory : async (CategoryId: any) => {
        return axios.get(PanelUrl+ "/category/"+ CategoryId)
    },
    createCategory : async (data: any) => {
        return axios.post(PanelUrl+ "/category", data)
    },
    editeCategory : async (CategoryId: string, data: any) => {
        return axios.put(PanelUrl+ "/category/"+ CategoryId, data)
    },
    deleteCategory : async (CategoryId: string) => {
        return axios.delete(PanelUrl+ "/category/"+CategoryId)
    },
    
}