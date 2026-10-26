import { For } from 'solid-js'
import '../../css/CartItemPopUp.css'
import { db } from '../../database/db'
import AddProductCard from '../Card/AddProductCard'
import { useLiveQuery } from '../../hooks/useLiveQuery'
interface Props {
    CartId: number,
    ref: HTMLDialogElement,
    onClose: () => void,
}

export default function CartItemPopUp(props: Props) {

    const products = useLiveQuery(() => db.products.toArray())

    const changeItem = async (productId: number, quantity: number) => {
        const product = await db.products.get(productId)
        if (!product) return

        const category = await db.categories.get(product.categoryId!)
        const unit = category?.unit ?? ''

        const existing = await db.cartItems
            .filter(item => item.cartId === props.CartId && item.productId === productId)
            .first()

        if (existing?.id !== undefined) {
            if (quantity === 0) {
                await db.cartItems.delete(existing.id)
            } else {
                await db.cartItems.update(existing.id, { quantity, unit })
            }
        } else if (quantity > 0) {
            await db.cartItems.add({
                name: product.name,
                cartId: props.CartId,
                productId,
                quantity,
                unit,
                checked: false,
            })
        }
    }

    return <>
        <dialog ref={props.ref} class="popup">
            <h2>Modifier votre panier</h2>
            <div id='scroll'>
                <For each={products()}>
                    {(p) => (
                        <AddProductCard
                            id={p.id!}
                            onChange={changeItem}
                            CartId={props.CartId}
                        />
                    )}
                </For>
            </div>
            <div style={{
                    display: 'flex',
                    margin: '0px',
                    gap: '50px'
                }}>
                    
                    <button
                        class="form other"
                        onClick={props.onClose}
                    >
                        OK
                    </button>
                </div>       
        </dialog>
    </>
}