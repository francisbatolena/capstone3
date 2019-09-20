import React, { useState, useEffect } from 'react'

function RegisterForm(props) {
	let [email, setEmail] = useState("");
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [confirmpw, setConfirmpw] = useState("");

	let [emailError, setEmailError] = useState("");
	let [usernameError, setUsernameError] = useState("");
	let [passwordError, setPasswordError] = useState("");
	let [confirmpwError, setConfirmpwError] = useState("");
	
	let [registerBtnDisabled, setRegisterBtnDisabled] = useState(true);

	let [accounts, setAccounts] = useState([""]);

	let emailChangeHandler = (e) => {
		setEmail(e.target.value)	
	
		if(e.target.value.trim() === "") {
			setEmailError("This field cannot be empty.");
		} else {
			setEmailError("");				
		}
	}

	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)	
	
		if(e.target.value.trim() === "") {
			setUsernameError("This field cannot be empty.");
		} else {
			setUsernameError("");				
		}
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)

		if(e.target.value.trim() === "") {
			setPasswordError("This field cannot be empty.");
		} else if(e.target.value.trim() !== confirmpw){
			setPasswordError("Does not match confirm password.");
		} else {
			setPasswordError("");
			setConfirmpwError("");

		}
	}	

	let confirmpwChangeHandler = (e) => {
		setConfirmpw(e.target.value)

		if(e.target.value.trim() === "") {
			setConfirmpwError("This field cannot be empty.");
		} else if(e.target.value.trim() !== password){
			setConfirmpwError("Does not match password.");
		} else {
			setConfirmpwError("");
			setPasswordError("");
		}
	}

	checkForm();

	function checkForm() {
		if(email.trim()!=="" &&username.trim()!=="" 
			&& password.trim()!=="" && confirmpw.trim()!==""
			&& emailError=="" &&usernameError==""
			&&passwordError==""&&confirmpwError=="") {
			if(registerBtnDisabled!==false){
				setRegisterBtnDisabled(false);
			}
		} else {
			if(registerBtnDisabled!==true){
				setRegisterBtnDisabled(true);
			}
		}
	}
	
	let submitClickHandler = () => {
		let user = {
			email: email,
			username: username,
			password: password
		}


		fetch("http://localhost:8080/register", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => res.text())
		.then(data => {
			console.log(data)
			alert(data)
		});
	}

	

	return(
		<div className="card col-md-4 col-xs-10 formBG">
			<h5 className="card-header">
		        <strong>REGISTER</strong>
		    </h5>
		    <div className="card-body px-lg-5 pt-0">
		    	<form className="text-center">
					<div className="form-group">
						<input
							className="form-control"
							type="email"
							placeholder="email"
							value={email}
							autoComplete="false"
							onChange={emailChangeHandler}
							onBlur={emailChangeHandler}
						/>
						<small className="text-danger text-center">{emailError}</small>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="text"
							placeholder="username"
							value={username}
							autoComplete="false"
							onChange={usernameChangeHandler}
							onBlur={usernameChangeHandler}
						/>
						<small className="text-danger text-center">{usernameError}</small>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							placeholder="password"
							value={password}
							autoComplete="false"
							onChange={passwordChangeHandler}
							onBlur={passwordChangeHandler}
						/>
						<small className="text-danger text-center">{passwordError}</small>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							placeholder="confirm password"
							value={confirmpw}
							autoComplete="false"
							onChange={confirmpwChangeHandler}
							onBlur={confirmpwChangeHandler}
						/>
						<small className="text-danger text-center">{confirmpwError}</small>
					</div>
					<button
						id="registerBtn" 
						className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
						onClick={submitClickHandler}
						disabled={registerBtnDisabled}
					>SUBMIT</button>
				</form>
			<small>Already a member? </small><button className="btn btn-info p-1 m-1" onClick={props.clickFormHandler}>Login</button>
		    </div>
		</div>
		
	);
}

export default RegisterForm