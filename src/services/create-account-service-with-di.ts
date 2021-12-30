import { AccountCreateParams, Account } from '@entities/index';
import { IService, IRepository } from '@interfaces/index';

export class CreateAccountServiceWithDI implements IService<AccountCreateParams, Account> {
  constructor(private repository: IRepository<Account>) {}

  async execute(params: AccountCreateParams): Promise<Account> {
    const account = Account.create(params);

    await this.repository.saveOrUpdate(account);

    console.warn('CreateAccountServiceWithDI execute method called');

    return {
      id: account.id,
      name: account.name,
      cpf: account.cpf
    } as Account;
  }
}
