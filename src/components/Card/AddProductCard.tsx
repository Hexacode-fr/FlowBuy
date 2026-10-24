import { createSignal, onMount } from 'solid-js'
import '../../css/CartItemPopUp.css'
import { db, type Category, type Product } from '../../database/db'
import { Minus, Plus } from 'lucide-solid'

interface Props {
    id: number
    onChange: (id: number, quantity: number) => void,
    CartId: number,
}

export default function AddProductCard(props: Props) {
    
    onMount(async () => {
        const existing = await db.cartItems
            .filter(item => item.cartId === props.CartId && item.productId === props.id)
            .first()
        if (existing) {
            setQuantity(existing.quantity)
        }
    })

    const [quantity, setQuantity] = createSignal(0)

    const [product, setProduct] = createSignal<Product>()
    const [category, setCategory] = createSignal<Category>()

    onMount(async () => {
        const p = await db.products.get(props.id)
        if (!p) return
        setProduct(p)
        const c = await db.categories.get(p.categoryId)
        setCategory(c)
    })

    return <>
        <div id="Card">
            <div style={{
                display: 'flex',
                "flex-direction": 'column',
                "align-items": 'flex-start',
                gap: 0
            }}>
                <h3 style={{
                    margin: 0
                }}>{product()?.name}</h3>
                <p style={{
                    opacity: 0.9,
                    margin: 0
                }}>{category()?.name}</p>
            </div>
            <div style={{
                display: 'flex',
                "flex-direction": 'row',
                "align-items": 'center',
                "margin-left": 'auto',
                gap: '5px'
            }}>
                <button
                    class='roundButton'
                    onClick={() => {
                        if (quantity() > 0) {
                            setQuantity(quantity() - 1)
                            props.onChange(props.id, quantity())
                        }
                    }}
                >
                    <Minus color='white' />
                </button>
                <p style={{
                    "font-size": '12px'
                }}>{quantity()}{category()?.unit}</p>
                <button
                    class='roundButton'
                    onClick={() => {
                        setQuantity(quantity() + 1)
                        props.onChange(props.id, quantity())
                    }}
                >
                    <Plus color='white' />
                </button>
            </div>
        </div>
    </>
}