/**
 * Combines multiple CSS module classnames into a single string,
 * filtering out any undefined or falsy values.
 *
 * @param {...(string | undefined | false | null)[]} classNames - CSS module classnames
 * @returns {string} Combined valid classnames as a single string
 *
 * @example
 * cx(styles.button, isActive && styles.active) // => 'button active'
 */
export function cx(
  ...classNames: (string | undefined | false | null)[]
): string {
  return classNames.filter(Boolean).join(" ");
}
