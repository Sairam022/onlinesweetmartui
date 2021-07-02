import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ListCartComponent from './components/CartComponnets/ListCartComponent';
import CreateCartComponent from './components/CartComponnets/CreateCartComponent';
import viewCartComponent from './components/CartComponnets/ViewCartComponent';
import ListOrderBillComponent from './components/OrderbillComponents/ListOrderBillComponent';
import Login from './components/LoginComponents/Login';
import Register from './components/RegisterComponents/Register';
import NavBar from './components/layout/NavBar';
import ListProductComponent from './components/ProductComponents/ListProductComponent';
import CreateProductComponent from './components/ProductComponents/CreateProductComponent';
import viewProductComponent from './components/ProductComponents/ViewProductComponent';
import DashBoard from './components/pages/Dashboard';
import ListCustomerComponent from './components/CustomerComponents/ListCustomerComponent';
import CreateCustomerComponent from './components/CustomerComponents/CreateCustomerComponent';
import viewCustomerComponent from './components/CustomerComponents/ViewCustomerComponent';
import Footer from './components/pages/Footer';
import viewOrderBillComponent from './components/OrderbillComponents/ViewOrderBillComponent';
import CreateOrderBillComponent from './components/OrderbillComponents/CreateOrderBillComponent';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { useState } from 'react';
import ListAdminComponent from './components/AdminComponents/ListAdminComponent';
import CreateAdminComponent from './components/AdminComponents/CreateAdminComponent';
import viewAdminComponent from './components/AdminComponents/ViewAdminComponent';
import ListSweetItemComponent from './components/SweetItemComponents/ListSweetItemComponent';
import CreateSweetItemComponent from './components/SweetItemComponents/CreateSweetItemComponent';
import viewSweetItemComponent from './components/SweetItemComponents/ViewSweetItemComponent';
import ListSweetOrderComponent from './components/SweetOrderComponents/ListSweetOrderComponent';
import CreateSweetOrderComponent from './components/SweetOrderComponents/CreateSweetOrderComponent';
import viewSweetOrderComponent from './components/SweetOrderComponents/ViewSweetOrderComponent';


function validate(to, from, next){
  const userId =  window.localStorage.getItem("userId");
  if(userId)
  {
    next();
  }
  else{
    next.redirect('/')
  }
}

function App() {
    const userId = localStorage.getItem("userId")
    const [user, setUser] = useState(userId)
    
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          { <NavBar user={user } setUser={setUser} /> }
          <GuardProvider guards={[validate]}>
          <Switch>

          <GuardedRoute path="/" exact component={(props)=><Login {...props} setUser={setUser}/>} />
            <GuardedRoute path="/dashboard" component={DashBoard} />

            <GuardedRoute path="/products" component={ListProductComponent} />
            <GuardedRoute path="/addProduct/:id" component={CreateProductComponent} />
            <GuardedRoute path="/updateProduct/:id" component={CreateProductComponent} />
            <GuardedRoute path="/viewproduct/:id" component={viewProductComponent} />

            <GuardedRoute path="/carts" exact component={ListCartComponent} />
            <GuardedRoute path="/addCart/:id" component={CreateCartComponent} />
            <GuardedRoute path="/updateCart/:id" component={CreateCartComponent} />
            <GuardedRoute path="/viewCart/:id" component={viewCartComponent} />

            <GuardedRoute path="/admin" exact component={ListAdminComponent} />
            <GuardedRoute path="/addAdmin/:id" component={CreateAdminComponent} />
            <GuardedRoute path="/updateAdmin/:id" component={CreateAdminComponent} />
            <GuardedRoute path="/viewAdmin/:id" component={viewAdminComponent} />

            <GuardedRoute path="/customers" component={ListCustomerComponent} />
            <GuardedRoute path="/addCustomer/:id" component={CreateCustomerComponent} />
            <GuardedRoute path="/updateCustomer/:id" component={CreateCustomerComponent} />
            <GuardedRoute path="/viewCustomer/:id" component={viewCustomerComponent} />

            <GuardedRoute path="/sweetItem" exact component={ListSweetItemComponent} />
            <GuardedRoute path="/addSweetItem/:id" component={CreateSweetItemComponent} />
            <GuardedRoute path="/updateSweetItem/:id" component={CreateSweetItemComponent} />
            <GuardedRoute path="/viewSweetItem/:id" component={viewSweetItemComponent} />

            <GuardedRoute path="/sweetOrder" exact component={ListSweetOrderComponent} />
            <GuardedRoute path="/addSweetOrder/:id" component={CreateSweetOrderComponent} />
            <GuardedRoute path="/updateSweetOrder/:id" component={CreateSweetOrderComponent} />
            <GuardedRoute path="/viewSweetOrder/:id" component={viewSweetOrderComponent} />

            <GuardedRoute path="/login" component={Login} />

            <GuardedRoute path="/orderbill" exact component={ListOrderBillComponent} />
            <GuardedRoute path="/addOrderBill/:id" component={CreateOrderBillComponent} />
            <GuardedRoute path="/updateOrderBill/:id" component={CreateOrderBillComponent} />
            <GuardedRoute path="/viewOrderBill/:id" component={viewOrderBillComponent} />
          </Switch>
          </GuardProvider>
          <Route path="/addUser" component={Register} />
          {/* <Route path="/team" component={Team} /> */}
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
