import React, { useState } from 'react'

let UploadImage = () => {
	let [file, setFile] = useState(""); 
	let [imagePreviewUrl, setimagePreviewUrl] = useState("");

	let inputChangeHandler = (e) => {
		e.preventDefault();

		   let reader = new FileReader();
		   let file = e.target.files[0];

		   reader.onloadend = () => {
		     setFile(file);
		     setimagePreviewUrl(reader.result);
		   }

		   reader.readAsDataURL(file)
	}

	let submitClickHandler = (e) => {
		const formData = new FormData()
		formData.append("file", file)
		formData.append("imagePreviewUrl", imagePreviewUrl)

		fetch("http://localhost:8080/vehicles/upload", {
			method: 'post',
			body: formData
		})
		.then(res => res.text())
		.then(data => {console.log(data)})
	}

	return(
		<form encType="multipart/form-data">
			<input onChange={inputChangeHandler} type="file" />
			<button type="button" onClick={submitClickHandler}>Submit</button>
		</form>
	);
}

export default UploadImage;