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
        this.message.innerHTML = `
        <div class="message-title">${this.title}</div>
        <div class="message-content">${this.content}</div>
        `
        document.querySelector('#messages-container').appendChild(this.message);
        this.message.style.transform = "scale(0)";
        setTimeout(() => {this.message.style.transform = "scale(1)";}, 100)
        setTimeout(() => {this.message.style.transform = "scale(0)";}, this.duration)
        setTimeout(() => {this.remove()}, this.duration + 100)
    }

    remove() {
        this.message.remove();
    }
}