import React, {useState, useEffect} from 'react';
import Review from './Review';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

function ServiceBookingPage(props) {
  	let [review, setReview] = useState("");

  	let [newDate, setNewDate] = useState("");
  	let [location, setLocation] = useState("");
  	let [remarks, setRemarks] = useState("");
  	let [status, setStatus] = useState("Pending");

  	let [locationError, setLocationError] = useState("");
  	let [remarksError, setRemarksError] = useState("");
  	let [reviewError, setReviewError] = useState("");

  	let [disableBookingBtn, setDisableBookingBtn] = useState(true)
  	let [disableReviewBtn, setDisableReviewBtn] = useState(true)

  	let [displayReviews, setDisplayReviews] = useState([""]);

	useEffect( () => {
		fetchServiceReviews()
	}, []);

	let fetchServiceReviews = () => {
			fetch("http://localhost:8080/services/"+props.serviceId+"/reviews")
		.then(res => res.json())
		.then(data => {
			setDisplayReviews(data);
		});
	}

	let locationChangeHandler = (e) => {
		setLocation(e.target.value)

		if(e.target.value.trim() === "") {
			setLocationError("This field cannot be empty.");
		} else {
			setLocationError("");
		}
	}

	let remarksChangeHandler = (e) => {
		setRemarks(e.target.value)

		if(e.target.value.trim() === "") {
			setRemarksError("This field cannot be empty.");
		} else {
			setRemarksError("");
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


	let checkBookingForm = () => {
		if(newDate!==""
			&&location.trim()!=="" 
			&& remarks.trim()!=="" 
			&& locationError=="" 
			&&remarksError==""
			&&props.isLoggedIn==true) {
			if(disableBookingBtn!==false){
				setDisableBookingBtn(false);
			}
		} else {
			if(disableBookingBtn!==true){
				setDisableBookingBtn(true);
			}
		}
	}

	checkBookingForm();

	let checkReviewForm = () => {
		if(review.trim()!=="" 
			&&props.isLoggedIn==true) {
			if(disableReviewBtn!==false){
				setDisableReviewBtn(false);
			}
		} else {
			if(disableReviewBtn!==true){
				setDisableReviewBtn(true);
			}
		}
	}

	checkReviewForm();

	let submitServiceReview = () => {
		let newReview = {
			review,
			"user":{
				"id": localStorage.getItem("userId"),
				"username": localStorage.getItem("username")
			}
		}

		fetch("http://localhost:8080/services/" + props.serviceId + "/reviews", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newReview)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			alert("review submited")
		});
	}

	let displayServiceReviews = () => {
		if(displayReviews!="") {
			return displayReviews.map( item => 
				<div id="review" className="card mt-3">
				  <div className="card-body">
				    <p className="card-text">{item.review}</p>
				    <small>by:</small>
				    <small>{item.user.username}</small>
				  </div>
				</div>
			)
		}
	}

	let displayReviewForm = () => {
		if(props.isLoggedIn===true) {
			return(
				<form className="text-center">
					<div className="form-group">
						<textarea
							onBlur={reviewChangeHandler}
							onChange={reviewChangeHandler}
							rows="4" cols="50"
							form="usrform"
							className="form-control"
							type="text"
							placeholder="Write your review here"
							autoComplete="false"
						>
						</textarea>
					</div>
					<div>
						<button
						onClick={submitServiceReview}
						disabled={disableReviewBtn}
						className="btn btn-outline-info btn-rounded btn-block waves-effect z-depth-0"
						>
						SUBMIT REVIEW
						</button>	
					</div>
					
				</form>
			)
		} else {
			return(
				<div></div>
			)
		}
	}

	let displayServiceCard = () => {
		return(
			<div className="card">
				<div>
					<img id="itemImage"className="img-responsive" style={{"width":"90%"}} src={"http://localhost:8080/image/"+props.image} alt="item"/>
				</div>
				<div className="card-body">
					<h4 className="card-title">{props.name}</h4>
					<p>{props.description}</p>
					<div className="card-body">
						<h5>SERVICE REVIEWS</h5>
						<div className="card-columns">
							{displayServiceReviews()}
						</div>
						<div className="card-row">
							{displayReviewForm()}
						</div>
					</div>
				</div>
			</div>
		)
	}

	let displayBookingForm = () => {
		return(
			<form id="bookingForm" className="card text-center p-2">
						<h5>Booking Form</h5>
						<div className="form-group mx-auto">
							<p>Date & Time:</p>
							<DatePicker 
								id="datePicker"
								className="form-control"
								selected={newDate}
								onChange={date => setNewDate(date)}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={30}
								timeCaption="time"
								dateFormat="MMMM d, yyyy h:mm aa"
						    />
					    </div>
						<div className="form-group">
							<p>Location:</p>
							<input type="text" className="form-control w-75 mx-auto" onBlur={locationChangeHandler} onChange={locationChangeHandler}/>
							<small className="text-danger text-center">{locationError}</small>
						</div>
						<div className="form-group">
							<p>Remarks:</p>
							<input type="text" className="form-control w-75 mx-auto" onBlur={remarksChangeHandler} onChange={remarksChangeHandler}/>
							<small className="text-danger text-center">{remarksError}</small>
						</div>
						

						<button
						disabled={disableBookingBtn} 
						type="button" 
						className="btn btn-info w-25 mx-auto" 
						data-toggle="modal" 
						data-target="#exampleModalCenter"
						>
							Book
						</button>
						<small>Make sure all the fields are filled up.</small>
					</form>
		)
	}

	let displayConfirmationModal = () => {
		console.log(newDate.toString().slice(4,21))
		return (
			<div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">Booking Details</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body text-left">
							<p>
							Service Name: {props.name}<br/>
							Service Description: {props.description}<br/>
							Service Rate: {props.price}<br/>
							Booking Date & Time: {newDate.toString().slice(4,21)}<br/>
							Location: {location}<br/>
							Remarks: {remarks}
							</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button 
							type="button" 
							className="btn btn-info" 
							onClick={bookRequestClickHandler} 
							data-toggle="modal" 
							data-target="#exampleModalCenter"
							>
							Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

  	let bookRequestClickHandler = () => {
		let newBookRequest = {
			"date":newDate,
			location,
			remarks,
			status,
			"service":{
				"id":props.serviceId,
				"name":props.name,
				"description":props.description,
				"price":props.price,
				"image":props.image
			}
		}

			fetch("http://localhost:8080/users/" + localStorage.getItem("userId") + "/bookingRequest", {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBookRequest)
			})
			.then(res => res.json())
			.then(data => {
				setNewDate("")
				setLocation("")
				setRemarks("")			
			});
	}

	return(
		<div id="servicePage" className="p-2">
			<div className="text-right">
				<button className="btn btn-info m-2" onClick={props.backToService}>
					<i className="fas fa-times"></i>
				</button>
			</div>
			<div className="row">
				<div className="mx-auto col-lg-7">
					{displayServiceCard()}
				</div>
				<div className="mx-auto col-lg-5">
					{displayBookingForm()}
				</div>
				{displayConfirmationModal()}
			</div>
		</div>
	)
	
}

export default ServiceBookingPage;