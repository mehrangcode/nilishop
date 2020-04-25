 import { urlGeneral, urlVersion } from "../../Utils/General/GConst"
import axios from '../../AxiosConfig';
const PanelUrl = urlGeneral + urlVersion 

export const PanelApi = {
    getPanelData : async () => {
        return axios.get(PanelUrl+ "/users/panel")
    },

    // PRODUCTS API
    createNoteBook : async (data: any) => {
        return axios.post(PanelUrl+ "/products", data)
    },
    deleteNoteBook : async (notebookId: number) => {
        return axios.delete(PanelUrl+ "/products/"+notebookId)
    },
    
}