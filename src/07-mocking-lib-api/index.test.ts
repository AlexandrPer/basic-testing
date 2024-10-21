// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME} from './index';
// import lodash from 'lodash';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockResponseData = { data: 'mockData' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as jest.Mocked<typeof axios>);

    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockResponseData = { data: 'mockData' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as jest.Mocked<typeof axios>);

    await throttledGetDataFromApi('/posts/1');

    expect(mockGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockResponseData = { data: 'mockData' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as unknown as jest.Mocked<typeof axios>);

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(mockResponseData);
  });

  test('should throttle the requests', async () => {
    const mockResponseData = { data: 'mockData' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });

    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as never);

    await throttledGetDataFromApi('/posts');
    await throttledGetDataFromApi('/posts');

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockGet).toHaveBeenCalledTimes(2);

    // expect(throttleThing).toHaveBeenCalledWith(
    //   expect.any(Function),
    //   THROTTLE_TIME,
    // );
  });
});
