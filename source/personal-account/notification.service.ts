export interface NotificationService<TIn = string> {
  sendWelcomeMessage(account: TIn):void
}

export class NotificationServiceImp<TIn = string> implements NotificationService<TIn>{
  sendWelcomeMessage(account: TIn):void {

  }
}
