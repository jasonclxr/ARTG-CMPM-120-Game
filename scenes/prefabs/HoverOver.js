//Instead of creaing events in every single class, I created a single class for managing
//hovering over collectible items

class HoverOver {
    constructor(scene, obj, name) {
        this.Image = scene.add.image(obj.x, obj.y, name)
        this.Image.setScale(obj.scale * 1.05)
        this.Image.visible = false;
        
        obj.setDepth(obj.depth + 1)
        this.Image.setDepth(obj.depth - 1)
        obj.on('pointerover', () => {
            this.Image.visible = true;
        })

        obj.on('pointerout', () => {
            this.Image.visible = false;
        })
    }

    destroy() {
        this.Image.destroy();
    }
}