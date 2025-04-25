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

const getKeyAndIV = (): { key: Buffer; iv: Buffer } => {
  const key = createHash('sha256').update(SECRET_KEY).digest();
  const iv = randomBytes(IV_LENGTH);
  return { key, iv };
};

export const encrypt = (text: string): string => {
  const { key, iv } = getKeyAndIV();
  // @ts-ignore
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv.toString('base64')}:${encrypted}`;
};

export const decrypt = (encrypted: string): string => {
  const [iv, encryptedText] = encrypted.split(':');
  const key = createHash('sha256').update(SECRET_KEY).digest();
  //@ts-ignore
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'base64'));
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const setEncryptedCookie = (
  key: string,
  value: any,
  options: any = {}
): void => {
  const encryptedValue = encrypt(value);
  const additional_options = {
    maxAge: DEFAULT_MAX_AGE,
    ...options,
  };
  setCookie(key, encryptedValue, additional_options);
};

export const getDecryptedCookie = (
  key: string,
  options: any = {}
): string | null => {
  const cookieValue = getCookie(key, options) as string;
  if (!cookieValue) return null;
  return decrypt(cookieValue);
};

export const deleteEncryptedCookie = (key: string, options: any = {}): void => {
  deleteCookie(key, options);
};