

export default class PresenceTracker {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/presence")
            .build()

        this.connection.start()
        .then(() => console.log("Start hub connection"))            ;
    }

    getConnection() {
        return this.connection
    }


}