import React,{ Component } from "react";
import AdminService from "../../services/AdminServices/AdminService";
import Header from "../pages/Header";

class ListAdminComponent extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            admin: []
        }
        this.addAdmin = this.addAdmin.bind(this);
        this.editAdmin = this.editAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
    }

    addAdmin(){
        this.props.history.push('/addAdmin/_add');
    }

    editAdmin(id){
        this.props.history.push(`/updateAdmin/${id}`);
    }

    viewAdmin(id) {
        this.props.history.push(`/viewAdmin/${id}`);
    }

    deleteAdmin(id) {
        AdminService.deleteAdmin(id).then( res => {
            this.setState({admin: this.state.admin.filter(admin =>admin.id !== id)});
            alert("Deletion done");
        }).catch(error => {
            alert("can't delete associated one: " +error.res);
            console.log(error.res);
        })
    }

    componentDidMount(){
        AdminService.getAdmin().then((res) => {
            this.setState({ admin: res.data});
        });
    }

    render(){
        return (
            <div>
                <Header title="ADMIN LIST" />
                <div className="col">
                    <button className="btn btn-primary" onClick={this.addAdmin}> Add Admin </button>
                </div>
                <br /><br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Admin Id</th>
                                <th>User </th>
                                <th> Sweet Item </th>
                                <th> Cart </th>
                                <th> Product</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.admin.map(
                                    admin =>
                                    <tr key = {admin.id}>
                                        <td>{admin.id}</td>
                                        <td> {admin.user.username} </td>
                                        <td> {admin.item.orderItemId} </td>
                                        <td> {admin.cart.cartId} </td>
                                        <td> {admin.product.name} </td>
                                        <td>
                                            <button onClick={ () => this.editAdmin(admin.id)} className="btn btn-info"> Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.viewAdmin(admin.id)} className="btn btn-info"> VIEW </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAdmin(admin.id)} className="btn btn-danger">DELETE</button>
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
export default ListAdminComponent