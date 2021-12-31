import { Account, AccountCreateParams } from '@entities/index';
import { accountFakeSaveOrUpdate } from '@repositories/account-fake-functional-repository';

export const createAccountServiceFunctionalWithoutDI = async (
  accountCreateParams: AccountCreateParams
) => {
  const account = Account.create(accountCreateParams);

  // console.log('createAccountServiceFunctionalWithoutDI');

  await accountFakeSaveOrUpdate(account);

  return {
    id: account.id,
    name: account.name,
    cpf: account.cpf
  } as Account;
};
