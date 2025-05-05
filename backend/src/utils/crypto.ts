import crypto from 'node:crypto'

export const hashPassword = (password: string) => {
	const salt = crypto.randomBytes(16).toString('hex');
	const iterations = 100000;
	const keyLength = 64;
	const digest = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512').toString('hex');
	const newPassword = `${salt}:${iterations}:${keyLength}:${digest}`;
	return newPassword;
}

export const comparePasswords = (inputPassword: string, storedPassword: string) => {
	const [salt, iterations, keyLength, originalDigest] = storedPassword.split(':');
	const derivedKey = crypto.pbkdf2Sync(inputPassword, salt, parseInt(iterations), parseInt(keyLength), 'sha512').toString('hex');
	return derivedKey === originalDigest;
};