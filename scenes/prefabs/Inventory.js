class Inventory {
    constructor() {
        this.Item1 = "null";
        this.Item2 = "null";
        this.Item3 = "null";
        this.Item4 = "null";
    }

    add(scene, name) {
        if (this.Item1 == "null") {
            this.Item1 = name
            scene.InventoryGui.update()
            return true
        } else {
            if (this.Item2 == "null") {
                this.Item2 = name
                scene.InventoryGui.update()
                return true
            } else {
                if (this.Item3 == "null") {
                    this.Item3 = name
                    scene.InventoryGui.update()
                    return true
                } else {
                    if (this.Item4 == "null") {
                        this.Item4 = name
                        scene.InventoryGui.update()
                        return true
                    } else {
                        console.log("inventory full");
                    }
                }
            }
        }
    }

    remove(scene, name) {
        if (this.Item1 == name) {
            this.Item1 = "null"
            scene.InventoryGui.update()
        } else if ( this.Item2 == name) {
            this.Item2 = "null"
            scene.InventoryGui.update()
        } else if (this.Item3 == name) {
            this.Item3 = "null"
            scene.InventoryGui.update()
        } else if (this.Item4 == name) {
            this.Item4 = "null"
            scene.InventoryGui.update()
        }
    }

    has(name) {
        if (this.Item1 == name || this.Item2 == name || this.Item3 == name || this.Item4 == name) {
            return true;
        }
        return false;
    }
}

class InventoryGui {
    constructor(scene) {
        this.InventoryImage = scene.add.image(0, 0, 'inventory');
        this.InventoryImage.setPosition(100, 60)
        this.InventoryImage.setScale(0.04)

        this.InventoryImage = scene.add.image(0, 0, 'inventory');
        this.InventoryImage.setPosition(264, 60)
        this.InventoryImage.setScale(0.04)

        this.Image1 = scene.add.image(0, 0, 'bucket')
        this.Image2 = scene.add.image(0, 0, 'bucket')
        this.Image3 = scene.add.image(0, 0, 'bucket')
        this.Image4 = scene.add.image(0, 0, 'bucket')

        this.InventoryText = scene.add.text(150, 0, 'Inventory', { font: '16px Arial', fill: '#FFFFFF' });
        this.update();
    }

    update() {
        if (inventory.Item1 != "null") {
            this.Image1.setTexture(inventory.Item1)
            this.Image1.displayHeight = this.Image1.displayWidth = 60;
            this.Image1.setPosition(60, 60)
            this.Image1.visible = true
        } else {
            this.Image1.visible = false
        }

        if (inventory.Item2 != "null") {
            this.Image2.setTexture(inventory.Item2)
            this.Image2.displayHeight = this.Image2.displayWidth = 60;
            this.Image2.setPosition(140, 60)
            this.Image2.visible = true
        } else {
            this.Image2.visible = false
        }

        if (inventory.Item3 != "null") {
            this.Image3.setTexture(inventory.Item3)
            this.Image3.displayHeight = this.Image3.displayWidth = 60;
            this.Image3.setPosition(222, 60)
            this.Image3.visible = true
        } else {
            this.Image3.visible = false
        }

        if (inventory.Item4 != "null") {
            this.Image4.setTexture(inventory.Item4)
            this.Image4.displayHeight = this.Image4.displayWidth = 60;
            this.Image4.setPosition(304, 60)
            this.Image4.visible = true
        } else {
            this.Image4.visible = false
        }
    }
}