class Inventory {
    constructor() {
        this.Equip = "null";
        this.Inventory = {};
    }

    equipItem() {

    }

    add(name, count) {
        if (this.Inventory[name] != null) {
            this.Inventory[name].Count++;
        } else {
            this.Inventory[name] = {
                ItemName: name,
                Count: count
            }
        }
        if (this.Equip == "null") {
            this.Equip = name;
        }
    }

    remove(name, count) {
        if (this.Inventory[name] != null) {
            if (count >= this.Inventory[name].Count) {
                delete this.Inventory[name];
            } else {
                this.Inventory[name].Count -= count;
            }
            if (this.Equip == name) {
                this.Equip = "null";
            }
        }
    }

    printInventory() {
        for (let j in this.Inventory) {
            console.log(j, this.Inventory[j].Count);
        }
    }

    has(name) {
        if (this.Inventory[name] != null) {
            return true;
        }
        return false;
    }
}