import React,{ Component } from "react";
import ProductService from "../../services/ProductServices/ProductService";
import Header from "../pages/Header";

class viewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {}
        }
    }

    componentDidMount(){
        ProductService.getProductById(this.state.id).then( res => {
            this.setState({product: res.data});
        })
    }

    cancel(){
        this.props.history.push('/products');
    }

    render() {
        return(
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <Header title="VIEW PRODUCT" />
                    <div className="card-body">
                        <div className="row">
                            <label> <b>Product Id:</b> </label>
                            <div> {this.state.product.productId} </div>
                        </div>
                        <div className="row">
                            <label> <b>Product Name:</b> </label>
                            <div> {this.state.product.name} </div>
                        </div>
                        <div className="row">
                            <label> <b>Product Price:</b> </label>
                            <div> {this.state.product.price} </div>
                        </div>
                        <div className="row">
                            <label> <b>Product Description:</b> </label>
                            <div> {this.state.product.description} </div>
                        </div>
                        <br />
                        <button className="btn btn-info" onClick={this.cancel.bind(this)}> BACK </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewProductComponent