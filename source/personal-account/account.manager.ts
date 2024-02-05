import {OpenAccountCommand} from "./open-account.command";
import {CloseAccountCommand} from "./close-account.command";
import {GetAccountsQuery} from "./get-accounts.query";
import {Account, AccountStatus} from "./account";
import {AccountError} from "./account.error";
import {NotificationService, NotificationServiceImp} from "./notification.service";
export interface AccountManager {
    openAccount(command: OpenAccountCommand): Promise<Account>

    closeAccount(command: CloseAccountCommand): Promise<Account>

    getAccounts(query: GetAccountsQuery): Promise<Account[]>
}
export class AccountManagerImp implements AccountManager {
    notificationService:NotificationService
    constructor(notificationService:NotificationService) {
        this.notificationService = notificationService;
    }

    async openAccount(command: OpenAccountCommand): Promise<Account> {
        const newAccount = new Account(command.email, command.name, '93123123','')
        if (command.id) {
            newAccount.id = command.id;
        }

        accountStorage.accounts.set(newAccount.id, newAccount);
            this.notificationService.sendWelcomeMessage(newAccount.id)
        return newAccount
    }

    async closeAccount(command: CloseAccountCommand): Promise<Account> {
        if (accountStorage.accounts.has(command.id)) {
            const acc = accountStorage.accounts.get(command.id)!;
            acc.status = 'Close';
            return acc
        }
        else throw(new AccountError(`account with id = ${ command.id } does not exist`));
    }

    async getAccounts(query: GetAccountsQuery): Promise<Account[]> {

        return Array.from(accountStorage.accounts.values())
    }
}
export class accountStorage {
   static accounts =new Map<string, Account>();

}




