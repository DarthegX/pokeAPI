import indexRouter from '../src/routes/index'

const useDisableSpy = jest.fn();
const useSpy = jest.fn();
const listenSpy = jest.fn();

jest.doMock('express', () => {
  return () => ({
    disable: useDisableSpy,
    use: useSpy,
    listen: listenSpy,
  });
});

describe('should test server configuration', () => {
  test('should run express server', async () => {
    require('../src/app.js');
    expect(listenSpy).toHaveBeenCalled();
  });
});