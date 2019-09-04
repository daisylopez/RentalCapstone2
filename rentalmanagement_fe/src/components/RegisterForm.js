import React, {useState} from 'react'

function RegisterForm() {
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [confirmpw, setConfirmpw] = useState("");

	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)
	}	

	let confirmpwChangeHandler = (e) => {
		setConfirmpw(e.target.value)
	}

	let submitClickHandler = () => {
		let user = {
			username: username,
			password: password
		}
		// implement front end validation here
		fetch("http://localhost:8080/users/register", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		});
	}

	console.log(username, password, confirmpw)
	return(
		<form>
			<div className="form-group">
				<input
					type="text"
					placeholder="username"
					value={username}
					autoComplete="false"
					onChange={usernameChangeHandler}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					placeholder="password"
					value={password}
					autoComplete="false"
					onChange={passwordChangeHandler}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					placeholder="confirm password"
					value={confirmpw}
					autoComplete="false"
					onChange={confirmpwChangeHandler}
				/>
			</div>
			<button 
				type="button"
				onClick={submitClickHandler}
			>Register</button>
		</form>
	);
}

export default RegisterForm