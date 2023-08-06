const ELEMENT = {
    source : document.querySelector(".draggable"),
    destination: document.querySelector(".dropzone")
}

const isOverDropZone = (touch) => {
    const dropzone = ELEMENT.destination
    const dropZoneRect = dropzone.getBoundingClientRect();

    return touch.clientX >= dropZoneRect.left &&
    touch.clientX <= dropZoneRect.right &&
    touch.clientY >= dropZoneRect.top &&
    touch.clientY <= dropZoneRect.bottom;
}