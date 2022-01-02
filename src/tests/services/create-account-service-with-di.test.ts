import { AccountFakeRepository } from '@repositories/index';
import { CreateAccountServiceWithDI } from '@services/index';
import { defaultAccountCreateParams } from '@tests/dummies';

describe('Tests for CreateAccountServiceWithDI', () => {
  const repository = new AccountFakeRepository();

  const sysUnderTest = new CreateAccountServiceWithDI(repository);

  describe('spies', () => {
    it('Should call saveOrUpdate repository method', async () => {
      // saveOrUpdate repository implementation  will called, because we are only spying the function
      const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

      await sysUnderTest.execute(defaultAccountCreateParams);

      expect(repositorySpy).toHaveBeenCalledTimes(1);
    });

    it('Should call saveOrUpdate repository method, checking cpf and name parameters ', async () => {
      // saveOrUpdate repository implementation  will called, because we are only spying the function
      const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

      await sysUnderTest.execute(defaultAccountCreateParams);

      // checking passed parameters for saveOrUpdate function
      expect(repositorySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          _cpf: defaultAccountCreateParams.cpf,
          _name: defaultAccountCreateParams.name
        })
      );
    });
  });

  describe('stubs', () => {
    it('Should call and create account with saveOrUpdate stub repository method', async () => {
      // repository implementation with stub
      const repositoryStub = {
        saveOrUpdate: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
        findById: jest.fn().mockResolvedValue(defaultAccountCreateParams)
      };

      const _sysUnderTest = new CreateAccountServiceWithDI(repositoryStub);

      const savedAccount = await _sysUnderTest.execute(defaultAccountCreateParams);

      expect(repositoryStub.saveOrUpdate).toBeCalledTimes(1);
      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });
  });

  describe('mocks with spy', () => {
    it('Should create account with saveOrUpdate repository method', async () => {
      // saveOrUpdate repository implementation not will called, because it resolve value is mocked
      jest.spyOn(repository, 'saveOrUpdate').mockResolvedValueOnce();

      const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });

    it('Should create account with saveOrUpdate repository method mock implementation', async () => {
      // saveOrUpdate repository implementation not will called, because it implementation overrided
      jest.spyOn(repository, 'saveOrUpdate').mockImplementationOnce(() => Promise.resolve());

      const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });
  });
});
