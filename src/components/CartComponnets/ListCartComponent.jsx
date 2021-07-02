import React,{ Component } from "react";
import CartService from "../../services/CartServices/CartService";
import Header from "../pages/Header";

class ListCartComponent extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            carts: [],
        }
        this.addCart = this.addCart.bind(this);
        this.editCart = this.editCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }
    addCart(){
        this.props.history.push('/addCart/_add');
    }

    editCart(id){
        this.props.history.push(`/updateCart/${id}`);
    }

    viewCart(id) {
        this.props.history.push(`/viewCart/${id}`);
    }

    deleteCart(id) {
        console.log("delete initiliazed");
        CartService.deleteCart(id).then( res => {
            console.log("delete entered");
            this.setState({carts: this.state.carts.filter(cart => cart.id !== id)});
        }).catch(error => {
            console.log(error.res);})

    }

    componentDidMount(){
        CartService.getCarts().then((res) => {
            this.setState({ carts: res.data});
        });
    }

    render(){
        return (
            <div>
                <Header title = "CART LIST" />
                <div className="col">
                    <button className="btn btn-primary" onClick={this.addCart}> Add Cart </button>
                </div>
                    <br /><br />
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Cart Id</th>
                                    <th> Product List</th>
                                    <th> Product Count</th>
                                    <th> Total</th>
                                    <th> Grand Total</th>
                                    <th> Actions </th>
                                   
                                 </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.carts.map(
                                        cart =>
                                        <tr key = {cart.cartId}>
                                            <td> {cart.cartId} </td>
                                            <td> {cart.listProduct} </td>
                                            <td> {cart.productCount} </td>
                                            <td> {cart.total} </td>
                                            <td> {cart.grandTotal}</td>
                                            
                                            <td>
                                            <button onClick={ () => this.editCart(cart.cartId)} className="btn btn-info"> Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewCart(cart.cartId)} className="btn btn-info"> VIEW </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCart(cart.cartId)} className="btn btn-danger">DELETE</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        
        )
    }
}
export default ListCartComponent





