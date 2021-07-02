import React, { Component } from "react";
import SweetOrderService from "../../services/SweetOrderServices/SweetOrderService";

class ViewSweetOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sweetOrderId: this.props.match.params.id,
            sweetOrder: {}
        }
    }

    componentDidMount(){
        SweetOrderService.getSweetOrderBySweetOrderId(this.state.sweetOrderId).then( res => {
            console.log("view");
            this.setState({sweetOrder: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View SweetOrder Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Sweet Order Id: </label>
                            <div> { this.state.sweetOrder.sweetOrderId}</div>
                        </div>
                        <div className = "row">
                            <label> Order Item Id: </label>
                            <div> { this.state.orderItemId }</div>
                        </div>
                        <div className = "row">
                            <label> Product Id: </label>
                            <div> { this.state.productId}</div>
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
                        <div className = "row">
                            <label> Created Date: </label>
                            <div> { this.state.createdDate }</div>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSweetOrderComponent