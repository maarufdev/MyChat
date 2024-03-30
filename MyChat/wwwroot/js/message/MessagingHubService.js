import ApiService from '../api.js';
import { constantElements, cssClass } from "./constant.js"

export default class MessagingHubService {

    constructor(messageTemplate, groupNameModel, messagePayloadModel) {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        this.messagingTemplate = messageTemplate;
        this.sendButton = document.getElementById(constantElements.sendMessage);
        this.messageInput = document.getElementById(constantElements.messageInput);
        this.apiService = new ApiService();
        this.groupNameModel = groupNameModel;
        this.messagePayloadModel = messagePayloadModel;
        this.messageParentContainer = document.getElementById(constantElements.messageSectionThread);
        this.recipientName = document.getElementById(constantElements.recipientName);
    }

    async clickSendMessageHandler() {
        this.sendButton.addEventListener('click', async () => {
            let payload = this.messagePayloadModel.getUpdatedMessagePayload()
            const groupName = this.groupNameModel.getGroupName();

            console.log("I am sending a message")

            if (this.messageInput.value == null ||
                this.messageInput.value == "" ||
                this.recipientName.textContent == "" ||
                this.recipientName.textContent == null) {

                return;
            }

            payload.MessageContent = this.messageInput.value;

            await this.connection.invoke("SendMessageToGroup", groupName, payload);

            this.messageInput.value = "";
        })
    }

    async pressEnterSendMessageHandler() {
        this.messageInput.addEventListener("keydown", async (event) => {
            let payload = this.messagePayloadModel.getUpdatedMessagePayload();
            const groupName = this.groupNameModel.getGroupName();

            if (event.key === "Enter") {
                if (this.messageInput.value == null ||
                    this.messageInput.value == "" ||
                    this.recipientName.textContent == "" ||
                    this.recipientName.textContent == null) {

                    return;
                }

                payload.MessageContent = this.messageInput.value;

                await this.connection.invoke("SendMessageToGroup", groupName, payload);

                this.messageInput.value = "";
            } else if (event.key === "Enter" && event.shiftKey) {
                window.alert("This is it!");
            }
        });
    }

    async startSendMessageHandler() {
        await this.clickSendMessageHandler();
        await this.pressEnterSendMessageHandler();
    }

    async createHubConnection(groupName) {

        await this.stopHubConnection();

        this.connection.start().then(async () => {
            await this.connection.invoke("JoinGroup", groupName)
        });

    }


    async startIncomingMessageHandler() {
        this.connection.on("ReceiveMessage", async (message) => {
            console.log("I receive the message!")

            this.messagingTemplate.createMessageContent(message);
        });


    }

    async stopHubConnection() {
        if (this.connection) {
            await this.connection.stop();
        }
    }

    async addGroup(groupName) {
        await this.hubConnection().invoke("JoinGroup", groupName);
        //this.stopHubConnection();
        //this.hubConnection().then(async () => {
        //    await this.hubConnection().invoke("JoinGroup", groupName);
        //});
    }

    async hubConnection() {
        return this.connection;
    }

    async sendMessageHandler(groupName, payload) {
        try {
            await this.hubConnection().invoke("SendMessageToGroup", groupName, payload);
        } catch (error) {
            window.alert(error);
        }
    }
}