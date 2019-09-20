import React, { useState, useEffect } from 'react';
import Service from './Service';

function Services(props) {

	let [services, setServices] = useState([]);

	useEffect( () => {
		fetchServices()
	}, []);

	let fetchServices = () => {
			fetch("http://localhost:8080/services")
		.then(res => res.json())
		.then(data => {
			setServices(data);
		});

	}

	let displayServices = () => {
		return services.map( item => 
			<Service 
				key={item.id}
				serviceId={item.id}
				name={item.name}
				description={item.description}
				price={item.price}
				image={item.image}
				fetchServices={fetchServices}
				isLoggedIn={props.isLoggedIn}
			/>
		)
	}

	return(
		<div className="serviceBody">
			{displayServices()}
		</div>
	);

}

export default Services;