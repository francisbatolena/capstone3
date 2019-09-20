import React, { useState } from 'react';
import ServiceBookingPage from './ServiceBookingPage';

function Service(props) {

	let [name, setName] = useState(props.name)
	let [description, setDescription] = useState(props.description)
	let [price, setPrice] = useState(props.price)

	let [displayPage, setDisplayPage] = useState(true);

	let backToService = () => {
		setDisplayPage(true);
	}

	let showBookingPage = () => {
		setDisplayPage(false);
	}

	let nameChangeHandler = (e) => {
		console.log(e)
		setName(e.target.value)
	}

	let descriptionChangeHandler = (e) => {
		setDescription(e.target.value)
	}

	let priceChangeHandler = (e) => {
		setPrice(e.target.value)
	}

	let editDescription = (e) => {
		alert()
	}


	let editClickHandler = () => {

		let editedService = {
	        "id": props.serviceId,
	        name,
	        description,
	        price,
	        "image":props.image
		}

		fetch("http://localhost:8080/services", {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedService)
		})
		.then(res => res)
		.then(data => {
			props.fetchServices();
		});
	}

	function displayService() {
		
			if(localStorage.getItem("username")==="admin"){
				return(
					<div className="card card-column m-2">
						<div id="serviceCard" className="card">
							<div className="card-body" 
							style={{  
							  backgroundImage: "url(" + "http://localhost:8080/image/" + props.image + ")",
							  backgroundPosition: 'center',
							  backgroundSize: 'cover',
							  backgroundRepeat: 'no-repeat'
							}}
							>
								<p>
									Edit Name: <input value={name}  onChange={nameChangeHandler} onBlur={nameChangeHandler} type="text" className="form-control w-25 p-3 mx-auto text-center" />
									Edit Description: <input value={description} onChange={descriptionChangeHandler} onBlur={descriptionChangeHandler} type="text" className="form-control w-25 p-3 mx-auto text-center" />
									Edit Rate: <input value={price} onChange={priceChangeHandler} onBlur={priceChangeHandler} type="number" className="form-control w-25 p-3 mx-auto text-center" />
								</p>
								<button type="button" className="btn btn-secondary" onClick={editClickHandler}>Save Changes</button>
							</div>
						</div>
					</div>
				);				
			} else if(displayPage===true){
				return(
					<div className="card card-column m-2">
						<div id="serviceCard" className="card">
							<div className="card-body" 
							style={{  
							  backgroundImage: "url(" + "http://localhost:8080/image/" + props.image + ")",
							  backgroundPosition: 'center',
							  backgroundSize: 'cover',
							  backgroundRepeat: 'no-repeat'
							}}
							>
								<h2>{props.name}</h2>
								<p>
									Description: {props.description} <br/>
									Rate: Php {props.price} /hour<br/>
								</p>
								<button type="button" className="btn btn-info" onClick={showBookingPage}>Book Service</button>
							</div>
						</div>
					</div>
				);				
			} else {
				return(<ServiceBookingPage
					backToService={backToService}
					key={props.serviceId}
					serviceId={props.serviceId}
					name={props.name}
					description={props.description}
					price={props.price}
					image={props.image}
					fetchServices={props.fetchServices}
					isLoggedIn={props.isLoggedIn}
				/>)
			}
	}

	return(
		displayService()
	);

}

export default Service;