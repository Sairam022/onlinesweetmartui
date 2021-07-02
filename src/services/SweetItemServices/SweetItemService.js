import axios from 'axios';

const SWEETITEM_GET_ALLSWEETITEMS = "http://localhost:8081/api/osm/viewAllSweetItems";
const SWEETITEM_GET_SWEETITEM_BY_ORDERITEMID = "http://localhost:8081/api/osm/viewSweetItem";
const SWEETITEM_DELETE_SWEETITEM = "https://localhost:8081/api/osm/deleteSweetItem";
const SWEETITEM_ADD_SWEETITEM = "http://localhost:8081/api/osm/addSweetItem";
const SWEETITEM_UPDATE_SWEETITEM = "http://localhost:8081/api/osm/updateSweetItem";

class SweetItemService {
    
    getSweetItems() {
        return axios.get(SWEETITEM_GET_ALLSWEETITEMS);
    }

    getSweetItemByOrderItemId(orderItemId) {
        return axios.get(SWEETITEM_GET_SWEETITEM_BY_ORDERITEMID + '/' + orderItemId);
    }
    deleteSweetItem(orderItemId) {
        console.log("delete service", orderItemId);
        return axios.delete(SWEETITEM_DELETE_SWEETITEM + '/' + orderItemId);
    }
    createSweetItem(sweetItem) {
        return axios.post(SWEETITEM_ADD_SWEETITEM, sweetItem);
    }

    updateSweetItem(sweetItem, orderItemId) {
        console.log("came to axios update: "+orderItemId);
        return axios.put(SWEETITEM_UPDATE_SWEETITEM + '/' + orderItemId, sweetItem);
    }
}
export default new SweetItemService()