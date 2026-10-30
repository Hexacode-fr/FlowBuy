import '../../css/CardItemCard.css'
import { db } from '../../database/db'

interface Props {
    id: number
    name: string,
    quantity: number,
    unit: string,
    checked: boolean,
}

export default function CartItem(props: Props) {
    return <>
        <div id='card' style={{
            "text-decoration": props.checked ? 'line-through' : 'none',
            color: props.checked ? 'red' : 'white',
        }}>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={(e) => db.cartItems.update(props.id, { checked: e.currentTarget.checked })}
            />
            <div>
                <h2 style={{ margin: 0 }}>{props.name}</h2>
            </div>
            <p style={{ "margin-left": 'auto' }}>{props.quantity} {props.unit}</p>
        </div>
    </>
}