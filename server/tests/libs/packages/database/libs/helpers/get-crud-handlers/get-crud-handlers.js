import {
  FIRST_ARRAY_ELEMENT_IDX,
  KNEX_SELECT_ONE_RECORD
} from '../../constants/constants.js';

const getCrudHandlers = knex => {
  const remove = ({ table, condition }) => {
    return knex(table)
      .where({ ...condition })
      .del();
  };

  const update = async ({ table, condition, data, returning = ['*'] }) => {
    return knex(table)
      .where({ ...condition })
      .update(data, returning);
  };

  const select = async ({
    table,
    condition = {},
    conditionRaw,
    conditionNot = {},
    columns = [],
    limit,
    offset,
    joins = []
  }) => {
    const query = knex(table)
      .where(condition)
      .modify(scope => {
        if (!conditionRaw?.length) {
          return scope;
        }

        const [conditionKey, value] = conditionRaw;
        return scope.whereRaw(`${conditionKey} = ?`, [value]);
      })
      .modify(scope => {
        if (Object.keys(conditionNot).length === 0) {
          return scope;
        }
        return scope.whereNot({ ...conditionNot });
      })
      .modify(scope => {
        if (!limit) {
          return scope;
        }
        return scope.limit(limit);
      })
      .modify(scope => {
        if (!offset) {
          return scope;
        }
        return scope.offset(offset);
      })
      .modify(scope => {
        if (!columns || columns.length === 0) {
          return scope.select(['*']);
        }
        return scope.select(columns);
      })
      .modify(scope => {
        if (joins.length > 0) {
          return scope;
        }
        for (const index of joins) {
          const [foreignTable, foreignKey, onTable] = index;
          scope.join(foreignTable, foreignKey, onTable);
        }
        return scope;
      });

    const result = await query;

    if (!result || result.length === 0) {
      throw new Error(`Nothing in ${table} was found`);
    }

    if (limit === KNEX_SELECT_ONE_RECORD) {
      return result[FIRST_ARRAY_ELEMENT_IDX];
    }

    return result;
  };

  const insert = async ({ table, data, returning = [] }) => {
    const toInsert = Array.isArray(data) ? data : [data];

    return knex(table)
      .insert(toInsert)
      .modify(scope => {
        if (!returning || returning.length === 0) {
          return scope.returning(['*']);
        }
        return scope.select(returning);
      });
  };

  const count = async ({ table, condition = {}, conditionNot = [], joins }) => {
    const result = await knex(table)
      .where({ ...condition })
      .modify(scope => {
        if (conditionNot.length === 0) {
          return scope;
        }
        for (const conditionKey of conditionNot) {
          if (Object.keys(conditionKey).length > 0) {
            scope.whereNot({ ...conditionKey });
          }
        }
        return scope;
      })
      .modify(scope => {
        if (joins?.length) {
          for (const index of joins) {
            const [foreignTable, foreignKey, onTable] = index;
            scope.join(foreignTable, foreignKey, onTable);
          }
          return scope;
        }
        return scope;
      })
      .count(`${table}.id`);

    if (result?.length) {
      return Number(result[FIRST_ARRAY_ELEMENT_IDX].count);
    }

    return result;
  };

  const rawQuery = async query => {
    const result = await knex.raw(query);

    return result?.rows;
  };

  return { remove, update, select, insert, count, rawQuery };
};

export { getCrudHandlers };
