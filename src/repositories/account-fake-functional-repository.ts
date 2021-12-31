import { Account } from '@entities/index';
import { saveOrUpdate, remove, findById } from '@interfaces/index';

const accounts: Map<string, Account> = new Map();

export const accountFakeSaveOrUpdate: saveOrUpdate<Account> = (entity: Account) => {
  accounts.set(entity.id, entity);

  // console.info('accountFakeFunctionalRepository saveOrUpdate method called');

  return Promise.resolve();
};

export const accountFakeRemove: remove = (id: string) => {
  accounts.delete(id);

  return Promise.resolve();
};

export const accountFakeFindById: findById<Account> = (id: string) => {
  const account = accounts.get(id);

  if (account) {
    return Promise.resolve(account);
  }

  throw new Error(`cannot found account ${id}`);
};
