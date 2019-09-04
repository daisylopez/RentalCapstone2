import React, {useState} from 'react'

function LoginForm(props) {
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");

	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)
	}

	let submitClickHandler = () => {
		let user = {
			username,
			password
		}
		fetch("http://localhost:8080/users/login", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json' 
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(data => {
			localStorage.setItem("username",username);
			props.setIsLoggedIn(true);
		})
		.catch(e => {
			alert("Login failed")
			console.log(e)
		});
	}


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
			<button 
				type="button"
				onClick={submitClickHandler}
			>Log In</button>
		</form>
	);
}

export default LoginForm;