import { AccountCreateParams, Account } from '@entities/index';
import { saveOrUpdate } from '@interfaces/index';

type CreateAccountServiceWithDIParams = {
  accountCreateParams: AccountCreateParams;
  repository: {
    saveOrUpdate: saveOrUpdate<Account>;
  };
};

export const createAccountServiceFunctionalWithDI = async ({
  accountCreateParams,
  repository
}: CreateAccountServiceWithDIParams): Promise<Account> => {
  const account = Account.create(accountCreateParams);

  // console.log('createAccountServiceFunctionalWithDI');

  await repository.saveOrUpdate(account);

  return {
    id: account.id,
    name: account.name,
    cpf: account.cpf
  } as Account;
};
