export default function wait(duration = 0, returnValue = true) {
	return new Promise(r => setTimeout(() => r(returnValue), duration));
}