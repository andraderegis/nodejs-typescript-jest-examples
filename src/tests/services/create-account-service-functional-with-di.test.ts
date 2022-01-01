import { defaultAccountCreateParams } from '@tests/mocks';
import { createAccountServiceFunctionalWithDI } from '@services/index';
import { accountFakeSaveOrUpdate } from '@repositories/index';

describe('Tests for createAccountServiceFunctionalWithDI', () => {
  const sysUnderTest = createAccountServiceFunctionalWithDI;

  const repository = {
    saveOrUpdate: accountFakeSaveOrUpdate
  };

  describe('spies', () => {
    it('Should call saveOrUpdate repository method', async () => {
      // saveOrUpdate repository implementation  will called, because we are only spying the function
      const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

      await sysUnderTest({
        accountCreateParams: defaultAccountCreateParams,
        repository
      });

      expect(repositorySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('stubs', () => {
    it('Should call saveOrUpdate repository method', async () => {
      // saveOrUpdate repository implementation with mock stub
      const repositoryMock = {
        saveOrUpdate: jest.fn()
      };

      await sysUnderTest({
        accountCreateParams: defaultAccountCreateParams,
        repository: repositoryMock
      });

      expect(repositoryMock.saveOrUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('mocks with spy', () => {
    it('Should create account with saveOrUpdate repository method mock return ', async () => {
      // saveOrUpdate repository implementation not will called, because it resolve value is mocked
      const repositorySpy = jest.spyOn(repository, 'saveOrUpdate').mockResolvedValueOnce();

      await sysUnderTest({
        accountCreateParams: defaultAccountCreateParams,
        repository
      });

      expect(repositorySpy).toHaveBeenCalled();
    });

    it('Should create account with saveOrUpdate repository method mock implementation', async () => {
      // saveOrUpdate repository implementation not will called, because it implementation overrided
      jest.spyOn(repository, 'saveOrUpdate').mockImplementationOnce(() => Promise.resolve());

      const savedAccount = await sysUnderTest({
        accountCreateParams: defaultAccountCreateParams,
        repository
      });

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });
  });
});
