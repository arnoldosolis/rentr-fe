import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password/:token" element={<ForgotPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
