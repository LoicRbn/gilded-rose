import Item, { ItemType } from "./Item"

class LegendaryItem extends Item {
  public type: ItemType
  constructor(name: string, sellIn: number, quality: number, basePrice: number) {
    super(name, sellIn, quality, basePrice)
    this.type = ItemType.Legendary
  }

  update(): void {
    // Do nothing
  }
}

export default LegendaryItem
