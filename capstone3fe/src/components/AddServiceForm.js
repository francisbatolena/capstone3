import React, { useState } from 'react';

let AddServiceForm = () => {

	let [name, setName] = useState("")
	let [description, setDescription] = useState("")
	let [price, setPrice] = useState("")
	let [file, setFile] = useState("");

	let [nameError, setNameError] = useState("");
	let [descriptionError, setDescriptionError] = useState("");
	let [priceError, setPriceError] = useState("");

	let [addBtnDisabled, setAddBtnDisabled] = useState(true);

	let nameChangeHandler = (e) => {
		setName(e.target.value)

		if(e.target.value.trim() === "") {
			setNameError("This field cannot be empty.");
		} else {
			setNameError("");
		}
	}

	let descriptionChangeHandler = (e) => {
		setDescription(e.target.value)

		if(e.target.value.trim() === "") {
			setDescriptionError("This field cannot be empty.");
		} else {
			setDescriptionError("");
		}
	}

	let priceChangeHandler = (e) => {
		setPrice(e.target.value)

		if(e.target.value.trim() === "") {
			setPriceError("This field cannot be empty.");
		} else {
			setPriceError("");
		}
	}

	checkAddForm();

	function checkAddForm() {
		if(name.trim()!=="" 
			&& description.trim()!=="" 
			&& price.trim()!=="" 
			&&(nameError==""&&descriptionError==""
				&&priceError=="")) {
			if(addBtnDisabled!==false){
				setAddBtnDisabled(false);
			}
		} else {
			if(addBtnDisabled!==true){
				setAddBtnDisabled(true);
			}
		}
	}

	let submitClickHandler = () => {
		alert("New Service added.")
		let newService = {
			name,
			description,
			price
		}

		fetch("http://localhost:8080/services/", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newService)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			let formData = new FormData();
			formData.append("file", file);

			fetch("http://localhost:8080/upload/"+data.id, {
				method: 'post',
				body: formData
			})			
		});
	}

	let imageChangeHandler = (e) => {
		setFile(e.target.files[0]);
	}

	return(
		<form id="addItemForm" className="card col-md-5 col-xs-10  p-5 mt-5" encType="multipart/form-data">
			<div className="form-group">
				Service Name: <input onChange={nameChangeHandler} onBlur={nameChangeHandler} type="text" className="form-control" />
				<small className="text-danger text-center">{nameError}</small>
			</div>
			<div className="form-group">
				Description: <input onChange={descriptionChangeHandler} onBlur={descriptionChangeHandler} type="text" className="form-control" />
				<small className="text-danger text-center">{descriptionError}</small>
			</div>
			<div className="form-group">
				Price: <input onChange={priceChangeHandler} onBlur={priceChangeHandler} type="number" className="form-control"/>
				<small className="text-danger text-center">{priceError}</small>
			</div>
			Image: <input onChange={imageChangeHandler} type="file"/>
			<button type="button" onClick={submitClickHandler} disabled={addBtnDisabled} className="btn btn-info my-3">Add</button>
		</form>
	);
}

export default AddServiceForm;