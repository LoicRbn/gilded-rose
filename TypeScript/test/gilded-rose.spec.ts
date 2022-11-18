import AgingItem from "../app/item/AgingItem"
import ConjuredItem from "../app/item/ConjuredItem"
import EventItem from "../app/item/EventItem"
import GenericItem from "../app/item/GenericItem"
import Item, { ItemType } from "../app/item/Item"
import ItemRepository from "../app/item/ItemRepository"
import LegendaryItem from "../app/item/LegendaryItem"
import Shop from "../app/Shop"

describe("Gilded Rose, GenericItem", () => {
  it("Should build", () => {
    expect(true).toBe(true)
  })

  it("Should have a name", () => {
    const item = new GenericItem("foo", 0, 0, 0)
    expect(item.name).toBe("foo")
  })

  it("Should have a sellIn", () => {
    const item = new GenericItem("foo", 0, 0, 0)
    expect(item.sellIn).toBe(0)
  })

  it("Should have a quality", () => {
    const item = new GenericItem("foo", 0, 0, 0)
    expect(item.quality).toBe(0)
  })

  it("Should update sellIn", () => {
    const item = new GenericItem("foo", 2, 0, 0)
    item.update()
    expect(item.sellIn).toBe(1)
  })

  it("Should update quality", () => {
    const item = new GenericItem("foo", 1, 2, 0)
    item.update()
    expect(item.quality).toBe(1)
  })

  it("Should update quality with sellIn below zero", () => {
    const item = new GenericItem("foo", 0, 2, 0)
    item.update()
    expect(item.quality).toBe(0)
  })

  it("Should not update quality below 0", () => {
    const item = new GenericItem("foo", 0, 0, 0)
    item.update()
    expect(item.quality).toBe(0)
  })

  it("Should update quality twice as fast after sellIn", () => {
    const item = new GenericItem("foo", 0, 4, 0)
    item.update()
    expect(item.quality).toBe(2)
  })

  it("Should not update quality below 0 after sellIn", () => {
    const item = new GenericItem("foo", 0, 1, 0)
    item.update()
    expect(item.quality).toBe(0)
  })

  it("Should not update quality above 50", () => {
    const item = new GenericItem("foo", 1, 51, 0)
    item.update()
    expect(item.quality).toBe(50)
  })
})

describe("Gilded Rose, LegendaryItem", () => {
  it("Should not update LegendaryItem", () => {
    const item = new LegendaryItem("Sulfuras", 1, 80, 0)
    item.update()
    expect(item.quality).toBe(80)
  })
})

describe("Gilded Rose, ConjuredItem", () => {
  it("Should update ConjuredItem", () => {
    const item = new ConjuredItem("Conjured", 1, 50, 0)
    item.update()
    expect(item.quality).toBe(48)
  })

  it("Should update ConjuredItem twice as fast after sellIn", () => {
    const item = new ConjuredItem("Conjured", 0, 50, 0)
    item.update()
    expect(item.quality).toBe(46)
  })

  it("Should not update ConjuredItem below 0", () => {
    const item = new ConjuredItem("Conjured", 0, 1, 0)
    item.update()
    expect(item.quality).toBe(0)
  })
})

describe("Gilded Rose, AgingItem", () => {
  it("Should update AgingItem", () => {
    const item = new AgingItem("Aged Brie", 1, 49, 0)
    item.update()
    expect(item.quality).toBe(50)
  })

  it("Should update AgingItem twice as fast after sellIn", () => {
    const item = new AgingItem("Aged Brie", 0, 48, 0)
    item.update()
    expect(item.quality).toBe(50)
  })

  it("Should not update AgingItem above 50", () => {
    const item = new AgingItem("Aged Brie", 0, 50, 0)
    item.update()
    expect(item.quality).toBe(50)
  })
})

describe("Gilded Rose, Shop", () => {
  it("Should update items", () => {
    const items: Item[] = [
      new GenericItem("foo", 0, 1, 0),
      new LegendaryItem("Sulfuras", 1, 80, 0),
      new ConjuredItem("Conjured", 1, 50, 0),
      new AgingItem("Aged Brie", 1, 49, 0),
    ]
    const shop = new Shop(new ItemRepository(items))
    shop.updateInventory()

    expect(items[0].quality).toBe(0)
    expect(items[1].quality).toBe(80)
    expect(items[2].quality).toBe(48)
    expect(items[3].quality).toBe(50)
  })

  it("Should find item by type", () => {
    const items: Item[] = [
      new GenericItem("foo", 0, 1, 0),
      new LegendaryItem("Sulfuras", 1, 80, 0),
      new ConjuredItem("Conjured", 1, 50, 0),
      new AgingItem("Aged Brie", 1, 49, 0),
      new EventItem("Backstage Pass", 1, 49, 0),
    ]
    const itemRepo = new ItemRepository(items)
    const shop = new Shop(itemRepo)
    const generic = itemRepo.findItem(ItemType.Generic, 1)
    const Legendary = itemRepo.findItem(ItemType.Legendary, 80)
    const conjured = itemRepo.findItem(ItemType.Conjured, 50)
    const aging = itemRepo.findItem(ItemType.Aging, 49)
    const event = itemRepo.findItem(ItemType.Event, 49)

    expect(generic).toBe(items[0])
    expect(Legendary).toBe(items[1])
    expect(conjured).toBe(items[2])
    expect(aging).toBe(items[3])
    expect(event).toBe(items[4])
  })

  it("Should sell item", () => {
    const items: Item[] = [
      new GenericItem("foo", 0, 1, 0),
      new LegendaryItem("Sulfuras", 1, 80, 0),
      new ConjuredItem("Conjured", 1, 50, 0),
      new AgingItem("Aged Brie", 1, 49, 0),
      new EventItem("Backstage Pass", 1, 49, 0),
    ]
    const itemRepo = new ItemRepository(items)
    const shop = new Shop(itemRepo)
    shop.sellItem(ItemType.Conjured, 50)
    expect(itemRepo.getInventory().length).toBe(4)
    expect(() => itemRepo.findItem(ItemType.Conjured, 50)).toThrowError()
  })
})
