import { AccountFakeRepository } from '@repositories/index';
import { CreateAccountServiceWithDI } from '@services/index';
import { defaultAccountCreateParams } from '@tests/mocks';

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
      const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

      await sysUnderTest.execute(defaultAccountCreateParams);

      // check pass parameters to saveOrUpdate repository implementation
      expect(repositorySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          _cpf: '99988877722',
          _name: 'user'
        })
      );
    });
  });

  describe('stubs', () => {
    it('Should create account with saveOrUpdate stub repository method', async () => {
      const _sysUnderTest = new CreateAccountServiceWithDI({
        saveOrUpdate: jest.fn(),
        delete: jest.fn(),
        findById: jest.fn()
      });

      const savedAccount = await _sysUnderTest.execute(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });
  });

  describe('mocks', () => {
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
