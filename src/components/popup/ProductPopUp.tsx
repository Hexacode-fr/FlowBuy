import { For } from "solid-js";
import type { Category } from "../../database/db";
import { Plus } from "lucide-solid";

interface Props {
    ref?: HTMLDialogElement | ((el: HTMLDialogElement) => void);
    categories?: Category[];
    onSave: (name: string, catId: number) => void;
    onClose: () => void;
    onOpenCat: () => void;
}


export default function ProductPopUp(props: Props) {

    let inputRef!: HTMLInputElement
    let selectRef!: HTMLSelectElement

    const Close = () => {
        inputRef.value = ''
        selectRef.value = '1'
        props.onClose()
    }

    return <>
        <dialog ref={props.ref} class="popup">
            <h2>Ajouter un Produit</h2>
            <input type="text" class='form' placeholder="Nom du Produit" ref={inputRef} />
            <div style={{
                display: 'flex',
                "align-items": 'center'
            }}>
                <p>Categories</p>
                <button
                    onClick={() => props.onOpenCat()}
                    style={{
                    margin: '5px',
                    padding: '2px',
                    display: 'flex',
                    "background-color": 'rgb(0, 3, 197)',
                    "justify-content": 'center',
                    "align-items": 'center',
                    "border-color": 'white',
                    "border-style": 'solid',
                    "border-radius": '5px'
                }}>
                    <Plus size={20} color="white" />
                </button>
            </div>
            <select class="form" name="categories" id="categories" ref={selectRef}>
                <For each={props.categories}>
                    {(c) => <option value={c.id}>{c.name}</option>}
                </For>
            </select>
            <div style={{
                display: 'flex',
                margin: '0px',
            }}>
                <button
                    class="form"
                    onClick={() => Close()}
                >
                    Annuler
                </button>
                <button
                    class="form other"
                    onClick={() => {
                        const name = inputRef.value.trim();
                        const catId = Number(selectRef.value);
                        if (!name || !catId) return;
                        inputRef.value = ''
                        selectRef.value = '1'
                        props.onSave(name, catId);
                    }}
                >
                    Enregistrer
                </button>
            </div>
        </dialog>
    </>
}