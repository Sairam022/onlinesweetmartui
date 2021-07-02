import React, { Component } from 'react'
import OrderBillService from '../../services/OrderbillServices/OrderBillService';
import Header from '../pages/Header';

class ListOrderBillComponent extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            orderbills: [],
            message: null
        }
        this.addOrderBill = this.addOrderBill.bind(this);
        this.deleteOrderBill = this.deleteOrderBill.bind(this);
        this.editOrderBill = this.editOrderBill.bind(this);
    }

    addOrderBill(){
        this.props.history.push('/addOrderBill/_add');
    }
    editOrderBill(id){
        this.props.history.push(`/updateOrderBill/${id}`)
    }
    viewOrderBill(id){
        this.props.history.push(`/viewOrderBill/${id}`);
    }

    deleteOrderBill(id){
        OrderBillService.deleteOrderBill(id).then( res => {
            this.setState({orderbills: this.state.orderbills.filter(orderbill => orderbill.id !== id)});
            alert("Deletion done");
        }).catch(error => {
            alert("can't delete associated one: " +error.res);
            console.log(error);
        })
    }
    
    componentDidMount(){
        OrderBillService.getOrderBills().then((res) => {
            console.log(res.data);
            this.setState({ orderbills: res.data});
        });
    }   

    render() {
        return (
            <div>
                <Header title="ORDERBILL LIST" />
                <div className="col">
                   <button className="btn btn-primary" onClick={this.addOrderBill}> Add OrderBill </button>
                </div>
                <br /><br />
                <div className="row">
                        <table className= "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> OrderBillId</th>
                                    <th> Date</th>
                                    <th> GrandTotal</th>
                                    <th> SweetOrder </th>
                                    <th> Order Product </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orderbills.map(
                                        orderbill => 
                                        <tr key = {orderbill.id}>
                                            <td> {orderbill.id} </td>   
                                            <td> {orderbill.createdDate}</td>
                                            <td> {orderbill.total}</td>
                                            <td> {orderbill.listSweetOrder.sweetOrderId} </td>
                                            <td> {orderbill.listSweetOrder.listItems.length ? orderbill.listSweetOrder.listItems[0].product.name : "-"} </td>
                                            <td>
                                            <button onClick={ () => this.editOrderBill(orderbill.id)} className="btn btn-info">UPDATE </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewOrderBill(orderbill.id)} className="btn btn-info"> VIEW </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteOrderBill(orderbill.id)} className="btn btn-danger"> DELETE </button>
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
export default ListOrderBillComponent 