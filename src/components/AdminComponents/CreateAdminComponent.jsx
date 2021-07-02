import React,{ Component } from "react";
import AdminService from "../../services/AdminServices/AdminService";
import Header from "../pages/Header";

class CreateAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            productId: '',
            price: '',
            name: '',
            description: '',
            orderItemId:'',
            userId:'',
            username:'',
            Password:'',
            PasswordConfirm:'',
            type:'',
            cartId: '',
            grandTotal:'',
            productCount:'',
            total:'',
            listProduct:'',

        }
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeproductIdHandler = this.changeproductIdHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeOrderItemIdHandler = this.changeOrderItemIdHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changepasswordConfirmHandler = this.changepasswordConfirmHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeCartIdHandler = this.changeCartIdHandler.bind(this);
        this.changeGrandTotalHandler = this.changeGrandTotalHandler.bind(this);
        this.changeProductCountHandler = this.changeProductCountHandler.bind(this);
        this.changeTotalHandler = this.changeTotalHandler.bind(this);
        this.changeListProductHandler = this.changeListProductHandler.bind(this);
        this.saveOrUpdateAdmin = this.saveOrUpdateAdmin.bind(this);

        console.log("inside cons"+this.state.id);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            console.log("came or add");
            return
        } else {
            console.log("Came to else in mount")
            AdminService.getById(this.state.id).then( res => {
                let admin = res.data;
                console.log("upadte done", res.data);
                this.setState({
                   id : admin.id,
                   productId: admin[0].product.productId,
                    price: admin[0].product.price,
                    name: admin[0].product.name,
                    description: admin[0].product.description,
                    orderItemId: admin[0].item.orderItemId,
                    userId: admin[0].user.userId,
                    username: admin[0].user.username,
                    Password: admin[0].user.password,
                    PasswordConfirm: admin[0].user.passwordConfirm,
                    type: admin[0].user.type,
                    cartId: admin[0].cart.cartId,
                    grandTotal: admin[0].cart.grandTotal,
                    productCount: admin[0].cart.productCount,
                    total: admin[0].cart.total,
                    listProduct: admin[0].cart.listProduct,
                });
            });
        }
    }

    saveOrUpdateAdmin = (e) => {
        e.preventDefault();
        const admin =
        {
            "cart": {
              "grandTotal":this.state.grandTotal,
              "listProduct": this.state.listProduct,
              "productCount": this.state.productCount,
              "total": this.state.total,
            },
            "item": {
              "orderItemId": this.state.orderItemId,
              "product": {
                "available": true,
                "description":this.state.productDescription,
                "name": this.state.productName,
                "price": this.state.productPrice,
                "productId": this.state.productId
              }
            },
            "product": {
              "available": true,
              "description": this.state.productDescription,
              "name": this.state.productName,
              "price": this.state.productPrice,
              "productId":  this.state.productId
            },
            "user": {
              "loggedIn": true,
              "password": this.state.Password,
              "passwordConfirm": this.state.PasswordConfirm,
              "type": this.state.type,
              "userId":this.state.userId,
              "username": this.state.username
            }
          }
       // let admin = {name: this.state.id, user: this.state.user, item: this.state.item};
        console.log('admin =>' + JSON.stringify(admin));

        if(this.state.id === '_add') {
            console.log("came here");
            AdminService.createAdmin(admin).then(res => {
                alert("Admin Added");
                this.props.history.push('/admin');
            }).catch(error => {
                console.log("errpr: "+error.res);
            })
        }else {
            console.log("came to else uodate", this.state.id);
            AdminService.updateAdmin(admin, this.state.id).then( res => {
                alert("Admin Updated");
                this.props.history.push('/admin');
            }).catch(error => {
                console.log("err: "+error.res);
            });
        }
    }

    changeIdHandler = (e) => {
        this.setState({id: e.target.value});
    }
    changeproductIdHandler = (e) => {
        this.setState({productId: e.target.value});
    }
    changePriceHandler = (e) => {
        this.setState({price: e.target.value});
    }
    changeNameHandler = (e) => {
        this.setState({name: e.target.value});
    }
    changeDescriptionHandler = (e) => {
        this.setState({description: e.target.value});
    }
    changeOrderItemIdHandler = (e) => {
        this.setState({orderItemId: e.target.value});
    }
    changeUserIdHandler = (e) => {
        this.setState({userId: e.target.value});
    }
    changeUserNameHandler = (e) => {
        this.setState({username: e.target.value});
    }
    changePasswordHandler = (e) => {
        this.setState({Password: e.target.value});
    }
    changepasswordConfirmHandler = (e) => {
        this.setState({PasswordConfirm: e.target.value});
    }
    changeTypeHandler = (e) => {
        this.setState({type: e.target.value});
    }
    changeCartIdHandler = (e) => {
        this.setState({cartId: e.target.value});
    }
    changeGrandTotalHandler = (e) => {
        this.setState({grandTotal: e.target.value});
    }
    changeProductCountHandler= (e) => {
        this.setState({productCount: e.target.value});
    }
    changeTotalHandler= (e) => {
        this.setState({total: e.target.value});
    }
    changeListProductHandler= (e) => {
        this.setState({listProduct: e.target.value});
    }

    cancel(){
        this.props.history.push('/admin');
    }

    getTitle() {
        if(this.state.id === '_add'){
            return "ADD"
        } else {
            return "UPDATE"
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
                                    {/* <div className="form-group">
                                        <label> Admin Id: </label>
                                        <input type="number" placeholder="Admin Id" className="form-control" value={this.state.id} onChange={this.changeIdHandler} />
                                    </div> */}
                                    <br />
                                    <div className="form-group">
                                        <label> <b>ProductId:</b> </label>
                                        <input type="number" placeholder="ProductId" className="form-control" value={this.state.productId} onChange={this.changeproductIdHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Product Price:</b> </label>
                                        <input type="number" placeholder="price" className="form-control" value={this.state.price} onChange={this.changePriceHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Product Name:</b> </label>
                                        <input type="text" placeholder="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Product Description:</b> </label>
                                        <input type="text" placeholder="Product Description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>OrderItemId:</b> </label>
                                        <input type="number" placeholder="orderItemId" className="form-control" value={this.state.orderItemId} onChange={this.changeOrderItemIdHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>UserId:</b> </label>
                                        <input type="number" placeholder="userId" className="form-control" value={this.state.userId} onChange={this.changeUserIdHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Username:</b> </label>
                                        <input type="text" placeholder="user name" className="form-control" value={this.state.username} onChange={this.changeUserNameHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Password:</b> </label>
                                        <input type="text" placeholder="password" className="form-control" value={this.state.Password} onChange={this.changePasswordHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Confirm Password:</b> </label>
                                        <input type="text" placeholder="passwordConfirm" className="form-control" value={this.state.PasswordConfirm} onChange={this.changepasswordConfirmHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>User Type:</b> </label>
                                        <input type="text" placeholder="type" className="form-control" value={this.state.type} onChange={this.changeTypeHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>CartId:</b> </label>
                                        <input type="number" placeholder="cartId" className="form-control" value={this.state.cartId} onChange={this.changeCartIdHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>GrandTotal:</b> </label>
                                        <input type="number" placeholder="grandTotal" className="form-control" value={this.state.grandTotal} onChange={this.changeGrandTotalHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>ProductCount:</b> </label>
                                        <input type="number" placeholder="productCount" className="form-control" value={this.state.productCount} onChange={this.changeProductCountHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>Total:</b> </label>
                                        <input type="number" placeholder="total" className="form-control" value={this.state.total} onChange={this.changeTotalHandler} />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label> <b>ListProduct:</b> </label>
                                        <input type="text" placeholder="listProduct" className="form-control" value={this.state.listProduct} onChange={this.changeListProductHandler} />
                                    </div>
                                    <br />

                                    <button className="btn btn-success" onClick={this.saveOrUpdateAdmin}> SAVE </button>
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
export default CreateAdminComponent