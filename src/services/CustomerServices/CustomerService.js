import axios from 'axios';

const CUSTOMER_GET_ALLCUSTOMER = "http://localhost:8081/api/osm/customer/show-all";
const CUSTOMER_GET_CUSTOMER_BY_ID = "http://localhost:8081/api/osm/customer/show";
const CUSTOMER_DELETE_CUSTOMER= "http://localhost:8081/api/osm/customer/cancel";
const CUSTOMER_ADD_CUSTOMER = "http://localhost:8081/api/osm/customer/add";
const CUSTOMER_UPDATE_CUSTOMER = "http://localhost:8081/api/osm/customer/update";

class CustomerService {
    
    getCustomers() {
        console.log("get service");
        return axios.get(CUSTOMER_GET_ALLCUSTOMER);
    }

    getCustomerById(customerId) {
        console.log("Axios one id:"+customerId);
        return axios.get(CUSTOMER_GET_CUSTOMER_BY_ID + '/' + customerId);
    }

    deleteCustomer(customerId) {
        console.log("delete service");
        return axios.delete(CUSTOMER_DELETE_CUSTOMER + '/' + customerId);
    }

    createCustomer(customer) {
        console.log("create service");
        return axios.post(CUSTOMER_ADD_CUSTOMER, customer);
    }

    updateCustomer(customer) {
        console.log("came to axios update: "+customer);
        return axios.put(CUSTOMER_UPDATE_CUSTOMER ,customer);
    }
}
export default new CustomerService()