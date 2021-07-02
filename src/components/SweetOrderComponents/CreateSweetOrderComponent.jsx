import React,{ Component } from "react";
import SweetOrderService from '../../services/SweetOrderServices/SweetOrderService'
import Header from "../pages/Header";
class CreateSweetOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            sweetOrderId: '',
            orderItemId: '',
            productId: '',
            productName: '',
            productPrice: '',
            productDescription: '',
            productAvailable: '',        
            createdDate: ''
        }

        this.changesweetOrderIdHandler = this.changesweetOrderIdHandler.bind(this);
        this.changeorderItemIdHandler = this.changeorderItemIdHandler.bind(this);
        this.changeproductIdHandler = this.changeproductIdHandler.bind(this);
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changepriceHandler = this.changepriceHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changecreatedDateHandler = this.changecreatedDateHandler.bind(this);
        this.saveOrUpdateSweetOrder = this.saveOrUpdateSweetOrder.bind(this);

        console.log("inside cons"+this.state.id);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            console.log("came or add");
            return
        }
        else {
            console.log("Came to else in mount")
            SweetOrderService.getSweetOrderBySweetOrderId(this.state.sweetOrderId).then( res => {
                console.log("update done", res.data);
                const sweetOrder = res.data;
                const sweetItem = sweetOrder.listItems;
                this.setState({
                    sweetOrderId: sweetOrder.sweetOrderId,
                    orderItemId: sweetItem.listItems.length ? sweetItem.listItems[0].orderItemId : "-",
                    productId: sweetItem.listItems.length ? sweetItem.listItems[0].product.productId : "-",
                    productName: sweetItem.listItems.length ? sweetItem.listItems[0].product.name : "-",
                    productPrice: sweetItem.listItems.length ? sweetItem.listItems[0].product.price : "-",
                    productDescription: sweetItem.listItems.length ? sweetItem.listItems[0].product.description : "-",
                    createdDate: sweetOrder.createdDate
                  
                });
            });
        }
    }

    saveOrUpdateSweetOrder = (e) => {
        e.preventDefault();
        const sweetOrder =
        {
            "sweetOrderId": this.state.sweetOrderId,
            "listItems": [
            {
                "orderItemId": this.state.orderItemId,
                "product": {
                "productId": this.state.productId,
                "name": this.state.productName,
                "price": this.state.productPrice,
                "description": this.state.productDescription,
                "available": true
                }
            }
            ],
            "createdDate": this.state.createdDate
        }

        // let orderbill = {orderbillId: this.state.orderbillId, date: this.state.date, total: this.state.total,sweetOrderId: this.state.sweetOrderId, listItems: this.state.listItems, orderItemId: this.state.orderItemId, productId: this.state.productId, name: this.state.name, price: this.state.price, description: this.state.description, createdDate: this.state.createdDate };
        console.log('sweetOrder =>' + JSON.stringify(sweetOrder));

        if(this.state.id === '_add') {
            console.log("came here");
            SweetOrderService.createSweetOrder(sweetOrder).then(res => {
                alert("SweetOrder Added");
                this.props.history.push('/sweetOrder');
            }).catch(error => {
                console.log("error: "+error.res);
            })
         }
         else {
             console.log("came to else update", this.state.sweetOrderId);
             SweetOrderService.updateSweetOrder(sweetOrder, this.state.sweetOrderId).then( res => {
                alert("SweetOrder Updated");
                this.props.history.push('/sweetOrder');
            }).catch(error => {
                console.log("err: "+error.res);
            });
        }
    }

    changeSweetOrderIdHandler = (e) => {
        this.setState({sweetOrderId: e.target.value});
    }

    changeorderItemIdHandler = (e) => {
        this.setState({orderItemId: e.target.value});
    }

    changesweetOrderIdHandler = (e) => {
        this.setState({sweetOrderId: e.target.value});
    }

    changeproductIdHandler = (e) => {
        this.setState({productId: e.target.value});
    }
    changenameHandler = (e) => {
        this.setState({productName: e.target.value});
    }

    changepriceHandler = (e) => {
        this.setState({productPrice: e.target.value});
    }
    changedescriptionHandler = (e) => {
        this.setState({productDescription: e.target.value});
    }
    changecreatedDateHandler = (e) => {
        this.setState({createdDate: e.target.value});
    }

    cancel(){
        this.props.history.push('/sweetOrder');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return "ADD SWEETORDER"
        } else {
            return "UPDATE SWEETORDER"
        }
    }

    render() {
        return (
           <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                               <h3 className="text-center"> <Header title={this.getTitle()} /> </h3>
                            }
                            <div className="card-body">
                                <form>
                                    <br />
                                    <div className="form-group">
                                        <label> sweetOrderId: </label>
                                        <input type="number" placeholder="sweetOrderId" className="form-control" value={this.state.sweetOrderId} onChange={this.changesweetOrderIdHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> OrderItem ID: </label>
                                        <input type="number" placeholder="orderItemId" className="form-control" value={this.state.orderItemId} onChange={this.changeorderItemIdHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> ProductId: </label>
                                        <input type="number" placeholder="productId" className="form-control" value={this.state.productId} onChange={this.changeproductIdHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Product Name: </label>
                                        <input type="text" placeholder="product name" className="form-control" value={this.state.productName} onChange={this.changenameHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Product Price: </label>
                                        <input type="number" placeholder="Product Price" className="form-control" value={this.state.productPrice} onChange={this.changepriceHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Product Description: </label>
                                        <input type="text" placeholder="Description" className="form-control" value={this.state.productDescription} onChange={this.changedescriptionHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Created Date: </label>
                                        <input type="date" placeholder="createdDate" className="form-control" value={this.state.createdDate} onChange={this.changecreatedDateHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateSweetOrder}> SAVE </button>
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
export default CreateSweetOrderComponent

