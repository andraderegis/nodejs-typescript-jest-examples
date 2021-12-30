import { AccountCreateParams } from '@entities/index';
import { CreateAccountServiceWithoutDI } from '@services/index';

const defaultAccountCreateParams = {
  name: 'Aerith',
  cpf: '99988877722'
} as AccountCreateParams;

const saveOrUpdateMock = jest.fn();

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

    expect(saveOrUpdateMock).toHaveBeenCalledTimes(1);
  });

  it('Should create account with mock implementation of saveOrUpdate repository', async () => {
    const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

    expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
  });
});
