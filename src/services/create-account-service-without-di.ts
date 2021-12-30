import { IRepository, IService } from '@interfaces/index';
import { AccountCreateParams, Account } from '@entities/index';
import { AccountFakeRepository } from '@repositories/index';

export class CreateAccountServiceWithoutDI implements IService<AccountCreateParams, Account> {
  private repository: IRepository<Account>;

  constructor() {
    this.repository = new AccountFakeRepository();
  }

  async execute(params: AccountCreateParams): Promise<Account> {
    const account = Account.create(params);

    await this.repository.saveOrUpdate(account);

    // console.warn('CreateAccountServiceWithoutDI execute method called');

    return {
      id: account.id,
      name: account.name,
      cpf: account.cpf
    } as Account;
  }
}
