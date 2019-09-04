import React, { useState, useEffect } from 'react'
import Product from './Product'

function Products() {
	let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; 
	let [products, setProducts] = useState([]);

	useEffect( () => {
		fetch("http://localhost:8080/products/")
		.then(res => res.json())
		.then(data => {
			setProducts(data);
		});
	}, []);

	let addToCart = (id, quantity) => {
		let product = products.filter( product => product.id === id)
		product[0].quantity = quantity;
		let item = cart.filter( item => item.id === id)
		if(!item[0]) {
			cart.push(product[0]);
		} else {
			cart = cart.map( item => {
				if(item.id===id) {
					item.quantity += quantity
				}
				return item;
			})
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		alert(quantity+" items added to cart");
	}

	let displayProducts = () => {
		return products.map( product => 
			<Product 
				key={product.id}
				id={product.id}
				name={product.name}
				price={product.price}
				image={product.image}
				quantity={cart[product.id] ? cart[product.id] : 1}
				addToCart={addToCart}
			/>
		)
	}

	return(
		<div className="card-columns">
			{displayProducts()}
		</div>
	);
}

export default Products;