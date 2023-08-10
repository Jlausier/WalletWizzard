import { fileURLToPath } from "url";
import { dirname, join } from "path";
/**
 * @overview Provides utility functions for file system
 */

/**
 * Root directory of the project
 *
 * @readonly
 * @constant {string} __dirname
 */
export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../");
