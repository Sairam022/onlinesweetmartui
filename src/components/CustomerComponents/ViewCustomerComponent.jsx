import React,{ Component } from "react";
import CustomerService from "../../services/CustomerServices/CustomerService";
import Header from "../pages/Header";

class viewCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
           
            customer: {}
            
        }
    }

    componentDidMount(){
        CustomerService.getCustomerById(this.state.id).then( res => {
            this.setState({customer: res.data});
        })
    }

    cancel(){
        this.props.history.push('/customers');
    }

    render() {
        const customer = this.state.customer[0] ? this.state.customer[0] : {}
        console.log("debug", customer);
        return(
            <div>
                <div className="card col-md-6 offset-md-3">
                    <Header title="VIEW CUSTOMER" />
                    <div className="card-body">
                        <div className="row">
                            <label> <b>User Id:</b> </label>
                            <div> { customer.userId} </div>
                        </div>
                        <div className="row">
                            <label> <b>User Name:</b> </label>
                            <div> { customer.username} </div>
                        </div>
                        <div className="row">
                            <label> <b>Sweet Order:</b> </label>
                            <div> { customer.sweetOrders && customer.sweetOrders[0].sweetOrderId} </div>
                        </div>
                         <div className="row">
                            <label> <b>Sweet Item:</b> </label>
                            <div> { customer.sweetItems && customer.sweetItems[0].orderItemId} </div>
                        </div>                        
                        <div className="row">
                            <label> <b>Cart:</b> </label>
                            <div> { customer.cart && customer.cart.cartId} </div>
                        </div>
                        <br />
                        <button className="btn btn-info" onClick={this.cancel.bind(this)}> BACK </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewCustomerComponent