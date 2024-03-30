﻿import ContactModalTemplate from "./contact/contact.js";
import GroupNameModel from "./GroupNameModel.js";
import MessagePayloadModel from "./message/MessagePayloadModel.js";
import MessagingHubService from "./message/MessagingHubService.js";
import ContactTemplate from "./ContactTemplate.js";
import MessageTemplate from "./message/MessageTemplate.js";
import ScreenDisplayService from "./ScreenDisplayService.js";
import PresenceTracker from "./tracker/presence.js";


$(document).ready(function () {


    // Notification Service
    // TODO: To be implemented
    class NotificationHub {
        constructor() {
            // build the notification hub here
            // include the listener for each instance
            this.connection = "test";
        }
    }


    const mainApp = async () => {

        const screenDisplay = new ScreenDisplayService();
        const groupNameModel = new GroupNameModel();
        const messagePayloadModel = new MessagePayloadModel();
        const messageTemplate = new MessageTemplate();
        const messageHubService = new MessagingHubService(messageTemplate, groupNameModel, messagePayloadModel);
        
        const contactTemplate = new ContactTemplate(messageTemplate, 
                                                    groupNameModel, 
                                                    messagePayloadModel, 
                                                    messageHubService);
 
        contactTemplate.runContactService();

        screenDisplay.runScreenSizeHandler();

        await messageHubService.startSendMessageHandler()
        await messageHubService.startIncomingMessageHandler();


        // Test tracker
        const tracker = new PresenceTracker();

        const contactModalTemplate = new ContactModalTemplate();

        $("#modal-button").click(async () => {
            await contactModalTemplate.runContactModal();
        });

        $("#close-message").click(() => {
            screenDisplay.setMessageViewStatus(false);
            document.location.reload(true);
        });

        $("#close-modal").click(function () {
            document.location.reload();
        })
    }

    mainApp();

});