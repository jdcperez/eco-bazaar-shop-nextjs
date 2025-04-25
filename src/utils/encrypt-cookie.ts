// utils/cookies.ts
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import crypto, {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';

const SECRET_KEY = process.env.NEXT_PUBLIC_COOKIES_SECRET_KEY as string;

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

const GetKeyAndIV = (): { key: Buffer; iv: Buffer } => {
  const key = createHash('sha256').update(SECRET_KEY).digest();
  const iv = randomBytes(IV_LENGTH);
  return { key, iv };
};

export const EncryptString = (text: string): string => {
  const { key, iv } = GetKeyAndIV();
  // @ts-ignore
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv.toString('base64')}:${encrypted}`;
};

export const DecryptString = (encrypted: string): string => {
  const [iv, encryptedText] = encrypted.split(':');
  const key = createHash('sha256').update(SECRET_KEY).digest();
  //@ts-ignore
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'base64'));
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const SetEncryptedCookie = (
  key: string,
  value: any,
  options: any = {}
): void => {
  console.log(key)
  console.log(value)
  console.log(options)

  const encryptedValue = EncryptString(value);
  const additional_options = {
    maxAge: DEFAULT_MAX_AGE,
    ...options,
  };
  setCookie(key, encryptedValue, additional_options);
};

export const GetDecryptedCookie = (
  key: string,
  options: any = {}
): string | null => {
  const cookieValue = getCookie(key, options) as string;
  if (!cookieValue) return null;
  return DecryptString(cookieValue);
};

export const DeleteEncryptedCookie = (key: string, options: any = {}): void => {
  deleteCookie(key, options);
};
