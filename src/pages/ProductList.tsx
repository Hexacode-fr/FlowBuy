import { db } from "../database/db"
import '../css/ProductList.css'
import { Portal } from "solid-js/web"
import { Plus } from "lucide-solid"
import { For, from } from "solid-js"
import ProductPopUp from "../components/popup/ProductPopUp"
import { liveQuery } from "dexie"
import { CategoriesPopUp } from "../components/popup/CategoriesPopUp"
import ProductCard from "../components/Card/ProductCard"


export default function ProductList() {
    
    const categories = from(liveQuery(() => db.categories.toArray()))
    const products = from(liveQuery(() => db.products.toArray()))
    let productDialogRef!: HTMLDialogElement
    let categoryDialogRef!: HTMLDialogElement

    const closeCategoryPopUp = () => {
        categoryDialogRef.close()
        productDialogRef.showModal()
    }
    const saveCategoryPopUp = (name: string, unit: string) => {
        categoryDialogRef.close()
        db.categories.add({name, unit})
    }
    const saveProductPopUp = async (name: string, catId: number) => {
        await db.products.add({
            name,
            categoryId: catId,
            createdAt: new Date().toLocaleDateString('fr-FR'),
        })
        productDialogRef.close()
    }
    const deleteProduct = async (id: number) => {
        await db.products.delete(id)
    }


    return <>
        <div class="root">
            <Portal mount={document.getElementById("actionbar")!}>
                <div style={{
                    display: "flex",
                    "flex-direction": 'row',
                    "align-items": 'center',
                    width: '100%'
                }}>
                    <h1>Mes produits</h1>
                    <button
                    onClick={() => productDialogRef.showModal()}
                    style={{
                        "margin-left": 'auto',
                        width: '40px',
                        height: '40px',
                        padding: '0',
                        "background-color": 'rgb(0, 3, 197)',
                        "border-style": 'solid',
                        "border-width": '2px',
                        "border-color": 'white',
                        "border-radius": '10px',
                        display: 'flex',
                        "justify-content": 'center',
                        "align-items": 'center'
                    }}>
                        <Plus color="white" />
                    </button>
                </div>
            </Portal>
            <For each={products()}>
                {(p) => (
                    <ProductCard
                        id={p.id!}
                        name={p.name}
                        categoryId={p.categoryId}
                        onDelete={deleteProduct}
                    />
                )}
            </For>
            
        </div>
        <ProductPopUp
            categories={categories()}
            ref={productDialogRef}
            onSave={saveProductPopUp}
            onClose={() => productDialogRef.close()}
            onOpenCat={() => categoryDialogRef.showModal()}
        />
        <CategoriesPopUp
            ref={categoryDialogRef}
            onClose={() => closeCategoryPopUp()}  
            onSave={saveCategoryPopUp} 
        />
    </>
}