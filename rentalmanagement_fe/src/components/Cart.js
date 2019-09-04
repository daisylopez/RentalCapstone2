import React from 'react';

import CartItem from './CartItem';

let Cart = () => {
	let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
	let displayCartItems = () =>
		cart.map( product => 
			<CartItem key={product.id} product={product} />
		)
	return(
		<div>
			<h1>Cart</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th><th>Price</th><th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{displayCartItems()}
				</tbody>
			</table>
		</div>
	);
}

export default Cart;