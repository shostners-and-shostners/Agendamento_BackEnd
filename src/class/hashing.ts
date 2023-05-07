import * as bcrypt from 'bcrypt';
export default class Hashing {
  async hashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, await bcrypt.genSalt());
  }

  async desHashPass(pass: string, passHash: string): Promise<boolean> {
    return await bcrypt.compare(pass, passHash);
  }
}
