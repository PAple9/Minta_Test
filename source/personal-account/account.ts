export class Account {
    public id: string;
    public email: string;
    public name: string;
    public number: string;
    public status: AccountStatus;

    constructor(email: string, name: string, number: string, id: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.number = number;
        this.status = 'Open';
    }

}


export type AccountStatus = "Open" | "Close";

