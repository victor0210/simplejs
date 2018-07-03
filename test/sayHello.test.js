import {sayHello} from './sayHello'

test('say hello should be say hello', () => {
	expect(sayHello('say hello')).toBe('say hello')
})