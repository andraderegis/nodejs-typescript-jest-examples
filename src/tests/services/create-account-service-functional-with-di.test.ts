import { defaultAccountCreateParams } from '@tests/mocks';
import { createAccountServiceFunctionalWithDI } from '@services/index';
import { accountFakeSaveOrUpdate } from '@repositories/index';

describe('Tests for createAccountServiceFunctionalWithDI', () => {
  const sysUnderTest = createAccountServiceFunctionalWithDI;

  const repository = {
    saveOrUpdate: accountFakeSaveOrUpdate
  };

  it('Should call saveOrUpdate repository method', async () => {
    // saveOrUpdate repository implementation  will called, because we are only spying the function
    const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

    await sysUnderTest({
      accountCreateParams: defaultAccountCreateParams,
      repository
    });

    expect(repositorySpy).toHaveBeenCalled();
  });

  it('Should create account with mock return of saveOrUpdate repository method', async () => {
    // saveOrUpdate repository implementation not will called, because it resolve value is mocked
    const repositorySpy = jest.spyOn(repository, 'saveOrUpdate').mockResolvedValueOnce();

    await sysUnderTest({
      accountCreateParams: defaultAccountCreateParams,
      repository
    });

    expect(repositorySpy).toHaveBeenCalled();
  });

  it('Should create account with mock implementation of saveOrUpdate repository method', async () => {
    // saveOrUpdate repository implementation not will called, because it implementation overrided
    jest.spyOn(repository, 'saveOrUpdate').mockImplementationOnce(() => Promise.resolve());

    const savedAccount = await sysUnderTest({
      accountCreateParams: defaultAccountCreateParams,
      repository
    });

    expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
  });
});
