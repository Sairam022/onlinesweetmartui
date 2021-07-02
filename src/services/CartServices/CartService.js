import axios from 'axios';

const CART_GET_ALLCARTS = "http://localhost:8081/api/osm/viewAllCarts";
const CART_GET_CART_BY_ID = "http://localhost:8081/api/osm/viewCart";
const CART_DELETE_CART = "http://localhost:8081/api/osm/deleteCart";
const CART_ADD_CART = "http://localhost:8081/api/osm/addCart";
const CART_UPDATE_CART = "http://localhost:8081/api/osm/updateCart";

class CartService {
    
    getCarts() {
        return axios.get(CART_GET_ALLCARTS);
    }

    getCartById(cartId) {
        return axios.get(CART_GET_CART_BY_ID + '/' + cartId);
    }
    deleteCart(cartId) {
        console.log("delete etered");
        return axios.delete(CART_DELETE_CART + '/' + cartId);
    }
    createCart(cart) {
        return axios.post(CART_ADD_CART, cart);
    }

    updateCart(cart, cartId) {
        console.log("came to axios update: "+cartId);
        return axios.put(CART_UPDATE_CART + '/' + cartId, cart);
    }
}
export default new CartService()