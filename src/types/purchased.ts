import type { Item } from './index'

export interface PurchasedItem {
  id: string
  item: Item
  quantity: number
  totalCost: number
  purchaseTime: Date
}
