// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// jsdom doesn't implement HTMLMediaElement play/pause — mock them for tests
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
	configurable: true,
	value: function () {
		return Promise.resolve();
	},
});
Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
	configurable: true,
	value: function () {},
});
