import React,{ Component } from "react";
import CartService from "../../services/CartServices/CartService";
import Header from "../pages/Header";

class viewCartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            cart: {}
        }
    }

    componentDidMount(){
        CartService.getCartById(this.state.id).then( res => {
            console.log("view");
            this.setState({cart: res.data});
        })
    }

    cancel(){
        this.props.history.push('/carts');
    }

    render() {
        return(
            <div>
                <br /><br />
                <div className="card col-md-6 offset-md-3">
                    <Header title= "VIEW CART" />
                    <div className="card-body">
                        <div className="row">
                            <label> <b> Cart Id: </b> </label>
                            <div> {this.state.cart.cartId} </div>
                        </div>
                        <div className="row">
                            <label> <b> Product List: </b> </label>
                            <div> {this.state.cart.listProduct} </div>
                        </div>
                        <div className="row">
                            <label> <b>Product count:</b> </label>
                            <div> {this.state.cart.productCount} </div>
                        </div>
                        <div className="row">
                            <label> <b>Total:</b> </label>
                            <div> {this.state.cart.total} </div>
                        </div>
                        <div className="row">
                            <label> <b>Grand Total:</b> </label>
                            <div> {this.state.cart.grandTotal} </div>
                        </div>
                        <br />

                        <button className="btn btn-info" onClick={this.cancel.bind(this)}> BACK </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewCartComponent