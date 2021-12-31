import * as repository from '@repositories/index';
import { createAccountServiceFunctionalWithoutDI } from '@services/index';
import { defaultAccountCreateParams } from '@tests/mocks';

// mock all module in file
// jest.mock('@repositories/account-fake-functional-repository');

// mock only accountFakeSaveOrUpdate module function
jest.mock('@repositories/account-fake-functional-repository', () => ({
  accountFakeSaveOrUpdate: jest.fn().mockImplementation()
}));

describe('Tests for createAccountServiceFunctionalWithoutDI', () => {
  const sysUnderTest = createAccountServiceFunctionalWithoutDI;

  it('Should create account with mock return of accountFakeSaveOrUpdate repository method', async () => {
    // accountFakeSaveOrUpdate repository implementation not will called, because it resolve value is mocked
    const repositorySpy = jest.spyOn(repository, 'accountFakeSaveOrUpdate').mockResolvedValueOnce();

    await sysUnderTest(defaultAccountCreateParams);

    expect(repositorySpy).toHaveBeenCalled();
  });

  it('Should create account with mock implementation of accountFakeSaveOrUpdate repository method', async () => {
    // accountFakeSaveOrUpdate repository implementation not will called, because it implementation overrided
    jest
      .spyOn(repository, 'accountFakeSaveOrUpdate')
      .mockImplementationOnce(() => Promise.resolve());

    const savedAccount = await sysUnderTest(defaultAccountCreateParams);

    expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
  });
});
