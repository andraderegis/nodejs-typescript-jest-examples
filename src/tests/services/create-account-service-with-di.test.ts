import { AccountFakeRepository } from '@repositories/index';
import { CreateAccountServiceWithDI } from '@services/index';
import { defaultAccountCreateParams } from '@tests/mocks';

describe('Tests for CreateAccountServiceWithDI', () => {
  const repository = new AccountFakeRepository();

  const sysUnderTest = new CreateAccountServiceWithDI(repository);

  it('Should call saveOrUpdate repository method', async () => {
    // saveOrUpdate repository implementation  will called, because we are only spying the function
    const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

    await sysUnderTest.execute(defaultAccountCreateParams);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });

  it('Should create account with mock return of saveOrUpdate repository method', async () => {
    // saveOrUpdate repository implementation not will called, because it resolve value is mocked
    const repositorySpy = jest.spyOn(repository, 'saveOrUpdate').mockResolvedValueOnce();

    await sysUnderTest.execute(defaultAccountCreateParams);

    expect(repositorySpy).toHaveBeenCalled();
  });

  it('Should create account with mock implementation of saveOrUpdate repository method', async () => {
    // saveOrUpdate repository implementation not will called, because it implementation overrided
    jest.spyOn(repository, 'saveOrUpdate').mockImplementationOnce(() => Promise.resolve());

    const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

    expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
  });
});
