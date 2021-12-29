import UserModel from '@models/user-model';

describe('Tests for User Model', () => {
  it('it should be ok', () => {
    const user = new UserModel();

    user.name = 'Reginaldo';

    expect(user).toBeDefined();
    expect(user.name).toEqual('Reginaldo');
  });
});
