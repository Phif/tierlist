import Message from "./message.js";

export default class ImageElement {
    constructor(id, caption, src) {
        this.id = id;
        this.caption = caption;
        this.src = src;
        this.isCropping = false;
    }
    
    create() {
        let container = this.createContainer();
        let image = this.createImage();
        let caption = this.createCaption();
        container.appendChild(image);
        container.appendChild(caption);
        container.addEventListener("dblclick", () => {
            this.displayFullImage(image, caption);
        });        
    }
    
    remove() {
        document.querySelector(`#${this.id}`).remove();
    }
    
    createContainer() {
        let imageContainer = document.createElement("div");
        imageContainer.id = `image-container-${this.id}`;
        imageContainer.classList.add("image-container");
        document.querySelector("#imagelist").appendChild(imageContainer);
        return imageContainer;
    }
    
    createImage() {
        let image = new Image();
        image.id = `${this.id}`;
        image.src = this.src;
        image.dataset.src = this.src;
        image.style.display = "none";

        let loaded = false;
        image.onload = () => {
            if (!loaded) {
                image.src = this.resizeImage(image, 1000, 1000);
                image.dataset.src = this.resizeImage(image, 1000, 1000);
            }
            loaded = true;
            this.src = image.src;
            image.dataset.src = image.src;
            image.classList.add("image");
            image.style.display = "block";
        };
        return image;
    }
    
    createCaption() {
        let caption = document.createElement("span");
        caption.id = `image-caption-${this.id}`;
        caption.classList.add("image-caption");
        caption.innerHTML = this.caption;
        return caption;
    }
    
    displayFullImage(image, caption) {
        let fullImageContainer = document.createElement("div");
        fullImageContainer.id = "full-image-container";
        fullImageContainer.innerHTML = `
        <div id="full-image-crop-container">
        <img id="full-image" src="${image.dataset.src}">
        </div>
        <h2 id="full-image-caption">${this.caption}</h2>
        <div id="full-image-buttons">
        <button id="full-image-close">Close</button>
        <button id="full-image-delete">Delete</button>
        <button id="full-image-crop">Crop</button>
        <button id="full-image-validate-crop">Validate crop</button>
        <button id="full-image-cancel-crop">Cancel crop</button>
        </div>
        `;
        
        document.querySelector("main").appendChild(fullImageContainer);
        let fullImage = document.querySelector("#full-image");
        let fullImageCaption = document.querySelector("#full-image-caption");
        let fullImageCloseButton = document.querySelector("#full-image-close");
        let fullImageDeleteButton = document.querySelector("#full-image-delete");        
        let fullImageCropButton = document.querySelector("#full-image-crop");
        
        fullImageContainer.onmousedown = (event) => {
            if (event.target === event.currentTarget) {
                fullImageContainer.remove();
            }
        };
        document.onkeydown = (event) => {
            if (event.key === "Escape") {
                fullImageContainer.remove();
            }
        };
        fullImageCloseButton.onclick = () => {
            fullImageContainer.remove();
        };
        
        fullImageCaption.onclick = () => {
            let newCaption = prompt("Rename caption", caption.innerHTML);
            if (newCaption != null) {
                fullImageCaption.innerHTML = newCaption;
                this.caption = newCaption;
                caption.innerHTML = newCaption;
                new Message("dodgerblue", "", `Image was successfully renamed.`, 3000).create();
            }
        };
        
        fullImageDeleteButton.onclick = () => {
            document.querySelector(`#image-container-${this.id}`).remove();
            fullImageContainer.remove();
            
        };
        
        fullImageCropButton.onclick = () => {
            if (!this.isCropping) {
                this.isCropping = true;
                this.startCropping(fullImage);
            }
        }
    }
    
    startCropping(image) {
        let croppie = new Croppie(image, {
            boundary: { width: image.width, height: image.height },
            showZoomer: false,
        });
        document.querySelector("#full-image-crop-container").appendChild(document.querySelector(".croppie-container"));
        
        document.querySelector("#full-image-validate-crop").onclick = () => {
            if (this.isCropping) {
                this.validateCropping(image, croppie);
            }
        }
        document.querySelector("#full-image-cancel-crop").onclick = () => {
            if (this.isCropping) {
                this.stopCropping(image);
            }
        }
    }
    
    validateCropping(image, croppie) {
        croppie.result('blob').then((blob) => {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                let base64data = reader.result;
                document.querySelector(`#${this.id}`).src = base64data;
                this.stopCropping(image);
                new Message("dodgerblue", "", `Image was successfully cropped.`, 3000).create();
            }
        });
    }
    
    stopCropping(image) {      
        this.isCropping = false;
        document.querySelector("#full-image-crop-container").appendChild(image);
        document.querySelector(".croppie-container").remove();
    }
    
    resizeImage(image, maxWidth, maxHeight) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let ratio = image.width / image.height;
        if (ratio > 1) {
            maxHeight = maxWidth / ratio;
        } else {
            maxWidth = maxHeight * ratio;
        }
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.drawImage(image, 0, 0, maxWidth, maxHeight);
        let canvasData = canvas.toDataURL("image/webp", 1);
        return canvasData;
    }
}