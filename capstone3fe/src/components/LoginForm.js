import React, {useState} from 'react'

function LoginForm(props) {
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");

	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)
	}

	function parseJwt (token) {
	    var base64Url = token.split('.')[1];
	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));

	    return JSON.parse(jsonPayload);
	};

	let submitClickHandler = () => {
		let user = {
			username,
			password
		}
		fetch("http://localhost:8080/login", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => res.text())
		.then(data => {
			localStorage.setItem("userId",(parseJwt(data).account.id));
			localStorage.setItem("username",(parseJwt(data).account.username));
			window.location.reload(false);
			alert("Welcome "+ (parseJwt(data).account.username))
		})
		.catch(e => {
			alert("Login failed. Invalid Username/Password")
		});
	}

	return(
		<div className="card col-xs-10 col-md-4 formBG">
			<h5 className="card-header">
		        <strong>LOG IN</strong>
		    </h5>
		    <div className="card-body px-lg-5 pt-0">
				<form className="text-center">
					<div className="form-group md-form mt-4">
						<input
							className="form-control"
							type="text"
							placeholder="username"
							value={username}
							autoComplete="false"
							onChange={usernameChangeHandler}
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							placeholder="password"
							value={password}
							autoComplete="false"
							onChange={passwordChangeHandler}
						/>
					</div>
					<button 
						className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
						type="button"
						onClick={submitClickHandler}
					>SUBMIT</button>
				</form>
			<small>Not yet a member? </small><button className="btn btn-info p-1 m-1" onClick={props.clickFormHandler}>Register</button>
			</div>
		</div>
	);
}

export default LoginForm;