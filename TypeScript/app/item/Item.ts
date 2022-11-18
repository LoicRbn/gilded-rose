abstract class Item {
  public type: ItemType

  constructor(public name: string, public sellIn: number, public quality: number, public basePrice: number) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
    this.basePrice = basePrice
    this.type = ItemType.Item
  }

  abstract update(): void

  getValue() {
    return this.basePrice
  }
}

export enum ItemType {
  Legendary = "LegendaryItem",
  Conjured = "ConjuredItem",
  Aging = "AgingItem",
  Generic = "GenericItem",
  Event = "EventItem",
  Item = "Item",
}

export default Item
