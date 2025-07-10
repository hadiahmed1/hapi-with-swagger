import test from './test';

export const name = 'base-route';
export const version = '1.0.0';
export function register(server, options) {
	server.route(test);
}