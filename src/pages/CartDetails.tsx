import { useNavigate, useParams } from "@solidjs/router"
import { db } from "../database/db"
import { For, Show } from "solid-js"
import { Portal } from "solid-js/web"
import { useLiveQuery } from "../hooks/useLiveQuery"
import { ChevronLeft, Plus } from 'lucide-solid';
import CartItemPopUp from "../components/popup/CartItemPopUp"
import CartItemCard from "../components/Card/CartItemCard"


export default function CartDetails() {
    const params = useParams()
    const cart = useLiveQuery(() => db.carts.get(Number(params.id)))
    const items = useLiveQuery(() => db.cartItems.where('cartId').equals(Number(params.id)).toArray())
    const navigate = useNavigate()
    let CartItemPopUpRef!: HTMLDialogElement
    return (
        <div class="root">
            <Show when={cart()} fallback={<p>Chargement...</p>}>        
                <Portal mount={document.getElementById("actionbar")!}>
                    <div style={{
                        display: 'flex',
                        "align-items": 'center',
                        gap: "8px"
                    }}>
                        <button
                            onClick={() => navigate(-1)}
                            class="roundButton"
                            
                        >
                            <ChevronLeft color="white" />
                        </button>
                        <h1>{cart()!.name}</h1>
                        <button
                            onClick={() => {
                                CartItemPopUpRef.showModal()
                            }}
                            class="roundButton"
                            style={{
                                "margin-left": 'auto',
                                width: '100px',
                                color: 'white',
                                "font-family": 'Poppins'
                            }}
                        >
                            <p style={{
                                "font-family": 'Poppins'
                            }}>Modifier</p>
                        </button>
                    </div>
                </Portal>
                <For each={items()}>
                    {(i) => (
                        <CartItemCard
                            id={i.productId}
                            name={i.name}
                            quantity={i.quantity}
                            unit={i.unit}
                        />
                    )}
                </For>
                
                <CartItemPopUp
                    CartId={Number(params.id)}
                    ref={CartItemPopUpRef}
                    onClose={() => CartItemPopUpRef.close()}
                />
            </Show>
        </div>
    )
}