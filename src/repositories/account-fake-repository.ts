import { Account } from 'entities';
import { IRepository } from 'interfaces';

export class AccountFakeRepository implements IRepository<Account> {
  private accounts: Map<string, Account> = new Map();

  saveOrUpdate(entity: Account): Promise<void> {
    this.accounts.set(entity.id, entity);

    console.warn('AccountFakeRepository saveOrUpdate method called');

    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.accounts.delete(id);

    return Promise.resolve();
  }

  findById(id: string): Promise<Account> {
    const account = this.accounts.get(id);

    if (account) {
      return Promise.resolve(account);
    }

    throw new Error(`cannot found account ${id}`);
  }
}
