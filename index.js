const images = [
    "https://w7.pngwing.com/pngs/407/726/png-transparent-cartoon-school-cartoon-child-child-photography-hand-thumbnail.png",
    "https://w7.pngwing.com/pngs/878/170/png-transparent-student-cartoon-kids-child-people-reading-thumbnail.png",
    "https://w7.pngwing.com/pngs/471/288/png-transparent-child-cartoon-poster-cartoon-children-cartoon-character-text-photography-thumbnail.png",
    "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon-thumbnail.png",
    "https://w7.pngwing.com/pngs/291/127/png-transparent-dinosaur-cartoon-illustration-cartoon-small-dinosaur-cartoon-character-mammal-cat-like-mammal-thumbnail.png"
]
let draggableImagesContainer = [];
let droppableImagesContainer = [];
let dragging = null
let order = "";
let targetElement = null
let triggerInset = ""

const source = ELEMENT.source
const destination = ELEMENT.destination

const hovering = (element) => {
    element.classList.add("hover")
}
const endHover = (element) => {
    element.classList.remove("hover")
}
const clearState = () => {
    clearPlaceholders()
    dragging = null
    order = ""
    targetElement = null
}
const clearPlaceholders = () => {
    const placeholders = document.querySelectorAll(".placeholder")
    placeholders.forEach((placeholder) => {
        placeholder.remove()
    })
}
const createPlaceholder = (width, height) => {
    clearPlaceholders()
    const div = document.createElement("div")
    div.style.width = `${width}px`
    div.style.height = `${height}px`
    div.className = "placeholder"
    return div
}
const handleOrderedInsert = () => {
    const findPossibleIndex = droppableImagesContainer.findIndex((data) => data.index === +targetElement?.dataset?.index)

    if (order === "before") {
        droppableImagesContainer.splice(findPossibleIndex, 0, dragging)
        targetElement.before(dragging.img)
    }
    else {
        droppableImagesContainer.splice(findPossibleIndex, 0, dragging)
        targetElement.after(dragging.img)
    }
}


const handleDragEnd = (event) => {
    event.preventDefault()
    clearState()

}

const handleDragStart = (event) => {
    dragging = draggableImagesContainer.find(data => data.img.dataset.index === event.target.dataset.index)
}

const handleImageInsertOrder = (event, target) => {
    const box = target.getBoundingClientRect();
    const x = event.clientX
    const midOfBox = (box.right - (box.width / 2))
    const isLeftSide = midOfBox >= x

    if (triggerInset === isLeftSide) return;
    triggerInset = isLeftSide

    const placeholder = createPlaceholder(box.width, box.height)

    if (isLeftSide) {
        target.before(placeholder)
        order = "before"
    }
    else {
        target.after(placeholder)
        order = "after"
    }
    targetElement = target
}

const handleDragOver = (event) => {
    event.preventDefault()
    const target = event.target;

    if (target.nodeName === "IMG") {
        handleImageInsertOrder(event, target)
    }

    if (!target.className.includes("dropzone")) return;

    hovering(destination)
}

const handleDragLeave = (event) => {
    event.preventDefault()
    endHover(destination)
}

const handleDrop = (event) => {
    event.preventDefault()
    if (!targetElement && !order) {
        dragging.addToParent(destination)
        droppableImagesContainer.push(dragging)
    }

    else handleOrderedInsert()
    endHover(destination)
    clearPlaceholders()
}

const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.changedTouches[0]
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target.nodeName === "IMG" && !target.className.includes("draggable") && !target.parentElement.className.includes("draggable")) {
        handleImageInsertOrder(touch , target)
    }

    const isTouchOverDropZone = isOverDropZone(touch)
    if (isTouchOverDropZone) {
        hovering(ELEMENT.destination)
    }
    else endHover(ELEMENT.destination)
}


const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0]
    const isTouchOverDropZone = isOverDropZone(touch)
    if (isTouchOverDropZone) {
        if (!targetElement && !order) {
            dragging.addToParent(destination)
            droppableImagesContainer.push(dragging)
        }

        else handleOrderedInsert()
        endHover(ELEMENT.destination)
    }

    handleDragEnd(event)
}

const loadImages = (_images) => {
    draggableImagesContainer = _images.map((item, index) => {
        const imageElement = new DragElement(item, index)
        imageElement.addToParent(source)
        return imageElement
    })
}

const renderView = () => {
    loadImages(images)
}


source.addEventListener("dragstart", handleDragStart)
source.addEventListener("dragend", handleDragEnd)
destination.addEventListener("dragover", handleDragOver)
destination.addEventListener("dragleave", handleDragLeave)
destination.addEventListener("drop", handleDrop)
source.addEventListener("dragstart", handleDragStart)
source.addEventListener("touchstart", handleDragStart)
source.addEventListener("touchmove", handleTouchMove)
source.addEventListener("touchend", handleTouchEnd)




renderView()