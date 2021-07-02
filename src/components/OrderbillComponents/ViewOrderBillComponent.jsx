import React, { Component } from 'react'
import OrderBillService from '../../services/OrderbillServices/OrderBillService';
import Header from '../pages/Header';

class viewOrderBillComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            orderbill: {},
            loading: true
        }
    }
    componentDidMount(){
        OrderBillService.getOrderBillById(this.state.id).then( res => {
            console.log("debug", res.data);
            this.setState({orderbill: res.data, loading: false});
        })
    }

    cancel(){
        this.props.history.push('/orderbill');
    }

    render() {
        console.log(this.state.orderbill);
        const orderbill = this.state.orderbill;
        const sweetOrder = orderbill.listSweetOrder;
        if(this.state.loading)
        {
            return(
                <div>
                    loadin...
                </div>
            )
        }
        return (
            <div>   
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <Header title ="View OrderBill" />
                    <div className = "card-body">
                        <div className = "row">
                            <label> <b>OrderBill Id:</b> </label>
                            <div> { orderbill.id}</div>
                        </div>
                        <div className="row">
                            <label> <b>Date:</b> </label>
                            <div> {orderbill.createdDate} </div>
                        </div>
                        <div className="row">
                            <label> <b>GrandTotal:</b> </label>
                            <div> {orderbill.total} </div>
                        </div>

                        <div className="row">
                            <label> <b>Sweet Order:</b> </label>
                            <div> {sweetOrder.sweetOrderId} </div>
                        </div>
                        <div className="row">
                            <label> <b>Product Name:</b> </label>
                            <div> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.name : "-"} </div>
                        </div>
                        
                        <div className="row">
                            <label> <b>Product Price:</b> </label> 
                            <div> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.price : "-"} </div>
                        </div>

                        <div className="row">
                            <label> <b>Product Description:</b> </label>
                            <div> {sweetOrder.listItems.length ? sweetOrder.listItems[0].product.description : "-"} </div>
                        </div>

<br /><br />
                        <button style={{marginLeft: "10px"}} className="btn btn-info" onClick={this.cancel.bind(this)}> CANCEL </button>

                        </div>
                    </div>

                </div>
        )
    }
}

export default viewOrderBillComponent
