import React,{ Component } from "react";
import AdminService from "../../services/AdminServices/AdminService";
import Header from "../pages/Header";

class viewAdminComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            admin: {user: {}}
        
        }
    }
    componentDidMount(){
        AdminService.getById(this.state.id).then( res => {
            console.log(res);
            this.setState({admin: res.data});
        })
    }

    cancel(){
        this.props.history.push('/admin');
    }
    render() {
        const admin=this.state.admin[0]? this.state.admin[0]:{}
        console.log("debug",admin);
        return(
            <div>
                <div className="card col-md-6 offset-md-3">
                <Header title="VIEW" />
                    <div className="card-body">
                        <div className="row">
                            <label> <b>Admin Id:</b> </label>
                            <div> {admin.id} </div>
                        </div>
                        <div className="row">
                            <label> <b>User name:</b> </label>
                            <div> {admin.user&&admin.user.username} </div>
                        </div>   
                       <div className="row">
                            <label> <b>Sweet ItemId:</b> </label>
                            <div> {admin.item && admin.item.orderItemId} </div>
                        </div>
                        <div className="row">
                            <label> <b>Product Name:</b> </label> 
                            <div> {admin.product&&admin.product.name} </div>
                        </div>
                      <div className="row">
                            <label> <b>Cart Id:</b> </label>
                            <div> {admin.cart&&admin.cart.cartId} </div>
                        </div> 
                        <br />
                        <button className="btn btn-info" onClick={this.cancel.bind(this)}> BACK </button>
 
                    </div> 
                </div>
            </div>
        )
    }
}

export default viewAdminComponent
