import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Review from './Review';
import image from '../images/logo.png'

function Home(props) {

	let [formVisible, setFormVisible] = useState(false);
	let [review, setReview] = useState("");
	let [reviews, setReviews] = useState([""]);
	let [reviewError, setReviewError] = useState("");

	let [reviewBtnDisabled, setReviewBtnDisabled] = useState(true);

	let clickFormHandler = () => {
		if(formVisible!==false){
			setFormVisible(false);
		} else {
			setFormVisible(true)
		}
	}

	let showForm = () => {

		if(formVisible===false) {
			return(
				<div id="loginForm">
					<LoginForm
						clickFormHandler={clickFormHandler}
						setIsLoggedIn={props.setIsLoggedIn}
					/>
				</div>
			)			
		} else {
			return(
				<div id="registerForm" >
					<RegisterForm
						clickFormHandler={clickFormHandler}
					/>					
				</div>
			)
		}
	}

	let reviewChangeHandler = (e) => {
		setReview(e.target.value)	
	
		if(e.target.value.trim() === "") {
			setReviewError("This field cannot be empty.");
		} else {
			setReviewError("");				
		}
	}

	checkReviewForm();

	function checkReviewForm() {
		if(review.trim()!== "" && localStorage.getItem("userId")!== null) {
			if(reviewBtnDisabled!==false){
				setReviewBtnDisabled(false);
			}
		} else {
			if(reviewBtnDisabled!==true){
				setReviewBtnDisabled(true);
			}
		}
	}

	let submitReviewClickHandler = () => {

		let newReview = {
			review: review
		}
		fetch("http://localhost:8080/users/"+(localStorage.getItem("userId"))+"/reviews", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newReview)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		});

		alert("You've successfully added a review!")
	}

	let fetchReviews = () => {
		fetch("http://localhost:8080/reviews")
		.then(res => res.json())
		.then(data => {
			setReviews(data);	
		});
	}

	useEffect( () => {
		fetchReviews()
	}, []);

	let displayAboutUs = () => {
		return(
			<div className="p-1">
				<h2>ABOUT US</h2>
				<p>We got your back! Regardless of the size of your home, maintaining it can be a struggle. While you may not have the time or the tools to accomplish everything on your to-do list. Pinoy Handyman On-Demand has a reliable team of experts who offer wide range of services with great quality and efficiency.
				</p><br/>

				<p>We have been a trusted brand for home improvement and repair, providing almost any home repair, installation and maintenance service. You don't want to put your life on hold to fix the door that won't close, or patch the hole in your drywall, and we understand that. That’s why our team respects your schedule and arrives with all the tools and equipment necessary to provide an efficient, reliable handyman service. It is our goal to keep your home in tip top shape so you can stay on track.
				</p>
			</div>
		)
	}

	let displayHowItWorks = () => {
		return(
			<div id="howItWorks">
				<h2>HOW IT WORKS?</h2>
				<div className="card-group p-1">
					<div className="card p-5 m-1">
						<h4>STEP 1</h4>
						<div className="card-img-top">
							<i className="fas fa-calendar-alt"></i>
						</div>
						<div className="card-body">
							<h5 className="card-title">BOOK</h5>
							<p className="card-text">Book a service from our website.</p>
						</div>
					</div>
					<div className="card p-5 m-1">
						<h4>STEP 2</h4>
						<div className="card-img-top">
							<i className="fas fa-tools"></i>
							<div className="card-body">
								<h5 className="card-title">FIX</h5>
								<p className="card-text">We'll fix it for you.</p>
							</div>
						</div>
					</div>
					<div className="card p-5 m-1">
						<h4>STEP 3</h4>
						<div className="card-img-top">
							<i className="fas fa-mug-hot"></i>
						</div>
						<div className="card-body">
							<h5 className="card-title">RELAX</h5>
							<p className="card-text">You can have more time to relax.</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	let displayReviews = () => {
		if(reviews!=""){
			return reviews.map(item =>
				<Review
					key={item.id}
					reviewId={item.id}
					review={item.review}
					username={item.user.username}
					fetchReviews={fetchReviews}
				/>
			)
		}
	}

	let displayCreateReviewForm = () => {
		return(
			<div className="card">
				<h5 className="card-header">
			        <strong>Create a Review</strong>
			    </h5>
			    <div className="card-body">
			    	<form className="text-center">
						<div className="form-group">
							<textarea
								rows="4" cols="50"
								form="usrform"
								className="form-control"
								type="text"
								placeholder="Write your review here"
								autoComplete="false"
								onChange={reviewChangeHandler}
								onBlur={reviewChangeHandler}
							>
							</textarea>
							<small className="text-danger text-center">{reviewError}</small>
						</div>
						
						<button
							className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
							onClick={submitReviewClickHandler} disabled={reviewBtnDisabled}
						>SUBMIT REVIEW</button>
					</form>
			    </div>
			</div>
		)
	}

	if(props.isLoggedIn===false){
		return(
			<div>
				<div id="homeBG" className="">
					<div id="homeForm" className="">
						{showForm()}
					</div>
				</div>

				<div id="homeContent" className="jumbotron">
						{displayAboutUs()}
						{displayHowItWorks()}
					<div>
						<h2>RECENT REVIEWS</h2>
						<div className="row py-3">
							{displayReviews()}
						</div>
					</div>
				</div>			
			</div>

		);
	} else {
		return(
			<div>
				<div id="homeBG" className="">
					<h3 className="mt-5">{"Welcome Back " + (localStorage.getItem("username"))}</h3>
					<img className="mt-5" src={image}/>
				</div>

				<div id="homeContent" className="jumbotron">
					{displayAboutUs()}
					{displayHowItWorks()}
					<div>
						<h2>RECENT REVIEWS</h2>
						<div className="row py-3">
							{displayReviews()}
						</div>
						{displayCreateReviewForm()}
					</div>
				</div>			
			</div>
		)
	}
}

export default Home;