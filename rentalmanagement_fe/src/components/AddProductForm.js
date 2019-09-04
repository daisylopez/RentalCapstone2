import React, { useState, useEffect } from 'react';

let AddProductForm = () => {
	let [categories, setCategories] = useState([]);

	let [name, setName] = useState("")
	let [price, setPrice] = useState("")
	let [categoryId, setCategoryId] = useState("")
	let [file, setFile] = useState("");

	useEffect( () => {
		fetch("http://localhost:8080/categories/")
		.then( res => res.json())
		.then( data => {
			setCategories(data);
		})
	}, []);

	let displayOptions = () => 
		categories.map( cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)

	let nameChangeHandler = (e) => {
		setName(e.target.value)
	}

	let priceChangeHandler = (e) => {
		setPrice(e.target.value)
	}

	let categoryChangeHandler = (e) => {
		setCategoryId(e.target.value)
	}

	let submitClickHandler = () => {
		let newProduct = {
			name,
			price
		}

		fetch("http://localhost:8080/products/"+categoryId, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newProduct)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			let formData = new FormData();
			formData.append("file", file);

			fetch("http://localhost:8080/products/upload/"+data.id, {
				method: 'post',
				body: formData
			})			
		});
	}

	let imageChangeHandler = (e) => {
		setFile(e.target.files[0]);
	}

	return(
		<form encType="multipart/form-data">
			<div className="form-group">
				Name: <input onChange={nameChangeHandler} type="text" className="form-control" />
			</div>
			<div className="form-group">
				Price: <input onChange={priceChangeHandler} type="number" className="form-control"/>
			</div>
			<div className="form-group">
				Category:
				<select className="form-control" onChange={categoryChangeHandler}>
					{displayOptions()}
				</select>
			</div>
			Image: <input onChange={imageChangeHandler} type="file"/>
			<button type="button" onClick={submitClickHandler} className="btn btn-success">Add</button>
		</form>
	);
}

export default AddProductForm;