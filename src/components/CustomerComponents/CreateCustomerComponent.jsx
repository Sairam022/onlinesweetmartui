import React,{ Component } from "react";
import CustomerService from "../../services/CustomerServices/CustomerService";
import Header from "../pages/Header";

class CreateCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
           // sweetOrders: '',
            sweetOrderId: '',
            orderItemId: '',
            productId: '',
            productName: '',
            productPrice: '',
            productDescription: '',
            productAvailable: '',        
            createdDate: '',
           // sweetItems: '',
            // orderItemId:'',

           // cart: '',
            cartId: '',
            grandTotal:'',
            listProduct:'',
            productCount:'',
            total:''

        }
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
       
        this.changesweetOrderIdHandler = this.changesweetOrderIdHandler.bind(this);
        this.changeorderItemIdHandler = this.changeorderItemIdHandler.bind(this);
        this.changeproductIdHandler = this.changeproductIdHandler.bind(this);
        this.changenameHandler = this.changenameHandler.bind(this);
        this.changepriceHandler = this.changepriceHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changecreatedDateHandler = this.changecreatedDateHandler.bind(this);

        this.changecartIdHandler = this.changecartIdHandler.bind(this);
        this.changelistProductHandler = this.changelistProductHandler.bind(this);
        this.changeproductCountHandler = this.changeproductCountHandler.bind(this);
        this.changetotalHandler = this.changetotalHandler.bind(this);
        this.changegrandTotalHandler = this.changegrandTotalHandler.bind(this);
        //this.changeSweetItemsHandler = this.changeSweetItemsHandler.bind(this);
        //this.changeCartHandler = this.changeCartHandler.bind(this);
        this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);

        console.log("inside cons"+this.state.id);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            console.log("came or add");
            return
        } else {
            console.log("Came to else in mount")
            CustomerService.getCustomerById(this.state.id).then( res => {
                console.log("upadte done", res.data[0]);
                const customer = res.data;
                // const sweetOrder = customer[0].sweetOrders[0].
                console.log("csus", customer);

                this.setState({
                    id: customer.userId,
                    username: customer[0].username,
                  sweetOrderId: customer[0].sweetOrders[0].sweetOrderId,
                  createdDate: customer[0].sweetOrders[0].createdDate,

                    orderItemId: customer[0].sweetItems[0].orderItemId,
                    productId: customer[0].sweetItems[0].product.productId,
                    productName: customer[0].sweetItems[0].product.name,
                    productPrice: customer[0].sweetItems[0].product.price,
                    productDescription: customer[0].sweetItems[0].product.description,
                    // createdDate: sweetItems.createdDate,

                    cartId: customer[0].cart.cartId,
                    grandTotal: customer[0].cart.grandTotal,
                    listProduct: customer[0].cart.listProduct,
                    productCount: customer[0].cart.productCount,
                    total: customer[0].cart.total

                   
                });
            });
        }
    }

    saveOrUpdateCustomer = (e) => {
        e.preventDefault();
      // let customer = {username: this.state.username,userId: this.state.userId ,sweetOrders: this.state.sweetOrders.sweetOrderId, sweetItems: this.state.sweetItems.OrderItemId, cart: this.state.cart.cartId};
       //const customer = this.state.customer[0] ? this.state.customer[0] : {}
       const customer =
       {
       "createdDate": this.state.date,
        "total": this.state.total,
        "cart": {
            "listProduct": this.state.cartId,
            "productCount": this.state.productCount,
            "total": this.state.total,
            "grandTotal": this.state.grandTotal,
            },
            "sweetItems":[
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
        "sweetOrders": [
        {
          "sweetOrderId": this.state.sweetOrderId,
          "listItems": [
            {
            //  "orderItemId": this.state.orderItemId,
            //   "product": {
            //    "productId": this.state.productId,
            //     "name": this.state.productName,
            //     "price": this.state.productPrice,
            //     "description": this.state.productDescription,
            //     "available": true
            }
          ],
          "createdDate": this.state.createdDate
        }
    ],
    "username":this.state.username
       }
     
       console.log('customer =>' + JSON.stringify(customer));

        if(this.state.id === '_add') {
            console.log("came here");
            CustomerService.createCustomer(customer).then(res => {
                alert("customer  Added");
                this.props.history.push('/customers');
            }).catch(error => {
                console.log("errpr: "+error.res);
            })
        }else {
            console.log("came to else uodate", this.state.id);
            CustomerService.updateCustomer(customer, this.state.id).then( res => {
                alert("Customer Updated");
                this.props.history.push('/customer');
            }).catch(error => {
                console.log("err: "+error.res);
            });
        }
    }

    changeUserNameHandler = (e) => {
        this.setState({username: e.target.value});
    }
    changeUserIdHandler = (e) => {
        this.setState({userId: e.target.value});
    }

   // changeSweetOrdersHandler = (e) => {
   //     this.setState({sweetOrders: e.target.value});
    //}
    changesweetOrderIdHandler = (e) => {
        this.setState({sweetOrderId: e.target.value});
    }
    changeorderItemIdHandler = (e) => {
        this.setState({orderItemId: e.target.value});
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


   // changeSweetItemsHandler = (e) => {
     //   this.setState({sweetItems: e.target.value});
    //}

   // changeCartHandler = (e) => {
     //   this.setState({cart: e.target.value});
    //}
    changecartIdHandler = (e) => {
           this.setState({cartId: e.target.value});
       }
    changelistProductHandler = (e) => {
        this.setState({listProduct: e.target.value});
    }

    changeproductCountHandler = (e) => {
        this.setState({productCount: e.target.value});
    }

    changetotalHandler = (e) => {
        this.setState({total: e.target.value});
    }

    changegrandTotalHandler = (e) => { 
        this.setState({grandTotal: e.target.value});
    }

    cancel(){
        this.props.history.push('/customers');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return "ADD CUSTOMER"
        } else {
            return "UPDATE CUSTOMER"
        }
    }

    render() {
        //const customer = this.state.customer[0] ? this.state.customer[0] : {}
        //console.log("debug",customer);
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
                                    <div className="form-group">
                                        <label> User Name: </label>
                                        <input type="text" placeholder="User Name" className="form-control" value={this.state.username} onChange={this.changeUserNameHandler} />
                                    </div>
                                    <br />
                                    {/* <div className="form-group">
                                       <label> User Id: </label>
                                     <input type="number" placeholder="User id" className="form-control" value={this.state.userId} onChange={this.changeUserIdHandler} />
                                    </div>  */}
                                    <br />
                                    <label> sweet order </label>
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
                                    <br />
                                    <label> sweetItems: </label>

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
                                    <br /> 


                                    <label> cart: </label>
                                    <div className="form-group">
                                        <label> Cart id: </label>
                                        <input type="number" placeholder="Cart id" className="form-control" value={this.state.cartId} onChange={this.changecartIdHandler} />
                                    </div>
                                   
                                    <div className="form-group">
                                        <label> Product List: </label>
                                        <input type="text" placeholder="Product List" className="form-control" value={this.state.listProduct} onChange={this.changelistProductHandler} />
                                    </div>
                                   
                                    <div className="form-group">
                                        <label> Product Count: </label>
                                        <input type="number" placeholder="Product Count" className="form-control" value={this.state.productCount} onChange={this.changeproductCountHandler} />
                                    </div>
                                   
                                    <div className="form-group">
                                        <label> Total: </label>
                                        <input type="text" placeholder="Total" className="form-control" value={this.state.total} onChange={this.changetotalHandler} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label> Grand Total: </label>
                                        <input type="text" placeholder="Grand Total" className="form-control" value={this.state.grandTotal} onChange={this.changegrandTotalHandler} />
                                    </div>
                                    <br />

                                    <button className="btn btn-success" onClick={this.saveOrUpdateCustomer}> SAVE </button>
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
export default CreateCustomerComponent