import { CreateAccountServiceWithoutDI } from '@services/index';
import { defaultAccountCreateParams } from '@tests/mocks';

const saveOrUpdateMock = jest.fn();

// mock only saveOrUpdate from AccountFakeRepository
jest.mock('@repositories/index', () => ({
  AccountFakeRepository: jest.fn().mockImplementation(() => ({
    saveOrUpdate: saveOrUpdateMock
  }))
}));

describe('Tests for CreateAccountServiceWithoutDI', () => {
  const sysUnderTest = new CreateAccountServiceWithoutDI();

  beforeAll(() => {
    saveOrUpdateMock.mockResolvedValueOnce({});
  });

  it('Should call saveOrUpdate repository method', async () => {
    await sysUnderTest.execute(defaultAccountCreateParams);

    // saveOrUpdate repository implementation  will called, because we are only spying the function
    expect(saveOrUpdateMock).toHaveBeenCalledTimes(1);
  });

  it('Should create account with mock implementation of saveOrUpdate repository', async () => {
    // saveOrUpdate repository implementation not will called, because it resolve value is mocked
    const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

    expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
  });
});
