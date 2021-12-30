import { AccountCreateParams } from '@entities/index';
import { AccountFakeRepository } from '@repositories/index';
import { CreateAccountServiceWithDI } from '@services/index';

const defaultAccountCreateParams = {
  name: 'Aerith',
  cpf: '99988877722'
} as AccountCreateParams;

describe('Tests for CreateAccountServiceWithDI', () => {
  const repository = new AccountFakeRepository();

  const sysUnderTest = new CreateAccountServiceWithDI(repository);

  it('Should call saveOrUpdate repository method', async () => {
    const repositorySpy = jest.spyOn(repository, 'saveOrUpdate');

    await sysUnderTest.execute(defaultAccountCreateParams);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });

  it('Should create account with mock return of saveOrUpdate repository method', async () => {
    const repositorySpy = jest.spyOn(repository, 'saveOrUpdate').mockResolvedValueOnce();

    await sysUnderTest.execute(defaultAccountCreateParams);

    expect(repositorySpy).toHaveBeenCalled();
  });

  it('Should create account with mock implementation of saveOrUpdate repository method', async () => {
    jest.spyOn(repository, 'saveOrUpdate').mockImplementationOnce(() => Promise.resolve());

    const savedAccount = await sysUnderTest.execute(defaultAccountCreateParams);

    expect(savedAccount).toEqual(expect.objectContaining(defaultAccountCreateParams));
  });
});
