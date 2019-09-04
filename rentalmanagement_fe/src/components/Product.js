import React, { useState } from 'react';

function Product(props) {
	let [quantity, setQuantity] = useState(props.quantity)

	let atcClickHandler = () => {
		props.addToCart(props.id, quantity*1);
		setQuantity(1);
	}	

	return(
		<div className="card text-center">
		  <div className="p5">
		  	<img className="card-img-top" style={{"width":"75%"}} src={"http://localhost:8080/images/"+props.image} alt="product"/>
		  </div>
		  <div className="card-body">
		    <h4 className="card-title">{props.name}</h4>
		    <p className="card-text">
		    	Php {props.price}<br/>
		    	Quantity: 
		    	<input 
		    		type="number" 
		    		max="1" 
		    		value={quantity}
		    		onChange={e => setQuantity(e.target.value)} 
		    	/><br/>
				<button onClick={atcClickHandler} className="btn btn-success">Add To Cart</button>
		    </p>
		  </div>
		</div>
	);
}

export default Product;