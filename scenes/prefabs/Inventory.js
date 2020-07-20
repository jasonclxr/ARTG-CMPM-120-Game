class Inventory {
    constructor() {
        this.Equip = 0;
        this.Inventory = {};
    }

    equipItem() {

    }

    addItem(name, count) {
        if (this.Inventory[name] != null) {
            this.Inventory[name].Count++;
        } else {
            this.Inventory[name] = {
                ItemName: name,
                Count: count
            }
        }
    }

    removeItem(name, count) {
        if (this.Inventory[name] != null) {
            if (count >= this.Inventory[name].Count) {
                delete this.Inventory[name];
            } else {
                this.Inventory[name].Count -= count;
            }
        }
    }

    printInventory() {
        for (let j in this.Inventory) {
            console.log(j, this.Inventory[j].Count);
        }
    }
}