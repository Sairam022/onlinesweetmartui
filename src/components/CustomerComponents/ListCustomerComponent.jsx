import React,{ Component } from "react";
import CustomerService from "../../services/CustomerServices/CustomerService";
import Header from "../pages/Header";

class ListCustomerComponent extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            customers: []
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    addCustomer(){
        this.props.history.push('/addCustomer/_add');
    }

    editCustomer(id){
        this.props.history.push(`/updateCustomer/${id}`);
    }

    viewCustomer(id) {
        this.props.history.push(`/viewCustomer/${id}`);
    }

    deleteCustomer(id) {
        CustomerService.deleteCustomer(id).then( res => {
            this.setState({customers: this.state.customers.filter(customer => customer.id !== id)});
            alert("Deletion done");
        }).catch(error => {
            alert("can't delete associated one: " +error.res);
            console.log(error.res);
        })
    }

    componentDidMount(){
        CustomerService.getCustomers().then((res) => {
            console.log(res.data);
            this.setState({ customers: res.data});
        });
    }

    render(){
        return (
            <div>
                <Header title="CUSTOMER LIST" />
                <div className="col">
                    <button className="btn btn-primary" onClick={this.addCustomer}> Add Customer </button>
                </div>
                <br /><br />  
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> User Id</th>
                                <th> User Name </th>
                               <th> sweet Orders</th>
                                <th> sweet Items</th>
                                <th>cart</th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customer =>
                                    <tr key = {customer.userId}>
                                        <td> {customer.userId} </td>
                                        <td> {customer.username} </td>
                                         <td> {customer.sweetOrders.length ? customer.sweetOrders[0].sweetOrderId : "-"} </td>
                                        <td> {customer.sweetItems.length ? customer.sweetItems[0].orderItemId : "-"} </td> 
                                        <td> {customer.cart.cartId} </td>
                                        <td>
                                            <button onClick={ () => this.editCustomer(customer.userId)} className="btn btn-info"> Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewCustomer(customer.userId)} className="btn btn-info"> VIEW </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCustomer(customer.userId)} className="btn btn-danger">DELETE</button>
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
export default ListCustomerComponent