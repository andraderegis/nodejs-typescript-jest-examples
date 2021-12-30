import { v4 as uuid } from 'uuid';

import { IEntity } from 'interfaces';

export type AccountCreateParams = {
  id: string;
  cpf: string;
  name: string;
  createdAt?: Date;
};

type AccountCreateParamsConstructor = {
  createdAt: Date;
} & AccountCreateParams;

export class Account implements IEntity {
  protected _id: string;

  protected _cpf: string;

  protected _name: string;

  protected _createdAt: Date;

  private constructor({ id, cpf, name, createdAt }: AccountCreateParamsConstructor) {
    this._id = id;
    this._cpf = cpf;
    this._name = name;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  get cpf() {
    return this._cpf;
  }

  get name() {
    return this._name;
  }

  get createAt() {
    return this._createdAt;
  }

  static create({ cpf, name, createdAt }: AccountCreateParams): Account {
    return new Account({
      id: uuid(),
      name,
      cpf,
      createdAt: createdAt ?? new Date()
    });
  }
}
