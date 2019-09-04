import React, { useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
// import logo from './logo.svg';
// import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import Cart from './components/Cart';
import AddProductForm from './components/AddProductForm';
import UploadImage from './components/UploadImage';

function App() {
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("username") ? true : false)

	let renderRegisterForm = () => 
		<RegisterForm setIsLoggedIn={setIsLoggedIn} />	

	let renderLoginForm = () => 
		<LoginForm setIsLoggedIn={setIsLoggedIn} />
	
	let logoutClickHandler = () => {
		localStorage.removeItem("username");
		setIsLoggedIn(false);
	}

	let display = () => 
		!isLoggedIn ?
		<React.Fragment>
			<nav className="navbar navbar-expand-sm bg-light justify-content-center">
			  <ul className="navbar-nav">
			    <li className="nav-item">
					<Link className="nav-link" to="/register">Register</Link>
			    </li>
			    <li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
			    </li>
			  </ul>
			</nav>

			<Route path="/register" exact render={renderRegisterForm}/>
			<Route path="/login" exact render={renderLoginForm}/>
		</React.Fragment> : 
		<React.Fragment>
			<nav className="navbar navbar-expand-sm bg-light justify-content-center">
			  <ul className="navbar-nav">
			    <li className="nav-item">
					<Link className="nav-link" to="/products">Products</Link>
			    </li>
			    <li className="nav-item">
					<Link className="nav-link" to="/cart">Cart</Link>
			    </li>
			    <li className="nav-item">
					<Link className="nav-link" to="/addproduct">Add Product</Link>
			    </li>
			    <li className="nav-item">
					<button onClick={logoutClickHandler} className="btn btn-default">Logout</button>
			    </li>
			  </ul>
			</nav>

			<Route path="/products" exact component={Products}/>
			<Route path="/cart" exact component={Cart}/>
			<Route path="/addproduct" exact component={AddProductForm}/>
		</React.Fragment>
	// localStorage.setItem("cart", JSON.stringify([]))
  return (
  	<BrowserRouter>
	    <div className="App container-fluid">
	    	<div className="row">
	    		<div className="col-12 col-md-8 offset-md-2">
	    			{ display() }
	    		</div>
	    	</div>
	    </div>
	</BrowserRouter>
  );
}

export default App;
