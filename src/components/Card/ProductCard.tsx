import { Trash } from 'lucide-solid'
import '../../css/ProductCard.css'
import { db, type Category } from '../../database/db'
import { createSignal, onMount } from 'solid-js'

interface Props {
    id: number,
    name: string,
    categoryId: number,
    onDelete: (id: number) => void
}

export default function ProductCard(props: Props) {

    const [category, setCategory] = createSignal<Category>()

    onMount( async () => {
        setCategory(await db.categories.get(props.categoryId))
    })

    return <>
        <div class="card">
            <div style={{
                display: 'flex',
                "flex-direction": 'column',
            }}>
                <h4 style={{
                    margin: 0,
                }}>{props.name}</h4>
                <h6 style={{
                    margin: '2px',
                    opacity: 0.9,
                }}>{category()?.name}</h6>
            </div>
            <button
                onClick={() => props.onDelete(props.id)}
                style={{
                    "margin-left": 'auto',
                    height: '40px',
                    width: '40px',
                    "background-color": 'transparent',
                    "border-style": 'solid',
                    "border-color": 'white',
                    "border-radius": '30px',
                }}
            >
                <Trash color='white' />
            </button>
        </div>
    </>
}