import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
  let history = useHistory();
    const logout = () => {
        localStorage.removeItem("userId");
        props.setUser(null);
        history.push('/');
    }
    return(
        <nav className="navbar navbar-expand=lg navbar-dark bg-warning">
            <div className="container">
                <Link className="navbar-brand text-dark" to='/dashboard'>
                    <b>Online Sweet Mart App</b>
                </Link>

                <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/admin'>
                            Administration
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/customers'>
                            Customer
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/carts'>
                            Cart
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/products'>
                            Product
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/sweetItem'>
                            Sweet Item
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/sweetOrder'>
                            Sweet Order
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/orderbill'>
                            Order Bill
                        </NavLink>
                    </li>

                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to='/team'>
                            Our Team
                        </NavLink>
                    </li> */}

                    <li className="nav-item">
                    {  props.user ? (
                        <div className="nav-link" onClick={logout}>
                            Logout
                        </div>
                    ) : (<NavLink className="nav-link" to='/login'>
                        Login
                    </NavLink>)
                        } 
                        
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;