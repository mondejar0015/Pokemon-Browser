import { ReactNode } from 'react'
import './ItemList.css'

interface ItemListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T, index: number) => string | number
  emptyMessage?: string
}

export function ItemList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No items found',
}: ItemListProps<T>) {
  if (items.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>
  }

  return (
    <div className="item-list">
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} className="item-list-item">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}
