interface Props {
    ref?: HTMLDialogElement | ((el: HTMLDialogElement) => void);
    onSave: (name: string, unit: string) => void;
    onClose: () => void;
}

export function CategoriesPopUp(props: Props) {
    
    let inputNameRef!: HTMLInputElement
    let inputUnitRef!: HTMLInputElement

    return <>
        <dialog ref={props.ref} class="popup">
            <h2>Ajouter une categorie</h2>
            <input type="text" class="form" placeholder="Nom de la categorie" ref={inputNameRef} />
            <input type="text" class="form" placeholder="Unité (laisser vide si aucune)" ref={inputUnitRef} />
            <div style={{
                display: 'flex',
                margin: '20px',
            }}>
                <button
                    class="form"
                    onClick={() => {
                        props.onClose()
                        inputNameRef.value = ''
                        inputUnitRef.value = ''
                    }}
                >
                    Annuler
                </button>
                <button
                    class="form other"
                    onClick={() => {
                        const NameValue = inputNameRef.value
                        const UnitValue = inputUnitRef.value
                        props.onSave(NameValue, UnitValue)
                        inputNameRef.value = ''
                        inputUnitRef.value = ''
                    }}
                >
                    Enregistrer
                </button>
            </div>
        </dialog>
    </>
}