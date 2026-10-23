interface Props {
    ref: HTMLDialogElement,
    onSave: (value: string) => void,
    onClose: () => void
}

export default function CartPopUp(props: Props) {

    let inputRef!: HTMLInputElement

    return <>
        <dialog ref={props.ref} class="popup">
            <h2>Nouveau panier</h2>
            <input type="text" class="form" placeholder="Nom du panier" ref={inputRef} />
            <div style={{
                display: 'flex',
                margin: '20px',
            }}>
                <button
                    class="form"
                    onClick={() => {
                        inputRef.value = ''
                        props.onClose()
                    }}
                >
                    Annuler
                </button>
                <button
                    class="form other"
                    onClick={() => {
                        const value = inputRef.value
                        inputRef.value = ''
                        props.onSave(value)
                    }}
                >
                    Enregistrer
                </button>
            </div>
        </dialog>
    </>
}