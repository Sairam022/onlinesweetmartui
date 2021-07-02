import axios from 'axios';

const SWEETORDER_GET_ALLSWEETORDERS = "http://localhost:8081/api/osm/viewAllSweetOrders";
const SWEETORDER_GET_SWEETORDER_BY_SWEETORDERID = "http://localhost:8081/api/osm/viewSweetOrder";
const SWEETORDER_DELETE_SWEETORDER = "https://localhost:8081/api/osm/deleteSweetOrder";
const SWEETORDER_ADD_SWEETORDER = "http://localhost:8081/api/osm/addSweetOrder";
const SWEETORDER_UPDATE_SWEETORDER = "http://localhost:8081/api/osm/updateSweetOrder";

class SweetOrderService {
    
    getSweetOrders() {
        return axios.get(SWEETORDER_GET_ALLSWEETORDERS);
    }

    getSweetOrderBySweetOrderId(sweetOrderId) {
        return axios.get(SWEETORDER_GET_SWEETORDER_BY_SWEETORDERID + '/' + sweetOrderId);
    }
    deleteSweetOrder(sweetOrderId) {
        console.log("delete service");
        return axios.delete(SWEETORDER_DELETE_SWEETORDER + '/' + sweetOrderId);
    }
    createSweetOrder(sweetOrder) {
        console.log("create service");
        return axios.post(SWEETORDER_ADD_SWEETORDER, sweetOrder);
    }

    updateSweetOrder(sweetOrder, sweetOrderId) {
        console.log("came to axios update: "+sweetOrderId);
        return axios.put(SWEETORDER_UPDATE_SWEETORDER + '/' + sweetOrderId, sweetOrder);
    }
}
export default new SweetOrderService()