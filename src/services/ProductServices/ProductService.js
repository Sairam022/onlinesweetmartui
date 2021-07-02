import axios from 'axios';

const PRODUCT_GET_ALLPRODUCTS = "http://localhost:8081/api/osm/viewAllProducts";
const PRODUCT_GET_PRODUCT_BY_ID = "http://localhost:8081/api/osm/viewProduct";
const PRODUCT_DELETE_PRODUCT = "http://localhost:8081/api/osm/deleteProduct";
const PRODUCT_ADD_PRODUCT = "http://localhost:8081/api/osm/addProduct";
const PRODUCT_UPDATE_PRODUCT = "http://localhost:8081/api/osm/updateProduct";

class ProductService {
    
    getProducts() {
        return axios.get(PRODUCT_GET_ALLPRODUCTS);
    }

    getProductById(productId) {
        console.log("Axios one id:"+productId);
        return axios.get(PRODUCT_GET_PRODUCT_BY_ID + '/' + productId);
    }

    deleteProduct(productId) {
        console.log("delete service");
        return axios.delete(PRODUCT_DELETE_PRODUCT + '/' + productId);
    }

    createProduct(product) {
        return axios.post(PRODUCT_ADD_PRODUCT, product);
    }

    updateProduct(product, productId) {
        console.log("came to axios update: "+productId);
        return axios.put(PRODUCT_UPDATE_PRODUCT + '/' + productId, product);
    }
}
export default new ProductService()