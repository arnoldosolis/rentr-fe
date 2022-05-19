import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/home">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
