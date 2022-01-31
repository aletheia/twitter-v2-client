import nconf from 'nconf';
import dotenv from 'dotenv';
import {injectable} from 'tsyringe';

@injectable()
export class Config {
  constructor() {
    dotenv.config();
    nconf.env();
  }

  get(key: string): string {
    const value = nconf.get(key);
    if (value === undefined) {
      throw new Error(`Config key ${key} not found`);
    }
    return value;
  }
}
