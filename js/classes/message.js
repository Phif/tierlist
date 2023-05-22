export default class Message {
    constructor(color, title, content, duration = 3000) {
        this.color = color;
        this.title = title;
        this.content = content;
        this.duration = duration;
        this.message = document.createElement('div');
    }
    
    create() {
        this.message.classList.add("message");
        this.message.style.backgroundColor = this.color;
        if (this.title != "") {
            this.message.innerHTML += `<span class="message-title">${this.title}</span>`
        }
        if (this.content != "") {
            this.message.innerHTML += `<span class="message-content">${this.content}</span>`
        }
        document.querySelector('#messages-container').appendChild(this.message);
        this.message.style.transform = "scale(0)";
        setTimeout(() => {this.message.style.transform = "scale(1)";}, 100)
        if (this.duration != 0) {
            setTimeout(() => {this.message.style.transform = "scale(0)";}, this.duration)
            setTimeout(() => {this.remove()}, this.duration + 100)
        }
    }
    
    remove() {
        this.message.remove();
    }
}