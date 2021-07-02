import React,{ Component } from "react";
import CartService from "../../services/CartServices/CartService";
import Header from "../pages/Header";

class CreateCartComponent extends Component {
    constructor(props) {
        super(props)
          this.state = {
            id: this.props.match.params.id,
            listProduct: '',
            productCount: '',
            total: '',
            grandTotal: ''
        }
        this.changeListProductHandler = this.changeListProductHandler.bind(this);
        this.changeProductCountHandler = this.changeProductCountHandler.bind(this);
        this.changeTotalHandler = this.changeTotalHandler.bind(this);
        this.changeGrandTotalHandler = this.changeGrandTotalHandler.bind(this);
        this.saveOrUpdateCart = this.saveOrUpdateCart.bind(this);

        console.log("inside cons"+this.state.id);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        } else {
            CartService.getCartById(this.state.id).then( res => {
                let cart = res.data;
                this.setState({
                    id: cart.cartId,
                    listProduct: cart.listProduct,
                    productCount: cart.productCount,
                    total: cart.total,
                    grandTotal: cart.grandTotal
                });
            });
        }
    }

    saveOrUpdateCart = (e) => {
        e.preventDefault();
        let cart = {listProduct: this.state.listProduct, productCount: this.state.productCount, total: this.state.total, grandTotal: this.state.grandTotal};
        console.log('cart =>' + JSON.stringify(cart));

        if(this.state.id === '_add') {
            CartService.createCart(cart).then(res => {
                alert("Cart Added");
                this.props.history.push('/carts');
            }).catch(error => {
                console.log("error: "+error.res);
            })
        }else {
            CartService.updateCart(cart, this.state.id).then( res => {
                alert("cart Updated");
                this.props.history.push('/carts');
            }).catch(error => {
                console.log("error: "+error.res);
            });
        }
    }

    changeListProductHandler = (e) => {
        this.setState({listProduct: e.target.value});
    }

    changeProductCountHandler = (e) => {
        this.setState({productCount: e.target.value});
    }

    changeTotalHandler = (e) => {
        this.setState({total: e.target.value});
    }

    changeGrandTotalHandler = (e) => { 
        this.setState({grandTotal: e.target.value});
    }

    cancel(){
        this.props.history.push('/carts');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return "ADD CART"
        } else {
            return "UPDATE CART"
        }
    }

    render() {
        return (
           <div>
               <br /><br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h3 className="text-center"> <Header title={this.getTitle()} /> </h3>
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder="Product List" className="form-control" value={this.state.listProduct} onChange={this.changeListProductHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Count: </label>
                                        <input type="number" placeholder="Product Count" className="form-control" value={this.state.productCount} onChange={this.changeProductCountHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Total: </label>
                                        <input type="text" placeholder="Total" className="form-control" value={this.state.total} onChange={this.changeTotalHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Grand Total: </label>
                                        <input type="text" placeholder="Grand Total" className="form-control" value={this.state.grandTotal} onChange={this.changeGrandTotalHandler} />
                                    </div>
                                    <br />

                                    <button className="btn btn-success" onClick={this.saveOrUpdateCart}> SAVE </button>
                                    <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={this.cancel.bind(this)}> CANCEL </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateCartComponent