import "./navbar.css";

function Navbar() {
	return (
		<div className="navbar-container">
			<div className="navbar">
				<h2 className="logo">Booking.com</h2>
				<div className="navbar-login">
					<button>Register</button>
					<button>Sign in</button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
