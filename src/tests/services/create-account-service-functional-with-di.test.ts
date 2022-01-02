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
    it('Should call and create account with saveOrUpdate stub repository method', async () => {
      // saveOrUpdate repository implementation with stub
      const repositoryStub = {
        saveOrUpdate: jest.fn().mockResolvedValue({})
      };

      const savedAccount = await sysUnderTest({
        accountCreateParams: defaultAccountCreateParams,
        repository: repositoryStub
      });

      expect(repositoryStub.saveOrUpdate).toHaveBeenCalledTimes(1);
      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
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
