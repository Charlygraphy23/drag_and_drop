const images = [
    "https://w7.pngwing.com/pngs/407/726/png-transparent-cartoon-school-cartoon-child-child-photography-hand-thumbnail.png",
    "https://w7.pngwing.com/pngs/878/170/png-transparent-student-cartoon-kids-child-people-reading-thumbnail.png",
    "https://w7.pngwing.com/pngs/471/288/png-transparent-child-cartoon-poster-cartoon-children-cartoon-character-text-photography-thumbnail.png",
    "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon-thumbnail.png",
    "https://w7.pngwing.com/pngs/291/127/png-transparent-dinosaur-cartoon-illustration-cartoon-small-dinosaur-cartoon-character-mammal-cat-like-mammal-thumbnail.png"
]
let draggableImagesContainer = [];
const droppableImagesContainer = [];
let dragging = null

const source = ELEMENT.source
const destination = ELEMENT.destination

const hovering = (element) => {
    element.classList.add("hover")
}
const endHover = (element) => {
    element.classList.remove("hover")
}

const handleDragStart = (event) => {
    dragging = draggableImagesContainer.find(data => data.img.dataset.index === event.target.dataset.index)
}

const handleDragEnd = (event) => {
    event.preventDefault()
    dragging = null
}

const handleDragOver = (event) => {
    event.preventDefault()
    console.log("Touch")
    if(!event?.target.className.includes("dropzone")) return;
    hovering(destination)
}

const handleDragLeave = (event) => {
    event.preventDefault()
    endHover(destination)
}

const handleDrop = (event) => {
    event.preventDefault()  

    const target = event?.target
    if(!target?.className?.includes("dropzone")) return;

    droppableImagesContainer.push(dragging)
    dragging.addToParent(destination)
    console.log(droppableImagesContainer)
    endHover()
}

const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.changedTouches[0]

    const isTouchOverDropZone = isOverDropZone(touch)
    if (isTouchOverDropZone) {
        hovering(ELEMENT.destination)
    }
    else endHover(ELEMENT.destination)
}


const handleTouchEnd = (event) => {
    console.log("Touch End")
    const touch = event.changedTouches[0]
    const isTouchOverDropZone = isOverDropZone(touch)
    if (isTouchOverDropZone) {
        droppableImagesContainer.push(dragging)
        dragging.addToParent(destination)
        endHover(ELEMENT.destination)
    }

    handleDragEnd(event)
}

const loadImages = (_images) => {
    draggableImagesContainer = _images.map((item , index) => {
        const imageElement = new DragElement(item , index)
        imageElement.addToParent(source)
        return imageElement
    })
}

const renderView = () => {
    loadImages(images)
}


source.addEventListener("dragstart", handleDragStart)
source.addEventListener("dragend", handleDragEnd)
destination.addEventListener("dragover" ,handleDragOver)
destination.addEventListener("dragleave" , handleDragLeave)
destination.addEventListener("drop" ,handleDrop)
source.addEventListener("dragstart", handleDragStart)
source.addEventListener("touchstart", handleDragStart)
source.addEventListener("touchmove", handleTouchMove)
source.addEventListener("touchend", handleTouchEnd)




renderView()