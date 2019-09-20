import React from 'react';
import BookingRequests from './BookingRequests';
import AddServiceForm from './AddServiceForm';

function AdminPanel() {
	if(localStorage.getItem("username")==="admin") {
		return(
			<div>
				<BookingRequests/>
				<AddServiceForm/>				
			</div>
		);
	} else {
		return(
			<div>
				<BookingRequests/>
			</div>
		)
	}

}

export default AdminPanel;