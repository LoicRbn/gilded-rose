import Item, { ItemType } from "./Item"

class EventItem extends Item {
  public type: ItemType

  constructor(name: string, sellIn: number, quality: number, basePrice: number) {
    super(name, sellIn, quality, basePrice)
    this.type = ItemType.Event
  }

  update(): void {
    this.sellIn -= 1
    this.quality += 1
    if (this.sellIn < 10) {
      this.quality += 1
    }
    if (this.sellIn < 5) {
      this.quality += 1
    }
    if (this.sellIn < 0) {
      this.quality = 0
    }
    if (this.quality > 50) {
      this.quality = 50
    }
  }
}

export default EventItem
