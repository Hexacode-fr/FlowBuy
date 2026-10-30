import { db } from "../../database/db"

interface Props {
    id: number
    ref: HTMLDialogElement
    onClose: () => void
}

export default function DeleteProductPopUp(props: Props) {

    const onDelete = async () => {
        await db.transaction('rw', db.products, db.cartItems, async () => {
            await db.cartItems.where("productId").equals(props.id).delete()
            await db.products.delete(props.id)
        })
        props.onClose()
    }

    return <dialog class="popup" ref={props.ref}>
        <h2>Voulez-vous vraiment supprimer ce produit ?</h2> 
        <div style={{
                display: 'flex',
                margin: '20px',
            }}>
                <button
                    class="form"
                    onClick={props.onClose}
                >
                    Annuler
                </button>
                <button
                    class="form other"
                    onClick={onDelete}
                >
                    Supprimer
                </button>
        </div>
    </dialog>
}