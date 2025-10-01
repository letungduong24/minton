import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static async Hash(password: string): Promise<string> {
    const saltOrRounds = 10; 
    const salt = await bcrypt.genSalt(saltOrRounds);
    return await bcrypt.hash(password, salt);
  }

  static async Compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
