let invisibleImage;

// Preload the invisible image before drag starts
(function preloadInvisibleImage() {
    invisibleImage = new Image();
    invisibleImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; // Transparent image
})();



class DragElement {
    constructor(url, index) {
        this.url = url;
        this.img = this.#createElement(url, index)
        this.index = index
        this.img.addEventListener("dragstart", this.handleDragStart.bind(this));
        this.img.addEventListener("drag", this.handleDrag.bind(this));
        this.img.addEventListener("dragend", this.handleDragEnd.bind(this));
        this.img.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.img.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.img.addEventListener("touchend", this.handleTouchEnd.bind(this));
        this.img.addEventListener("touchcancel", this.handleTouchEnd.bind(this));
    }

    #createElement(url, index) {
        const img = document.createElement("img")
        img.src = url
        img.alt = `random-image`
        img.dataset.index = index
        img.draggable = true
        return img
    }

    #hideGhostImage(event) {
        event.dataTransfer.setDragImage(invisibleImage, 0, 0)
    }

    #applyStyle(event, shouldDelete) {
        let x = event.clientX;
        let y = event.clientY;

        this.cloneImage.style.top = `${y}px`;
        this.cloneImage.style.left = `${x}px`;
        this.cloneImage.style.opacity = 1;

        if (shouldDelete) {
            this.cloneImage.style.opacity = 0;
            document.body.removeChild(this.cloneImage)
            this.cloneImage = null
        }
    }

    handleDragStart(event) {
        this.cloneImage = this.img.cloneNode()
        this.cloneImage.classList.add("cloned-img")
        this.#hideGhostImage(event)
        document.body.appendChild(this.cloneImage)
    }

    handleTouchStart(event) {
        this.cloneImage = this.img.cloneNode()
        this.cloneImage.classList.add("cloned-img")
        document.body.appendChild(this.cloneImage)
    }

    handleTouchMove(event) {
        event.preventDefault();
        const touch = event.changedTouches[0]
        this.#applyStyle(touch)

    }

    handleDrag(event) {
        event.preventDefault()
        this.#applyStyle(event)
    }

    handleDragEnd(event) {
        event.preventDefault()
        this.#applyStyle(event, true)
    }

    handleTouchEnd(event) {
        event.preventDefault()
        this.#applyStyle(event.changedTouches[0], true)
    }

    addToParent(parent) {
        parent.append(this.img)
        this.parent = parent
    }
}