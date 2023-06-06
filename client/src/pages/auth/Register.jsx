import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "./auth.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../../components/toast/notifyToast";

const Register = () => {
	const { registerUser } = useContext(AuthContext);
	const [registerForm, setRegisterForm] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const onChangeForm = (e) => {
		setRegisterForm((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const changeShowPass = () => {
		setShowPass(!showPass);
	};

	const changeShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);
	const { username, email, password, confirmPassword } = registerForm;
	const register = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			notifyToast("Password not match!", "error");
			return;
		}
		try {
			const res = await registerUser(registerForm);
			if (res.success) {
				notifyToast(res.message, "success");
				setRegisterForm(() => {
					return { username: "", email: "", password: "", confirmPassword: "" };
				});
			} else notifyToast(res.message, "error");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Navbar />
			<ToastContainer style={{ width: "400px" }} />
			<form className="login" onSubmit={(e) => register(e)}>
				<h2>Register new account</h2>
				<div className="lContainer">
					<input type="text" placeholder="Username" name="username" className="lInput" value={username} onChange={(e) => onChangeForm(e)} />
					<input type="email" placeholder="Email" name="email" className="lInput" value={email} onChange={(e) => onChangeForm(e)} />
					<div className="password">
						<input type={showPass ? "text" : "password"} placeholder="Password" name="password" className="lInput" value={password} onChange={(e) => onChangeForm(e)} />
						{showPass ? (
							<FontAwesomeIcon icon={faEyeSlash} className="icon-show-pass" onClick={() => changeShowPass()} />
						) : (
							<FontAwesomeIcon icon={faEye} className="icon-show-pass" onClick={() => changeShowPass()} />
						)}
					</div>
					<div className="re-password">
						<input
							type={showConfirmPass ? "text" : "password"}
							placeholder="ConfirmPassword"
							name="confirmPassword"
							className="lInput"
							value={confirmPassword}
							onChange={(e) => onChangeForm(e)}
						/>
						{showConfirmPass ? (
							<FontAwesomeIcon icon={faEyeSlash} className="icon-show-pass" onClick={() => changeShowConfirmPass()} />
						) : (
							<FontAwesomeIcon icon={faEye} className="icon-show-pass" onClick={() => changeShowConfirmPass()} />
						)}
					</div>
					<button className="lButton">Register</button>
				</div>
				<span className="optiopns">or use none of these options</span>
				<span className="policy">
					By signing in or creating an account, you agree with our{" "}
					<a href="#" style={{ textDecoration: "none" }}>
						Terms Conditions{" "}
					</a>{" "}
					and{" "}
					<a href="#" style={{ textDecoration: "none" }}>
						Privacy Statement
					</a>
				</span>
			</form>
		</>
	);
};

export default Register;
