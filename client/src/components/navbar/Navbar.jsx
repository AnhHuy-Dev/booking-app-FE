import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleQuestion, faUser, faHeart, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
	const { authState, logOutUser } = useContext(AuthContext);
	const { user } = authState;
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const logout = async () => {
		await logOutUser();
		navigate("/login");
	};

	return (
		<div className="navbar-container">
			<div className="navbar">
				<Link to="/" className="logo" style={{ textDecoration: "none" }}>
					<h3>Booking.com</h3>
				</Link>
				<div className="navbar-login">
					<Tippy content="Customer Service Help" delay={100}>
						<FontAwesomeIcon icon={faCircleQuestion} className="question" fontSize="24px" />
					</Tippy>
					<Tippy content="View your notifications" delay={100}>
						<FontAwesomeIcon icon={faBell} className="bell" fontSize="24px" />
					</Tippy>

					{user ? (
						<div className="dropdown">
							<span className="username" onClick={() => setOpen(!open)}>
								{user.username}
							</span>
							{open && (
								<ul className="list-login">
									<li className="item-login">
										<FontAwesomeIcon icon={faUser} className="icon-login" />
										Manage account
									</li>
									<li className="item-login">
										<FontAwesomeIcon icon={faCreditCard} className="icon-login" />
										Rewards & Wallets
									</li>
									<li className="item-login">
										<FontAwesomeIcon icon={faHeart} className="icon-login" />
										Saved
									</li>
									<li className="item-login" onClick={() => logout()}>
										<FontAwesomeIcon icon={faRightFromBracket} className="icon-login" />
										Log out
									</li>
								</ul>
							)}
						</div>
					) : (
						<>
							<Link to="/register">
								<button>Register</button>
							</Link>
							<Link to="/login">
								<button>Sign in</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
