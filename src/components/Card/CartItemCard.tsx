import { createSignal, onMount } from 'solid-js'
import '../../css/CardItemCard.css'
import { db, type Category } from '../../database/db'

interface Props {
    id: number
    name: string,
    quantity: number,
    unit: string,
}

export default function CartItem(props: Props) {

    const [category, setCategory] = createSignal<Category>()
    const [checked, setChecked] = createSignal(false)

    onMount(async () => {
        const product = await db.products.get(props.id)
        if (product) {
            setCategory(await db.categories.get(product.categoryId))
        }
    })

    return <>
        <div id='card' style={{
                "text-decoration": checked() ? 'line-through' : 'none',
                color: checked() ? 'red' : 'white'
        }}>
            <input
                type="checkbox"
                checked={checked()}
                onChange={(e) => setChecked(e.currentTarget.checked)}
            />
            <div>
                <h2 style={{
                    margin: 0
                }}>{props.name}</h2>
                <p style={{
                    margin: 0,
                    "font-size": '13px',
                    opacity: 0.9
                }}>{category()?.name}</p>
            </div>
            <p style={{
                "margin-left": 'auto'
            }}>{props.quantity} {props.unit}</p>
        </div>
    </>
}