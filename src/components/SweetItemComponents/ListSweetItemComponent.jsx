import React, { Component } from "react";
import SweetItemService from "../../services/SweetItemServices/SweetItemService";
import Header from "../pages/Header";

class ListSweetItemComponent extends Component
 {
    constructor(props) {
        super(props)
        this.state = {
                sweetItems: []
        }
        this.addSweetItem = this.addSweetItem.bind(this);
        this.editSweetItem = this.editSweetItem.bind(this);
        this.deleteSweetItem = this.deleteSweetItem.bind(this);
    }
    
     addSweetItem(){
        this.props.history.push('/addSweetItem/_add');
    }

    editSweetItem(orderItemId){
        this.props.history.push(`/updateSweetItem/${orderItemId}`);
    }

    viewSweetItem(orderItemId){
        this.props.history.push(`/viewSweetItem/${orderItemId}`);
    }

    deleteSweetItem(orderItemId) {
        SweetItemService.deleteSweetItem(orderItemId).then( res => {
            this.setState({sweetItems: this.state.sweetItems.filter(sweetItem => sweetItem.orderItemId !== orderItemId)});
            alert("Deletion done");
            this.props.history.push(`/`);
        }).catch(error => {
            alert("can't delete associated one: " +error.res);
            console.log(error);
        })
    }

    componentDidMount(){
        SweetItemService.getSweetItems().then((res) => {
            console.log(res.data)
            this.setState({ sweetItems: res.data});
            // const sweetItem = res.data;
        });
    }

    render() {
        return (
            <div>
                 <Header title="SWEETITEMS LIST" />
                 <div className="col">
                    <button className="btn btn-primary" onClick={this.addSweetItem}> Add SweetItem </button>
                </div>
                 <br/><br/>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> OrderItem Id</th>
                                    <th> Product Id</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product Description</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sweetItems.map(
                                        sweetItem =>
                                        <tr key = {sweetItem.orderItemId}>
                                            <td> {sweetItem.orderItemId} </td>
                                            <td> {sweetItem.product.productId} </td> 
                                            <td> {sweetItem.product.name} </td>
                                            <td> {sweetItem.product.price} </td> 
                                            <td> {sweetItem.product.description} </td>
                                            <td>
                                                 <button onClick={ () => this.editSweetItem(sweetItem.orderItemId)} className="btn btn-info"> Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSweetItem(sweetItem.orderItemId)} className="btn btn-danger">DELETE</button>
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

export default ListSweetItemComponent