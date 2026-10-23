import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";
import Home from "./pages/Home";
import "./css/index.css";
import Carts from "./pages/Carts";
import ProductList from "./pages/ProductList";
import CartDetails from "./pages/CartDetails";

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/carts" component={Carts} />
      <Route path="/products" component={ProductList} />
      <Route path="/carts/:id" component={CartDetails} />
    </Router>
  ),
  document.getElementById("root")!
);
