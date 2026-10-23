import { useNavigate, useParams } from "@solidjs/router"
import { db } from "../database/db"
import { Show } from "solid-js"
import { Portal } from "solid-js/web"
import { useLiveQuery } from "../hooks/useLiveQuery"
import { ChevronLeft, Plus } from 'lucide-solid';
import CartItemPopUp from "../components/popup/CartItemPopUp"

export default function CartDetails() {
    const params = useParams()
    const cart = useLiveQuery(() => db.carts.get(Number(params.id)))
    const navigate = useNavigate()
    let CartItemPopUpRef!: HTMLDialogElement
    const AddCartItem = () => {

    }
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
                                "margin-left": 'auto'
                            }}
                        >
                            <Plus color="white" />
                        </button>
                    </div>
                </Portal>
                <CartItemPopUp
                    ref={CartItemPopUpRef}
                    onSave={() => {}}
                    onClose={() => {}}
                />
            </Show>
        </div>
    )
}