import { Sequelize } from "sequelize";
import { UserConfig } from "../models/index.js";

export const findOrCreateConfig = (type, userId) => {
  return UserConfig.findOrCreate({
    where: {
      userId,
      type,
    },
    defaults: {
      userId,
      type,
    },
  });
};

/** @const scheduledMonth Formats the `scheduled_date` column of a table */
export const scheduledMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%Y-%m`
);

/** @const scheduledMonthAttr Sequelize query attribute for scheduled month */
export const scheduledMonthAttr = [scheduledMonth, "month"];

export const formattedMonth = Sequelize.fn(
  "date_format",
  Sequelize.col("scheduled_date"),
  `%b %y`
);

export const formattedMonthAttr = [formattedMonth, "label"];

/** @const sumAmount Sequelize aggregate function to sum a numeric amount */
export const sumAmount = [Sequelize.fn("SUM", Sequelize.col("amount")), "sum"];

/** @const testUserId Test {@linkcode User} UUID string */
export const testUserId = "7f95751e-e2a9-4aeb-a866-801c0902ca21";

/**
 * Returns query options for finding objects associated with a user
 *
 * @param {string} userId
 * @returns {Object}
 */
export const queryOptionsUser = (userId) => {
  return {
    where: { userId },
    raw: true,
    attributes: [],
  };
};
