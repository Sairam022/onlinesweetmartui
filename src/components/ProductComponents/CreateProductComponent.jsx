import React,{ Component } from "react";
import ProductService from "../../services/ProductServices/ProductService";
import Header from "../pages/Header";

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            price: '',
            description: '',
            availabile: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeAvailableHandler = this.changeAvailableHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);

        console.log("inside cons"+this.state.id);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        } else {
            ProductService.getProductById(this.state.id).then( res => {
                let product = res.data;
                this.setState({
                    id: product.productId,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    availabile: product.availabile
                });
            });
        }
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {name: this.state.name, price: this.state.price, description: this.state.description};
        console.log('product =>' + JSON.stringify(product));

        if(this.state.id === '_add') {
            ProductService.createProduct(product).then(res => {
                alert("Product Added");
                this.props.history.push('/products');
            }).catch(error => {
                console.log("errpr: "+error.res);
            })
        }else {
            ProductService.updateProduct(product, this.state.id).then( res => {
                alert("Product Updated");
                this.props.history.push('/products');
            }).catch(error => {
                console.log("err: "+error.res);
            });
        }
    }

    changeNameHandler = (e) => {
        this.setState({name: e.target.value});
    }

    changePriceHandler = (e) => {
        this.setState({price: e.target.value});
    }

    changeDescriptionHandler = (e) => {
        this.setState({description: e.target.value});
    }

    changeAvailableHandler = (e) => {
        this.setState({availabile: e.target.value});
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return "ADD PRODUCT"
        } else {
            return "UPDATE PRODUCT"
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
                                        <label> Product Name: </label>
                                        <input type="text" placeholder="Product Name" className="form-control" value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Price: </label>
                                        <input type="number" placeholder="Product Price" className="form-control" value={this.state.price} onChange={this.changePriceHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Description: </label>
                                        <input type="text" placeholder="Product Description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </div>
                                    <br />

                                    <button className="btn btn-success" onClick={this.saveOrUpdateProduct}> SAVE </button>
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
export default CreateProductComponent