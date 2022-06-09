import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import AppNavbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Wishlist } from "./pages/Wishlist/Wishlist";

function App() {
  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <div className="container-fluid">
          <AppNavbar />
        </div>

        <div className="content-container container-fluid mt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
