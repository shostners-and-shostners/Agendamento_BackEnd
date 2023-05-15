import * as bcrypt from 'bcrypt';
export default class Hashing {
  async hashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, await bcrypt.genSalt());
  }

  async desHashPass(pass: string, passHash: string): Promise<boolean> {
    return await bcrypt.compare(pass, passHash);
  }

  async genSalt() {
    return await bcrypt.genSaltSync();
  }

  async pegarCharsAleatorios(length: number) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = chars.length;
    let counter = 0;
    while (counter < length) {
      result += chars.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
