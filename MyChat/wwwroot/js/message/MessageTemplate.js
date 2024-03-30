
import { constantElements, cssClass } from "./constant.js";

export default class MessageTemplate {
    constructor() {
        this.messageParentContainer = document.getElementById(constantElements.messageSectionThread);
        this.recipientName = document.getElementById(constantElements.recipientName);
    }

    createMessageContent(message) {
        const createdMessageContainer = document.createElement('div');
        const createdMessageContentElement = document.createElement('p');

        console.log(`Creating message Content\n: ${message}`)

        createdMessageContentElement.textContent = message.messageContent;
        createdMessageContentElement.classList.add(cssClass.messageContentText);

        if (message.recipientUsername === this.recipientName.textContent) {
            createdMessageContainer.classList.add(cssClass.messageContentContainer, "message-text-right");
        } else {
            createdMessageContainer.classList.add(cssClass.messageContentContainer, "message-text-left")
        }

        createdMessageContainer.appendChild(createdMessageContentElement);
        this.messageParentContainer.appendChild(createdMessageContainer);

        this.messageParentContainer.scrollTop = this.messageParentContainer.scrollHeight;

        return this.messageParentContainer;
    }

    getMessageParentContainer() {
        return this.messageParentContainer;
    }

    removeExistingMessages() {
        if (this.messageParentContainer.children.length == 0) return;

        let childement = this.messageParentContainer.lastElementChild;

        while (childement) {
            this.messageParentContainer.removeChild(childement)
            childement = this.messageParentContainer.lastElementChild;
        }
        return this.messageParentContainer;
    }
}