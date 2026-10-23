import '../../css/CartItemPopUp.css'
interface Props {
    ref: HTMLDialogElement,
    onSave: () => void,
    onClose: () => void,
}

export default function CartItemPopUp(props: Props) {
    return <>
        <dialog ref={props.ref} class="popup">
            <h2>Ajouter des produits au panier</h2>
            <div id='scroll'>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                <h6>Test</h6>
                
            </div>
        </dialog>
    </>
}