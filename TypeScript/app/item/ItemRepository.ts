import Item from "./Item"

class ItemRepository {
  constructor(private items: Item[]) {
    this.items = items
  }

  getInventory(): Item[] {
    return this.items
  }

  saveIntenvory(items: Item[]): void {
    this.items = items
  }

  findItem(type: string, quality: number): Item {
    const itemReturn = this.items.find((item) => item.type.toString() === type && item.quality === quality)
    if (itemReturn === undefined) {
      throw new Error("Item not found")
    }
    return itemReturn
  }
}

export default ItemRepository
