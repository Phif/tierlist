import Tier from "./classes/tier.js";
import ImageElement from "./classes/image.js";
import Message from "./classes/message.js";

window.onload = function () {
    // CHANGE TIERLIST NAME
    const tierlistName = document.getElementById("tierlist-name");
    tierlistName.onclick = () => {
        let newName = prompt("Rename tierlist", tierlistName.innerHTML);
        if (newName != null) {
            tierlistName.innerHTML = newName;
        }
    };
    
    // INIT TIERS
    let tiers = [];
    let tierCount = 0;
    initTiers();
    function initTiers() {
        let baseTierNames = ["S", "A", "B", "C", "D", "F"];
        let baseTierColors = ["crimson", "darkorange", "gold", "limegreen", "dodgerblue", "darkviolet"];
        for (let i = 0; i < 6; i++) {
            let newTier = new Tier("tier"+i, baseTierNames[i], baseTierColors[i]);
            newTier.create();
            tierCount++;
            tiers.push(newTier);
        }
    }
    
    // ADD IMAGE
    let imageCount = 0;
    const imageInput = document.querySelector("#image-input");
    
    imageInput.onclick = () => {
        imageInput.value = "";
    };
    
    imageInput.onchange = () => {
        new Message("dodgerblue", "Loading...", `Processing your image(s).`, 3000).create();
        const selectedFiles = imageInput.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const image = new ImageElement("image"+imageCount, imageInput.files[i].name.substring(0, imageInput.files[i].name.lastIndexOf('.')), event.target.result);
                image.create();
                imageCount++;
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    };
    
    // ADD TIER
    const addTierButton = document.getElementById("add-tier");
    addTierButton.addEventListener("click", () => {
        let newTier = new Tier("tier"+tierCount, "New Tier", "lightgrey");
        newTier.create();
        tierCount++;
        tiers.push(newTier);
    });
    
    // SORTABLE
    new Sortable(document.querySelector('#imagelist'), {
        animation: 200,
        swapThreshold: 1,
        group: "shared",
    });
    
    new Sortable(document.querySelector('#tierlist-container'), {
        animation: 200,
        swapThreshold: 1,
        handle: ".drag",
    });
    
    // REMOVE ALL IMAGES
    const removeAllImagesButton = document.getElementById("remove-all-images");
    removeAllImagesButton.addEventListener("click", () => {
        document.querySelectorAll(".image-container").forEach(image => {
            image.remove();
        });
    });

}