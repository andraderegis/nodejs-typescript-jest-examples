import { CreateAccountServiceWithoutDI } from '@services/index';
import { defaultAccountCreateParams } from '@tests/mocks';

const saveOrUpdateMock = jest.fn();

// mock only saveOrUpdate from AccountFakeRepository
jest.mock('@repositories/account-fake-repository', () => ({
  AccountFakeRepository: jest.fn().mockImplementation(() => ({
    saveOrUpdate: saveOrUpdateMock
  }))
}));

describe('Tests for CreateAccountServiceWithoutDI', () => {
  const sysUnderTest = new CreateAccountServiceWithoutDI();

  describe('spies', () => {
    it('Should call saveOrUpdate repository method', async () => {
      await sysUnderTest.execute(defaultAccountCreateParams);

      // saveOrUpdate repository implementation  will called, because we are only spying the function
      expect(saveOrUpdateMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('mocks', () => {
    it('Should create account with saveOrUpdate respository mock resolved value', async () => {
      // saveOrUpdate repository implementation not will called, because it resolve value is mocked
      saveOrUpdateMock.mockResolvedValue({});

      const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });

    it('Should create account with accountFakeSaveOrUpdate repository method mock implementation', async () => {
      saveOrUpdateMock.mockImplementationOnce(() => Promise.resolve());

      const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

      expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
    });
  });
});
