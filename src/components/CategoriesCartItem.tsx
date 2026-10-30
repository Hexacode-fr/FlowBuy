import { For } from "solid-js"
import { db } from "../database/db"
import { useLiveQuery } from "../hooks/useLiveQuery"
import CartItemCard from "./Card/CartItemCard"

interface Props {
    cartId: number
    categoryId: number
}

export default function CategoriesCartItem(props: Props) {

    const category = useLiveQuery(() => db.categories.get(props.categoryId))
    const cartItems = useLiveQuery(() =>
        db.cartItems
            .where("cartId").equals(props.cartId)
            .and(item => item.categoryId === props.categoryId)
            .toArray()
    )

    return <>
        <div style={{
            display: 'flex',
            "flex-direction": 'column',
            "justify-content": 'flex-start',
            width: '100%',
            gap: '10px'
        }}>
            <h3>{category()?.name}:</h3>
            <For each={cartItems()}>
                {(c) => (
                    <CartItemCard
                        id={c.id!}
                        name={c.name}
                        quantity={c.quantity}
                        unit={c.unit}
                        checked={c.checked}
                    />
                )}
            </For>
        </div>
    </>
}