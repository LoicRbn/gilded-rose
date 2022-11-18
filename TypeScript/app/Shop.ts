import ItemRepository from "./item/ItemRepository"

class Shop {
  constructor(public itemRepo: ItemRepository) {
    this.itemRepo = itemRepo
  }

  updateInventory() {
    this.itemRepo.getInventory().forEach(item => item.update())
  }

  sellItem(type: string, quality: number) {
    const item = this.itemRepo.findItem(type, quality)
    this.itemRepo.saveIntenvory(this.itemRepo.getInventory().filter(i => i !== item))
  }
}

export default Shop
