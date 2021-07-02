import axios from 'axios';

const ORDERBILL_LIST = "http://localhost:3005/orderbill";
const ORDERBILL_CREATE = "http://localhost:3005/orderbill";

class OrderBillService {
    getOrderBills() {
        return axios.get(ORDERBILL_LIST);
    }
    getOrderBillById(orderbillId) {
        console.log("axios id:", orderbillId);
        return axios.get("http://localhost:3005/orderbill/" + orderbillId);
    }
    deleteOrderBill(orderbillId) {
        console.log(orderbillId);
        return axios.delete("http://localhost:3005/orderbill/" + orderbillId);
    }
    createOrderBill(orderbill) {
        console.log("Axios came", JSON.stringify(orderbill));
        return axios.post(ORDERBILL_CREATE, orderbill);
    }
    updateOrderBill(orderbill, orderbillId) {
        return axios.put("http://localhost:3005/orderbill/"+ orderbillId, orderbill)
    }


}


export default new OrderBillService();