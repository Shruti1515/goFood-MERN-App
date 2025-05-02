import './App.css';
import Home from './screens/Home';
import Login from './screens/login';
import { Signup } from './screens/Signup.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CardProvider } from './components/ContextReducer.js';
import { MyOrder } from './screens/MyOrder.js';

function App() {
  return (

    <CardProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/CreateUser" element={<Signup/>} />
        <Route path="/myOrder" element={<MyOrder/>} />


      </Routes>
    </Router>
    </CardProvider>
  );
}

export default App;
