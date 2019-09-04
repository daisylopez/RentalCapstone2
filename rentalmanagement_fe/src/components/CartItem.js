import React from 'react';

let CartItem = (props) => {
	return(
		<tr>
			<td>{props.product.name}</td>
			<td>{props.product.price}</td>
			<td>{props.product.quantity}</td>
		</tr>
	);
}

export default CartItem;