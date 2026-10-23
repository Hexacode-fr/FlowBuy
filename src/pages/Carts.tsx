import { Plus } from "lucide-solid";
import { Portal } from "solid-js/web";
import CartPopUp from "../components/popup/CartPopUp";
import { db } from "../database/db";
import { liveQuery } from "dexie";
import { For, from } from "solid-js";
import CartCard from "../components/Card/CartCard";

export default function Carts() {

    let CreateCartDialogRef!: HTMLDialogElement
    const carts = from(liveQuery(() => db.carts.toArray()))

    const CreateCart = async (value: string) => {
        CreateCartDialogRef.close()
        db.carts.add({
            name: value,
            createdAt: new Date().toLocaleDateString("fr-FR")
        })
    }
    const DeleteCart = (id: number) => {
        db.carts.delete(id)
    }

    return <>
        <div class="root">
            <Portal mount={document.getElementById("actionbar")!}>
                <div style={{
                    display: "flex",
                    "flex-direction": 'row',
                    "align-items": 'center',
                        width: '100%'
            }}>
                <h1>Mes paniers</h1>
                <button
                    onClick={() => CreateCartDialogRef.showModal()}
                    style={{
                        "margin-left": 'auto',
                        width: '40px',
                        height: '40px',
                        padding: '0',
                        "background-color": 'rgb(0, 3, 197)',
                        "border-style": 'solid',
                        "border-width": '2px',
                        "border-color": 'white',
                        "border-radius": '10px',
                        display: 'flex',
                        "justify-content": 'center',
                        "align-items": 'center'
                    }}
                    >
                        <Plus color="white" />
                    </button>
                </div>
            </Portal>
            <For each={carts()}>
               {(c) => (
                    <CartCard
                        name={c.name}
                        id={c.id!}
                        createdAt={c.createdAt}
                        onDelete={DeleteCart}
                    />
               )} 
            </For>
        </div>
        <CartPopUp
            ref={CreateCartDialogRef}
            onSave={CreateCart}
            onClose={() => CreateCartDialogRef.close()}
        />
    </>
}
