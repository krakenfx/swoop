import { pbkdf2Sync } from 'crypto';

/**
 * Derive key from the specified password. Magic constants courtesy of
 * https://github.com/ethereum/pyethsaletool/blob/master/pyethsaletool.py#L43
 */
export default function passwordToKey(password) {
  return pbkdf2Sync(password, password, 2000, 256, 'sha256').slice(0, 16);
}
