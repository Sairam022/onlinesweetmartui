import React,{ Component } from "react";
import OrderBillService from "../../services/OrderbillServices/OrderBillService";
import Header from "../pages/Header";
class CreateOrderBillComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            date: '',
            total: '',
            sweetOrderId: '',
            orderItemId: '',
            productId: '',
            productName: '',
            productPrice: '',
            productDescription: '',
            productAvailable: '',        
            createdDate: ''
        }

        this.changeOrderBillIdHandler = this.changeOrderBillIdHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeGrandTotalHandler = this.changeGrandTotalHandler.bind(this);
        this.changesweetOrderIdHandler = this.changesweetOrderIdHandler.bind(this);
        this.changeorderItemIdHandler = this.changeorderItemIdHandler.bind(this);
        this.changeproductIdHandler = this.changeproductIdHandler.bind(this);
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changepriceHandler = this.changepriceHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changecreatedDateHandler = this.changecreatedDateHandler.bind(this);
        this.saveOrUpdateOrderBill = this.saveOrUpdateOrderBill.bind(this);

        console.log("inside cons"+this.state.id);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            console.log("came or add");
            return
        }
        else {
            console.log("Came to else in mount")
            OrderBillService.getOrderBillById(this.state.id).then( res => {
                console.log("upadte done", res.data);
                const orderbill = res.data;
                const sweetOrder = orderbill.listSweetOrder;
                this.setState({
                    id: orderbill.id,
                    date: orderbill.createdDate,
                    total: orderbill.total,
                    sweetOrderId: sweetOrder.sweetOrderId,
                    orderItemId: sweetOrder.listItems.length ? sweetOrder.listItems[0].orderItemId : "-",
                    productId: sweetOrder.listItems.length ? sweetOrder.listItems[0].product.productId : "-",
                    productName: sweetOrder.listItems.length ? sweetOrder.listItems[0].product.name : "-",
                    productPrice: sweetOrder.listItems.length ? sweetOrder.listItems[0].product.price : "-",
                    productDescription: sweetOrder.listItems.length ? sweetOrder.listItems[0].product.description : "-",
                    createdDate: sweetOrder.createdDate
                  
                });
            });
        }
    }

    saveOrUpdateOrderBill = (e) => {
        e.preventDefault();
        const orderbill =
        {
            "createdDate": this.state.date,
            "total": this.state.total,
            "listSweetOrder": {
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
        }
        // let orderbill = {orderbillId: this.state.orderbillId, date: this.state.date, total: this.state.total,sweetOrderId: this.state.sweetOrderId, listItems: this.state.listItems, orderItemId: this.state.orderItemId, productId: this.state.productId, name: this.state.name, price: this.state.price, description: this.state.description, createdDate: this.state.createdDate };
        console.log('orderbill =>' + JSON.stringify(orderbill));

        if(this.state.id === '_add') {
            console.log("came here");
            OrderBillService.createOrderBill(orderbill).then(res => {
                alert("OrderBill Added");
                this.props.history.push('/orderbill');
            }).catch(error => {
                console.log("errpr: "+error.res);
            })
         }
         else {
             console.log("came to else uodate", this.state.id);
            OrderBillService.updateOrderBill(orderbill, this.state.id).then( res => {
                alert("OrderBill Updated");
                this.props.history.push('/orderbill');
            }).catch(error => {
                console.log("err: "+error.res);
            });
        }
    }

    changeOrderBillIdHandler = (e) => {
        this.setState({id: e.target.value});
    }

    changeorderItemIdHandler = (e) => {
        this.setState({orderItemId: e.target.value});
    }

    changeDateHandler = (e) => {
        this.setState({date: e.target.value});
    }

    changeGrandTotalHandler = (e) => {
        this.setState({total: e.target.value});
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
        this.props.history.push('/orderbill');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return "ADD ORDERBILL"
        } else {
            return "UPDATE ORDERBILL"
        }
    }

    render() {
        return (
           <div>
               <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h3 className="text-center"> <Header title={this.getTitle()} /> </h3>
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Date: </label>
                                        <input type="date" placeholder="Date" className="form-control" value={this.state.date} onChange={this.changeDateHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> GrandTotal: </label>
                                        <input type="number" placeholder="GrandTotal" className="form-control" value={this.state.total} onChange={this.changeGrandTotalHandler} />
                                    </div>
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
                                        <input type="text" placeholder="Desceription" className="form-control" value={this.state.productDescription} onChange={this.changedescriptionHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Created Date: </label>
                                        <input type="date" placeholder="sweetOrderId" className="form-control" value={this.state.createdDate} onChange={this.changecreatedDateHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateOrderBill}> SAVE </button>
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
export default CreateOrderBillComponent

