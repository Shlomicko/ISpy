import {IDeserializable} from './ideserializable.model';

export class Mission implements IDeserializable{

  agent: string;
  country: string;
  address: string;
  date: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}


