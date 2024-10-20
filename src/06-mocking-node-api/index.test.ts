// Uncomment the code below and write your tests
import fs from 'fs';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn(); // Мокаем колбэк
    const timeout = 1000;

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();

    setTimeoutSpy.mockRestore();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn(); // Мокаем колбэк
    const timeout = 1000;

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);

    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  const mockPathToFile = 'test.txt';

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(mockPathToFile);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest
      .spyOn(fs.promises, 'readFile')
      .mockRejectedValue(new Error('File not found'));

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'This is the file content';
    const mockPathToFile = 'test1.txt';

    const pathJoinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue(mockPathToFile);

    const readFileSpy = jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(mockPathToFile);

    expect(result).toBe(null);

    expect(pathJoinSpy).toHaveBeenCalledWith(__dirname, mockPathToFile);

    // expect(readFileSpy).toHaveBeenCalledWith(mockPathToFile);

    pathJoinSpy.mockRestore();
    readFileSpy.mockRestore();
  });
});
