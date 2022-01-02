import * as repository from '@repositories/index';
import { createAccountServiceFunctionalWithoutDI as sysUnderTest } from '@services/index';
import { defaultAccountCreateParams } from '@tests/mocks';

// mock all module in file
// jest.mock('@repositories/account-fake-functional-repository');

// mock only accountFakeSaveOrUpdate module function
jest.mock('@repositories/account-fake-functional-repository', () => ({
  accountFakeSaveOrUpdate: jest.fn()
}));

describe('Tests for createAccountServiceFunctionalWithoutDI', () => {
  describe('spies', () => {
    it('Should call accountFakeSaveOrUpdate repository method', async () => {
      // saveOrUpdate repository implementation  will called, because we are only spying the function
      const repositorySpy = jest.spyOn(repository, 'accountFakeSaveOrUpdate');

      await sysUnderTest(defaultAccountCreateParams);

      expect(repositorySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('mocks with spy', () => {
    it('Should create account with accountFakeSaveOrUpdate repository method mock resolved value', async () => {
      // accountFakeSaveOrUpdate repository implementation not will called, because it resolve value is mocked
      jest.spyOn(repository, 'accountFakeSaveOrUpdate').mockResolvedValueOnce();

      const savedAccount = await sysUnderTest(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });

    it('Should create account with accountFakeSaveOrUpdate repository method mock implementation', async () => {
      // accountFakeSaveOrUpdate repository implementation not will called, because it implementation overrided
      jest
        .spyOn(repository, 'accountFakeSaveOrUpdate')
        .mockImplementationOnce(() => Promise.resolve());

      const savedAccount = await sysUnderTest(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });
  });
});
