/**
 * Positive remainder operator
 *
 * @param dividend
 * @param divisor
 */
export const remainder = (dividend: number, divisor: number) =>
	((dividend % divisor) + divisor) % divisor
