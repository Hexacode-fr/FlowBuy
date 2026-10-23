import Dexie, { type Table } from "dexie"

export interface Product {
  id?: number
  name: string
  categoryId: number
  createdAt: string
}

export interface Category {
  id?: number
  name: string
  unit: string
}

export interface CartItem {
  id?: number
  cartId: number
  productId: number
  name: string
  quantity: number
  unit: string
  checked: boolean
}

export interface Cart {
  id?: number
  name: string
  createdAt: string
}

export interface Setting {
  key: string
  value: string
}

class FlowBuyDatabase extends Dexie {
  products!: Table<Product, number>
  carts!: Table<Cart, number>
  cartItems!: Table<CartItem, number>
  categories!: Table<Category, number>
  settings!: Table<Setting, string>

  constructor() {
    super("FlowBuyDatabase")

    this.version(1).stores({
      products: "++id, name, categoryId, createdAt",
      carts: "++id, name, createdAt",
      cartItems: "++id, cartId, productId",
      categories: "++id, name",
      settings: "key",
    })
  }
}

export const db = new FlowBuyDatabase()

export async function addDefaultCategory() {
  const count = await db.categories.count()
  if (count > 0) return

  await db.categories.bulkAdd([
    { name: "Fruits & Légumes", unit: "kg" },
    { name: "Boissons", unit: "L" },
    { name: "Produits Ménagers", unit: "" },
  ])
}