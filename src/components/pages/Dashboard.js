import React from "react";
import Header from "./Header";
class DashBoard extends React.Component {
  


 

    render(){
        return <div>
          <br/>
          <br/>
          <Header title="DASHBOARD" />
          <br />
        <div className = "ui four column grid">
          <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header" href = "/admin">Admin</a>
              <div className="description">
              For Administration tasks aggregates information from various tables.
              </div>
              </div>
              <div className="extra content">
              <a href = "/addAdmin/_add"><i className="plus icon"></i> Add </a>
              <a href = "/admin"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
            </div>
            <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header"  href = "/customers">Customer</a>
              <div className="description">
              For managing customer information
              </div>
              </div>
              <div className="extra content">
              <a href = "/addCustomer/_add"><i className="plus icon"></i> Add </a>
              <a href = "/customers"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
            </div>
            <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header"  href = "/carts" >Cart</a>
              <div className="description">
              For managing carts of customers
              </div>
              </div>
              <div className="extra content">
              <a href="/addCart/_add"><i className="plus icon"></i> Add </a>
              <a href = "/carts"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
              </div>
            <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header" href="/products">Product</a>
              <div className="description">
              For managing product information
              </div>
              </div>
              <div className="extra content">
              <a href="/addProduct/_add"><i className="plus icon"></i> Add </a>
              <a href="/products"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
            </div>
            <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header" href="/sweetOrder">SweetOrder</a>
              <div className="description">
              For manging product categories.
              </div>
              </div>
              <div className="extra content">
              <a href = "/addSweetOrder/_add" ><i className="plus icon"></i> Add </a>
              <a  href = "/sweetOrder"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
              </div>
              <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header" href = "/sweetItem">Sweet Item</a>
              <div className="description">
              For managing individual sweet items.
              </div>
              </div>
              <div className="extra content">
              <a href = "/addSweetItem/_add"><i className="plus icon"></i> Add </a>
              <a href = "/sweetItem"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
              </div>
              <div className = "column">
              <div className="ui card">
              <div className="content">
              <a className="header" href = "/orderbill">Order Bill</a>
              <div className="description">
              For managing bills for sweet orders.
              </div>
              </div>
              <div className="extra content">
              <a href = "/orderbill/_add"><i className="plus icon"></i> Add </a>
              <a href = "/orderbill"> <i className="list alternate outline icon"></i>  Show All </a>
              </div>
              </div>
              </div>
        
        </div>
        <br />
        <br />
        </div>
    }
}

export default DashBoard;
