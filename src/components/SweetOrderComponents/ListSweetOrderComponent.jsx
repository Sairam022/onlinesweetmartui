import React, { Component } from "react";
import SweetOrderService from "../../services/SweetOrderServices/SweetOrderService";
import Header from "../pages/Header";
class ListSweetOrderComponent extends Component
 {
    constructor(props) {
        super(props)
        this.state = {
                sweetOrders: []
        }
        this.addSweetOrder = this.addSweetOrder.bind(this);
        this.editSweetOrder = this.editSweetOrder.bind(this);
        this.deleteSweetOrder = this.deleteSweetOrder.bind(this);
    }
    
     addSweetOrder(){
        this.props.history.push('/addSweetOrder/_add');
    }

    editSweetOrder(sweetOrderId){
        this.props.history.push(`/updateSweetOrder/${sweetOrderId}`);
    }

    deleteSweetOrder(sweetOrderId) {
        console.log("delete initiliazed");
        SweetOrderService.deleteSweetOrder(sweetOrderId).then( res => {
            console.log("delete entered");
            this.setState({sweetOrders: this.state.sweetOrders.filter(sweetOrders => sweetOrders.sweetOrderId !== sweetOrderId)});
            alert("Deletion done");
        }).catch(error => {
            alert("can't delete associated one: " +error.res);
            console.log(error.res);
        })
    }

    componentDidMount(){
        SweetOrderService.getSweetOrders().then((res) => {
            console.log(res.data);
            this.setState({ sweetOrders: res.data});
        });
    }

    render() {
        return (
            <div>
                <Header title="SWEETORDERS LIST" />
                 <div className="col">
                    <button className="btn btn-primary" onClick={this.addSweetOrder}> Add SweetOrder </button>
                </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> SweetOrder Id</th>
                                    <th> OrderItem Id</th>
                                     <th> Product Id</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product Description</th>
                                    <th>Created Date</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sweetOrders.map(
                                        sweetOrder =>
                                        <tr key = {sweetOrder.sweetOrderId}>
                                            <td> {sweetOrder.sweetOrderId} </td>
                                            <td> {sweetOrder.listItems.length ? sweetOrder.listItems[0].orderItemId : "-"} </td> 
                                            <td> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.productId : "-"} </td> 
                                            <td> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.name : "-"} </td>
                                            <td> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.price : "-"} </td> 
                                            <td> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.description : "-"} </td>
                                            <td> {sweetOrder.createdDate} </td> 
                                            <td>
                                                 <button onClick={ () => this.editSweetOrder(sweetOrder.sweetOrderId)} className="btn btn-info"> Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSweetOrder(sweetOrder.sweetOrderId)} className="btn btn-danger">DELETE</button>
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

export default ListSweetOrderComponent