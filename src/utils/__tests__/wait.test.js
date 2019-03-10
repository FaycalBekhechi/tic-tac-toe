import wait from '../wait';

jest.useFakeTimers();

describe('wait', () => {
	it('should wait and return correct value', async () => {
		expect.assertions(1);
		jest.setTimeout(100);
		const promise = wait(100, 1556);
		jest.runAllTimers();
		const result = await promise;
		expect(result).toEqual(1556);
	});
});