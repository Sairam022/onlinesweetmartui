import axios from "axios";
import { Component } from "react";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            type: "",
            errors: {}
        }
    }

    handleValidation() {
        console.log("came to valid");
        let username = this.state.username;
        let password = this.state.password;
        let passwordConfirm = this.state.passwordConfirm;
        let errors = {};
        let formIsValid = true;

        if(!username.match(/^[a-zA-Z0-9 ]+$/)) {
            formIsValid = false;
            errors["username"] = "Only Alphanumeric characters are allowed";
        } else if(username.length<2 || username.length>10) {
            formIsValid = false;
            errors["username"] = "Username should be between 2-10 characters length";
        }

        if(password.length<8) {
            formIsValid = false;
            errors["password"] = "Password should contain atleast one Uppercase letter, one Lowercase letter, one Number and one Special character of length atleast 8 characters";
        }
        else if(password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8}$/)) {
            formIsValid = false;
            errors["password"] = "Password should contain atleast one Uppercase letter, one Lowercase letter, one Number and one Special character";
        }

        if(password !== passwordConfirm) {
            formIsValid = false;
            errors["confirmPassword"] = "Password don't match";
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    
    handleChange = e => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ ...this.state, [nam]: val });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        this.validateRegister(this.state);
    }

    validateRegister = async (reg) => {
        console.log("this is validateRegister()", reg);
        if(this.handleValidation()){
            console.log("sen to calid");
        let result = await axios.post('http://localhost:8081/api/osm/user/add',{
            username: reg.username,
            password: reg.password,
            passwordConfirm: reg.passwordConfirm,
            type: reg.type,
        })
        console.log("result data",+ result.data);
        alert("Accuunt Created Successfully! Your UserID is: "+result.data.userId);
        this.props.history.push('/login');
    }
}

    render() {
        return(
            <div>
                <div className="container">
                    <br />
                    <center>
                        <h2 className="p-2 mb-3 bg-success text-light"> REGISTER PAGE </h2>
                    </center>
                    <br />
                    <br />
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div id="error">{this.state.error}</div>
                        <div className="form-group">
                            <center>
                                <input className="row input-field row w-25 p-2"
                                placeholder="Enter Username"
                                name="username"
                                type="text"
                                required
                                onChange={e => this.handleChange(e)} />
                                <div> <span style={{color: 'red'}}> {this.state.errors["username"]} </span> </div>
                            </center>
                        </div>
                        <br />

                        <div className="form-group">
                            <center>
                                <input className="row input-field row w-25 p-2"
                                placeholder="Enter Password"
                                name="password"
                                type="password"
                                required
                                onChange={e => this.handleChange(e)} />
                                <div> <span style={{color: 'red'}}> {this.state.errors["password"]} </span> </div>
                            </center>
                        </div>
                        <br />

                        <div className="form-group">
                            <center>
                                <input className="row input-field row w-25 p-2"
                                placeholder="Enter Password Again"
                                name="passwordConfirm"
                                type="password"
                                required
                                onChange={e => this.handleChange(e)} />
                                <div> <span style={{color: 'red'}}> {this.state.errors["confirmPassword"]} </span> </div>
                            </center>
                        </div>
                        <br />

                        <div className="form-group">
                            <center>
                                <input className="row input-field row w-25 p-2"
                                placeholder="Enter ADMIN or CUSTOMER"
                                name="type"
                                type="text"
                                required
                                onChange={e => this.handleChange(e)} />
                            </center>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col">
                                <button className="btn btn-info form-control btn-block"> REGISTER </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}