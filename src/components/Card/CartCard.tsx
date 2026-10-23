import { useNavigate } from "@solidjs/router";
import { Trash } from "lucide-solid";

interface Props {
    id: number,
    name: string,
    createdAt: string,
    onDelete: (id: number) => void
}

export default function CartCard(props: Props) {
    const navigate = useNavigate()

    return <>
        <div class="card" onClick={() => navigate(`/carts/${props.id}`)}>
            <div style={{
                display: 'flex',
                "flex-direction": 'column',
            }}>
                <h4 style={{ margin: 0 }}>{props.name}</h4>
                <h6 style={{ margin: '2px', opacity: 0.9 }}>{props.createdAt}</h6>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    props.onDelete(props.id)
                }}
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