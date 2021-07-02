import React, { Component } from "react";
import SweetItemService from '../../services/SweetItemServices/SweetItemService'
import Header from "../pages/Header";

class viewSweetItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderItemId: this.props.match.params.id,
            sweetItem: {}
        }
    }

    componentDidMount(){
        SweetItemService.getSweetItemByOrderItemId(this.state.orderItemId).then( res => {
            console.log("view");
            this.setState({sweetItem: res.data});
        })
    }

    
    cancel(){
        this.props.history.push('/products');
    }


    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                <Header title="VIEW SWEETITEM" />
                    <div className = "card-body">
                        <div className = "row">
                            <label> Order Item Id: </label>
                            <div> { this.state.sweetItem.orderItemId}</div>
                        </div>
                        <div className = "row">
                            <label> Product Id: </label>
                            <div> { this.state.productId }</div>
                        </div>
                        <div className = "row">
                            <label> Product Name: </label>
                            <div> { this.state.productName }</div>
                        </div>
                        <div className = "row">
                            <label> Product Price: </label>
                            <div> { this.state.productPrice }</div>
                        </div>
                        <div className = "row">
                            <label> Product Description: </label>
                            <div> { this.state.productDescription }</div>
                        </div>
                        <br />
                        <button className="btn btn-info" onClick={this.cancel.bind(this)}> BACK </button>

                    </div>
                 
                </div>
            </div>
        )
    }
}

export default viewSweetItemComponent