import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

/**
 * @overview Provides utility functions for file system
 */

/**
 * Allows ES5 requires
 *
 * @readonly
 * @const {NodeRequire} require
 */
export const require = createRequire(import.meta.url);

/**
 * Root directory of the project
 *
 * @readonly
 * @const {string} __dirname
 */
export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");

/**
 * Constructs a path starting at the root directory
 *
 * @example
 * ```js
 * pathFromRoot("public", "homepage.html");
 * // ES5 equivalent
 * path.join(__dirname, "public", "homepage.html");
 * ```
 *
 * @param  {...string} args Strings to join to directory
 * @returns {string} Constructed path
 */
export const pathFromRoot = (...args) => join(__dirname, ...args);

/**
 * Generates a random integer between the `min` and `max`
 *  values provided, inclusively.
 *
 * @example
 * ```js
 * randomInt(0, 2); // 0, 1, or 2
 * ```
 *
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number} Random integer
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
