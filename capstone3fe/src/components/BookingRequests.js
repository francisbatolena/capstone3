import React, { useState, useEffect } from 'react';
import BookingRequest from './BookingRequest';

function BookingRequests(props) {

	let [bookingRequests, setBookingRequests] = useState([]);

	useEffect( () => {
		fetchBookingRequests()
	}, []);

	let fetchBookingRequests = () => {
			fetch("http://localhost:8080/bookingRequest")
		.then(res => res.json())
		.then(data => {
			let updatedData = data;
			if((localStorage.getItem("username"))!="admin") {
				updatedData = data.filter( i => {
					return i.user.username == localStorage.getItem("username")
				})
			}
			setBookingRequests(updatedData);	
		});

	}

	let displayBookingRequest = () => {
		return bookingRequests.map( item => 
			<BookingRequest 
				key={item.id}
				bookingRequestId={item.id}
				serviceName={item.service.name}
				price={item.service.price}
				username={item.user.username}
				user={item.user}
				service={item.service}
				date={item.date}
				location={item.location}
				remarks={item.remarks}
				status={item.status}
				bookingRequests={bookingRequests}
				fetchBookingRequests={fetchBookingRequests}
			/>
		)
	}

	if(localStorage.getItem("username")==="admin") {
		return(
			<div>
				<h3 className="my-3">Booking Requests</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Booking ID</th>
							<th>Service Type</th>
							<th>Customer Name</th>
							<th>Requested Date & Time</th>
							<th>Location</th>
							<th>Remarks</th>
							<th>Status</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{displayBookingRequest()}
					</tbody>
				</table>
			</div>
		)
	} else {
		return(
			<div>
				<h3 className="my-3">Booking Requests</h3>
				{displayBookingRequest()}
			</div>
		)
	}
	
}

export default BookingRequests;

