import React,{ Component } from "react";
import ProductService from "../../services/ProductServices/ProductService";
import Header from "../pages/Header";

class ListProductComponent extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            products: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    addProduct(){
        this.props.history.push('/addProduct/_add');
    }

    editProduct(id){
        this.props.history.push(`/updateProduct/${id}`);
    }

    viewProduct(id) {
        this.props.history.push(`/viewProduct/${id}`);
    }

    deleteProduct(id) {
        ProductService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.id !== id)});
            alert("Deletion done");
            this.props.history.push(`/`);
        }).catch(error => {
            alert("can't delete associated one: " +error.res);
            console.log(error.res);
        })
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
        });
    }

    render(){
        return (
            <div>
                <Header title="PRODUCTS LIST" />
                <div className="col">
                    <button className="btn btn-primary" onClick={this.addProduct}> Add Product </button>
                </div>
                <br /><br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Product Id</th>
                                <th> Product Name </th>
                                <th> Product Price </th>
                                <th> Product Description </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    product =>
                                    <tr key = {product.productId}>
                                        <td> {product.productId} </td>
                                        <td> {product.name} </td>
                                        <td> {product.price} </td>
                                        <td> {product.description} </td>
                                        <td>
                                            <button onClick={ () => this.editProduct(product.productId)} className="btn btn-info"> Update </button>
                                            <button style={{margin: "0px 10px"}} onClick={ () => this.viewProduct(product.productId)} className="btn btn-info"> VIEW </button>
                                            <button onClick={ () => this.deleteProduct(product.productId)} className="btn btn-danger">DELETE</button>
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
export default ListProductComponent