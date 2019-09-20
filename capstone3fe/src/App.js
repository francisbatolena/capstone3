import React, { useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Services from './components/Services';
import AdminPanel from './components/AdminPanel';
import image from './images/logo.png'

function App() {
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userId")? true : false)

	let renderHome = () => 
		<Home 
		setIsLoggedIn={setIsLoggedIn}
		isLoggedIn={isLoggedIn} 
		/>

	let renderServices = () => 
		<Services 
		setIsLoggedIn={setIsLoggedIn}
		isLoggedIn={isLoggedIn} 
		/>

	let logoutClickHandler = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		setIsLoggedIn(false);
	}

	function displayApp() {
		if(isLoggedIn===true && localStorage.getItem("username")==="admin") {
			return(
				<React.Fragment>
					<nav id="navbar" className="navbar navbar-expand-lg navbar-light sticky-top">
						
						<div id="logo"><img src={image} alt="logo"/></div>

						<button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar-nav">
							<i className="fas fa-bars"></i>
							<div id="nav-icon2">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>

						<div id="navbar-nav" className="collapse navbar-collapse">
							<ul className="navbar-nav ml-auto">
							    <li className="nav-item">
									<Link className="nav-link" to="/">HOME</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/services">SERVICES</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/admin_panel">ADMIN PANEL</Link>
							    </li>
							    <button 
							    className="btn btn-info" 
							    onClick={logoutClickHandler}
							    >
							    	LOG OUT
							    </button>
							</ul>
						</div>
					</nav>

					<div>
						<Route path="/services" exact component={renderServices}/>
						<Route path="/" exact component={renderHome}/>
						<Route path="/admin_panel" exact component={AdminPanel}/>
					</div>
					<footer className="footer">
						<p className="text-center p-3 mb-0">© 2019 Pinoy Handyman On-Demand. All rights reserved.</p>
					</footer>
				</React.Fragment>
			);
		} else if (isLoggedIn===true){
			return(
				<React.Fragment>
					<nav id="navbar" className="navbar navbar-expand-lg navbar-light sticky-top">
						
						<div id="logo"><img src={image} alt="logo"/></div>

						<button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar-nav">
							<i className="fas fa-bars"></i>
							<div id="nav-icon2">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>

						<div id="navbar-nav" className="collapse navbar-collapse">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/">HOME</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/services">SERVICES</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/admin_panel">BOOKING STATUS</Link>
							    </li>
							    <button 
							    className="btn btn-info" 
							    onClick={logoutClickHandler} 
							    >
							    	LOG OUT
							    </button>
							</ul>
						</div>
					</nav>

					<div>
						<Route path="/services" exact component={renderServices}/>
						<Route path="/" exact component={renderHome}/>
						<Route path="/admin_panel" exact component={AdminPanel}/>
					</div>
					<footer className="footer">
						<p className="text-center p-3 mb-0">© 2019 Pinoy Handyman On-Demand. All rights reserved.</p>
					</footer>
				</React.Fragment>
			);
		} else {
			return(
				<React.Fragment>
					<nav id="navbar" className="navbar navbar-expand-lg navbar-light sticky-top">
						
						<div id="logo"><img src={image} alt="logo"/></div>

						<button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbar-nav">
							<i className="fas fa-bars"></i>
							<div id="nav-icon2">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</button>

						<div id="navbar-nav" className="collapse navbar-collapse">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/">HOME</Link>
							    </li>
							    <li className="nav-item">
									<Link className="nav-link" to="/services">SERVICES</Link>
							    </li>
							</ul>
						</div>
					</nav>

					<div>
						<Route path="/services" exact component={renderServices}/>
						<Route path="/" exact component={renderHome}/>
					</div>
					<footer className="footer">
						<p className="text-center p-3 mb-0">© 2019 Pinoy Handyman On-Demand. All rights reserved.</p>
					</footer>
				</React.Fragment>
			);
		} 
		
	}
	
  return (
  	<BrowserRouter>
	    <div className="App container-fluid p-0 m-0">
	    	{ displayApp() }
	    </div>
	</BrowserRouter>
  );
}

export default App;
