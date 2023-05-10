export default class Tier {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    create() {
        let tier = document.createElement('div');
        tier.setAttribute("class", "tier");
        tier.setAttribute("id", this.id);
        tier.setAttribute("style", `background-color: ${this.color};`);
        tier.innerHTML = `
            <div class="tier-options sortable-disabled">
                <span id="remove-${this.id}" class="material-symbols-rounded remove sortable-disabled" title="Delete this tier">close</span>
                <span id="drag-${this.id}"class="material-symbols-rounded drag sortable-disabled" title="Move this tier">drag_indicator</span>
                <span id="fold-${this.id}"class="material-symbols-rounded fold sortable-disabled" title="Fold this tier">unfold_less</span>
            </div>
            <div id="color-${this.id}" class="tier-color sortable-disabled"></div>
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