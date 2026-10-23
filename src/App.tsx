import { Home, ShoppingCart, Apple } from "lucide-solid";
import { onMount, Show, type ParentProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import MenuCard from "./components/MenuCard";
import { addDefaultCategory } from "./database/db";

export default function App(props: ParentProps) {
  const location = useLocation();

  const hiddenOn = ["/carts/"];
  const hideNav = () => hiddenOn.some((p) => location.pathname.startsWith(p));

  onMount(async () => {
    await addDefaultCategory();
  });

  return (
    <div class="app">
      <header class="actionbar" id="actionbar" />

      <main class="content">{props.children}</main>

      <Show when={!hideNav()}>
        <nav class="bottom-nav">
          <MenuCard Icon={Home} path="/" label="Accueil" />
          <MenuCard Icon={ShoppingCart} path="/carts" label="Paniers" />
          <MenuCard Icon={Apple} path="/products" label="Produits" />
        </nav>
      </Show>
    </div>
  );
}