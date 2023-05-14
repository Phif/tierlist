export default class Tier {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
    
    create() {
        let tier = document.createElement('div');
        tier.classList.add("tier");
        tier.id = this.id;
        tier.style.backgroundColor = this.color;
        tier.innerHTML = `
        <div class="tier-options sortable-disabled">
        <span id="remove-${this.id}" class="remove material-symbols-rounded sortable-disabled" title="Delete this tier">close</span>
        <span id="drag-${this.id}"class="drag material-symbols-rounded sortable-disabled" title="Move this tier">drag_indicator</span>
        <span id="color-${this.id}" class="color material-symbols-rounded sortable-disabled" title="Change this tier's color" data-jscolor="{
            onInput: 
            'this.previewElement.parentElement.parentElement.style.backgroundColor = this.toHEXString(); this.previewElement.style.backgroundImage = null',
            value: '${this.color}',
        }">format_color_fill</span>
        </div>
        <div id="name-${this.id}" class="tier-name sortable-disabled">${this.name}</div>
        <div id="tier-images-${this.id}" class="tier-images sortable-disabled"></div>
        `
        document.querySelector('#tierlist-container').appendChild(tier);
        document.querySelector(`#remove-${this.id}`).addEventListener("click", () => {
            this.remove();
        });
        
        document.querySelector(`#name-${this.id}`).addEventListener("click", () => {
            let newName = prompt("Rename tier", this.name);
            if (newName != null) {
                this.rename(newName);
            }
        });
        
        new Sortable(document.querySelector(`#tier-images-${this.id}`), {
            animation: 200,
            swapThreshold: 1,
            group: "shared",
        });
        
        jscolor.install();
        document.querySelector(`#color-${this.id}`).style.removeProperty("background-image");
    }
    
    remove() {
        document.querySelector(`#${this.id}`).remove();
    }
    
    colorize(color) {
        document.querySelector(`#${this.id}`).style.backgroundColor = color;
    }
    
    rename(newName) {
        document.querySelector(`#name-${this.id}`).innerHTML = newName;
    }
}