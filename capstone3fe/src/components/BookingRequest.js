import React, { useState } from 'react';

function BookingRequest(props) {

	let deleteClickHandler = () => {

		fetch("http://localhost:8080/bookingRequest/"+ props.bookingRequestId, {
			method: 'delete'
		})
		.then(res => res)
		.then(data => {
			props.fetchBookingRequests();
		});
	}

	let confirmClickHandler = () => {

		let confirmStatus = {
			"id":props.bookingRequestId,
			"date":props.date,
			"location":props.location,
			"remarks":props.remarks,
			"status":"Confirmed",
			"user": props.user,
			"service":props.service
		}

		fetch("http://localhost:8080/bookingRequest", {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(confirmStatus)
		})
		.then(res => res)
		.then(data => {
			props.fetchBookingRequests();
		});
	}

	if(localStorage.getItem("username")==="admin") {
		return(
			<tr>
				<td>{props.bookingRequestId}</td>
				<td>{props.serviceName}</td>
				<td>{props.username}</td>
				<td>{props.date}</td>
				<td>{props.location}</td>
				<td>{props.remarks}</td>
				<td>{props.status}</td>
				<td><button className="btn btn-primary" onClick={confirmClickHandler}>Confirm</button></td>
				<td><button className="btn btn-danger" onClick={deleteClickHandler}>Remove</button></td>	
			</tr>
		);
	} else {
		return(
			<div id="statusCard" className="card m-3 col-lg-5 mx-auto">
				<div className="card-header bg-info my-3">
				<h3 className="py-2">{props.serviceName}</h3>
				</div>
				<div className="card-body p-3 ">
					<h5 className="card-title">Request ID No.: {props.bookingRequestId}</h5>
					<p className="card-text">Username: {props.username}</p>
					<p className="card-text">Date Booked: {props.date}</p>
					<p className="card-text">Location: {props.location}</p>
					<p className="card-text">Remarks: {props.remarks}</p>
					<h5 className="card-text bg-info p-2 w-50 mx-auto">Status: {props.status}</h5>
					<button className="btn btn-danger" onClick={deleteClickHandler}>Remove</button>
				</div>
			</div>
		)
	}

}

export default BookingRequest;