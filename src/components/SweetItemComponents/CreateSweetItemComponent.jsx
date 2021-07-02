import React,{ Component } from "react";
import SweetItemService from "../../services/SweetItemServices/SweetItemService";
import Header from "../pages/Header";

class CreateSweetItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderItemId: this.props.match.params.id,
            productId: '',
            productName:'',
            productPrice:'',
            productDescription:''
        }
        
        // this.changeOrderItemIdHandler = this.changeOrderItemIdHandler.bind(this);
        this.changeProductIdHandler = this.changeProductIdHandler.bind(this);
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeProductPriceHandler = this.changeProductPriceHandler.bind(this);
        this.changeProductDescriptionHandler = this.changeProductDescriptionHandler.bind(this);
        this.saveOrUpdateSweetItem = this.saveOrUpdateSweetItem.bind(this);

        console.log("inside cons"+this.state.orderItemId);
    }

    componentDidMount(){
        if(this.state.orderItemId === '_add'){
            return
        } else {
            SweetItemService.getSweetItemByOrderItemId(this.state.orderItemId).then( res => {
                let sweetItem = res.data;
                this.setState({
                    orderItemId: sweetItem.orderItemId,
                    productId: sweetItem.productId,
                    productName: sweetItem.productName,
                    productPrice: sweetItem.productPrice,
                    productDescription: sweetItem.productDescription

                });
            });
        }
    }

    saveOrUpdateSweetItem = (e) => {
        e.preventDefault();
        const sweetItem = {
            "product": {
            //   "productId": this.state.productId,
              "name": this.state.productName,
              "price": this.state.productPrice,
              "description": this.state.productDescription,
              "available": true
            }
          }
        // let sweetItem = {productId: this.state.productId,productName: this.state.productName,productPrice: this.state.productPrice,productDescription: this.state.productDescription};
        console.log('sweetItem =>' + JSON.stringify(sweetItem));

        if(this.state.orderItemId === '_add') {
            SweetItemService.createSweetItem(sweetItem).then(res => {
                alert("SweetItem Added");
                this.props.history.push('/sweetItem');
            }).catch(error => {
                console.log("error: "+error.res);
            })
        }else {
            SweetItemService.updateSweetItem(sweetItem, this.state.orderItemId).then( res => {
                alert("SweetItem Updated");
                this.props.history.push('/sweetItems');
            }).catch(error => {
                console.log("error: "+error.res);
            });
        }
    }

    // changeOrderItemIdHandler = (e) => {
    //     this.setState({orderItemId: e.target.value});
    // }

    changeProductIdHandler = (e) => {
        this.setState({productId: e.target.value});
    }
     
    changeProductNameHandler = (e) => {
        this.setState({productName: e.target.value});
    }

    changeProductPriceHandler = (e) => {
        this.setState({productPrice: e.target.value});
    }

    changeProductDescriptionHandler = (e) => {
        this.setState({productDescription: e.target.value});
    }

    cancel(){
        this.props.history.push('/sweetItem');
    }

    getTitle() {
        if(this.state.orderItemId === '_add'){
            return "Add SweetItem"
        } else {
            return "Update SweetItem"
        }
    }

    render() {
        return (
           <div>
               <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h3 className="text-center"> <Header title={this.getTitle()} /> </h3>
                            }
                            <div className="card-body">
                                <form>
                                    {/* <div className="form-group">
                                        <label> OrderItem Id: </label>
                                        <input type="number" placeholder="OrderItem Id" className="form-control" value={this.state.orderItemId} onChange={this.changeOrderItemIdHandler} />
                                    </div>
                        <br /> */}
                                    <div className="form-group">
                                        <label> Product Id: </label>
                                        <input type="number" placeholder="Product Id" className="form-control" value={this.state.productId} onChange={this.changeProductIdHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Name: </label>
                                        <input type="text" placeholder="Product Name" className="form-control" value={this.state.productName} onChange={this.changeProductNameHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Price: </label>
                                        <input type="number" placeholder="Product Price" className="form-control" value={this.state.productPrice} onChange={this.changeProductPriceHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> Product Description: </label>
                                        <input type="text" placeholder="Product Description" className="form-control" value={this.state.productDescription} onChange={this.changeProductDescriptionHandler} />
                                    </div>
                                    <br />

                                    <button className="btn btn-success" onClick={this.saveOrUpdateSweetItem}> SAVE </button>
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
export default CreateSweetItemComponent