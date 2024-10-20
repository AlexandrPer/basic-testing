// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test value';
    expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'custom error message';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throw new MyAwesomeError();
    }).toThrow('This is my awesome custom error!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwError(throwCustomError())).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
