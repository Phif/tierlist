import Tier from "./classes/tier.js";
import ImageElement from "./classes/image.js";
import Message from "./classes/message.js";

window.onload = function () {
    // JSCOLOR INIT
    jscolor.presets.default = {
        palette:'#DC143C #FF8C00 #FFD700 #32CD32 #1E90FF #9400D3', 
        paletteCols:6, paletteHeight:20, width:100, height:100, 
        sliderSize:15, shadow:false
    };

    function colorize(color) {
        document.querySelector(`#tier0`).style.backgroundColor = color;
    }

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
        let baseTierColors = ["#dc143c", "#ff8c00", "#ffd700", "#32cd32", "#1e90ff", "#8a2be2"];
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
        const selectedFiles = imageInput.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const image = new ImageElement("image"+imageCount, selectedFiles[i].name.substring(0, selectedFiles[i].name.lastIndexOf('.')), event.target.result);
                image.create();
                imageCount++;
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    };
    
    // ADD TIER
    const addTierButton = document.getElementById("add-tier");
    addTierButton.addEventListener("click", () => {
        let newTier = new Tier("tier"+tierCount, "New Tier", "#cccccc");
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

    // SHOW/HIDE CAPTIONS
    const toggleCaptionsButton = document.getElementById("toggle-captions");
    toggleCaptionsButton.addEventListener("click", () => {
        document.querySelectorAll(".image-caption").forEach(caption => {
            caption.style.visibility = caption.style.visibility == "visible" ? "hidden" : "visible";
        });
        toggleCaptionsButton.title = toggleCaptionsButton.title == "Hide captions" ? "Show captions" : "Hide captions";
        toggleCaptionsButton.style.color = toggleCaptionsButton.style.color == "limegreen" ? "crimson" : "limegreen";
    });
    
}