import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";
import SearchContextProvider from "./contexts/SearchContextProvider";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
	return (
		<AuthContextProvider>
			<SearchContextProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/hotels" element={<List />} />
						<Route path="/hotels/:id" element={<Hotel />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</Router>
			</SearchContextProvider>
		</AuthContextProvider>
	);
}

export default App;
