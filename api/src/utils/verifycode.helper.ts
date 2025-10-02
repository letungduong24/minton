import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

type VerifyCode = {
  code: string;
  userId?: number;
  expiredAt: Date;
}

export class VerifyCodeHelper {
static createForUser(userId: number) {
  return {
    code: uuidv4(),
    userId, 
    expiredAt: dayjs().add(15, 'minute').toDate()
  }
}

static createNested() {
  return {
    code: uuidv4(),
    expiredAt: dayjs().add(15, 'minute').toDate()
  }
}



  static isExpired(verifyCode: VerifyCode): boolean {
    return dayjs().isAfter(dayjs(verifyCode.expiredAt));
  }

}
