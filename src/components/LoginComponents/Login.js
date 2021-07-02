import React from "react";
import axios from "axios";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            password: ""
        }
    }

    handleChange = event => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ ...this.state, [nam]: val });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.validateLogin(this.state);
    }

    validateLogin = async (User) => {
        console.log("this is validateLogin()", User);
      let result = await  axios.put('http://localhost:8081/api/osm/login',{
      userId: User.userId,
      password: User.password,
     
    })
        console.log("result data",+ result.data === "Login successful.");
        if (result.data === "Login successful."){
            this.props.setUser("User");
            window.localStorage.setItem('userId', "User");
           this.props.history.push('/dashboard');
        }
        else {
            alert("Login Failed! Invalid Details");
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>

                    <div
                        className="container "
                    >
                        <br />
                        <center>
                            <h2 className="p-2 mb-3 bg-success text-light" >LOGIN PAGE</h2>

                        </center>
                        <br />
                        <br />
                        <form onSubmit={(event) => this.handleSubmit(event)} >
                            <div id="error">{this.state.error}

                            </div>

                            <div className="form-group">
                                <center>

                                    <input
                                        className="row input-field row w-25 p-2 "
                                        placeholder="Enter User ID"
                                        name="userId"
                                        type="number"
                                        onChange={event => this.handleChange(event)} />
                                </center>
                            </div>
                            <br />

                            <br />
                            <div className="form-group">
                                <center>
                                    <input
                                        className="row input-field row w-25 p-2"
                                        placeholder="Enter Password"
                                        name="password"
                                        type="password"
                                        onChange={event => this.handleChange(event)} />
                                </center>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <div className="row  ">
                                    <div className="col">

                                    </div>
                                    <div className="col-md">
                                        <button className="btn btn-success form-control  btn-info">LOGIN</button>
                                    </div>
                                    <br />
                                    <div className="col">
                                        </div>
                                </div>
                            </div>
                            <br/> <br/>
                            <div className="row">
                                <div className="col"></div>
                                <div className="col">
                                    <button className="btn btn-warning form-control" type="button" onClick={() => this.props.history.push('/addUser')} >SignUp</button>
                                </div>
                                <div className="col"></div>
                                <br /><br />
                                <br /><br />
                            </div>
                        </form>
                    </div>
                </div>
            //</div>

        );
    };

}
