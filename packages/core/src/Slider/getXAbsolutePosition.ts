/**
 * Finds the x position on a horizontal line and
 * returns a number between 0 - 100 representing
 * percent.
 */
export const getXAbsolutePosition = (min: number, max: number, x: number) => {
	if (x < min || x > max) {
		throw new Error(
			`Invalid parameters. X (${x}) must be equal or between min (${min}) and max ${max}`
		)
	}

	// How far X is from left
	const xFromLeft = x - min

	// Total length between min and max
	const length = max - min

	return (xFromLeft / length) * 100
}
