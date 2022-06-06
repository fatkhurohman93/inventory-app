import { Op, WhereOperators, WhereOptions } from 'sequelize';

export const filterByName = (name: string) => {
  const condition: WhereOptions = name
    ? { name: { [Op.like]: `%${name}%` } }
    : {};
  return condition;
};
