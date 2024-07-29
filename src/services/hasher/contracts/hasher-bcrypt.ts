import { Hasher } from '../hasher';
import * as bcrypt from 'bcrypt';

export class HasherBcrypt implements Hasher {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = 10;
  }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.saltRounds);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
