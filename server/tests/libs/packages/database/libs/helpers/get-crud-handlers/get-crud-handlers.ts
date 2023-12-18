import {
  FIRST_ARRAY_ELEMENT_IDX,
  KNEX_SELECT_ONE_RECORD
} from '../../constants/constants.js';
import {
  type CountParameters,
  type GetCrudHandlersFunction,
  type InsertParameters,
  type RemoveParameters,
  type SelectParameters,
  type UpdateParameters
} from '../../types/types.js';

const NO_RECORDS = 0;

const getCrudHandlers: GetCrudHandlersFunction = getKnex => {
  const remove = <T extends Record<string, unknown>>({
    table,
    condition
  }: RemoveParameters<T>): Promise<Record<string, unknown>[]> => {
    const knex = getKnex();

    return knex(table)
      .where({ ...condition })
      .del();
  };

  const update = <T extends Record<string, unknown>>({
    table,
    condition,
    data,
    returning = ['*']
  }: UpdateParameters<T>): Promise<T[]> => {
    const knex = getKnex();

    return knex(table)
      .where({ ...condition })
      .update(data, returning) as Promise<T[]>;
  };

  const select = async <
    T extends Record<string, unknown>,
    K extends Record<string, unknown>
  >({
    table,
    condition = {},
    conditionRaw,
    conditionNot = {},
    columns = [],
    limit,
    offset,
    joins = []
  }: SelectParameters<T, K>): Promise<T | T[]> => {
    const knex = getKnex();

    const result: T[] = (await knex(table)
      .where({ ...condition })
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
          void scope.join(foreignTable, foreignKey, onTable);
        }

        return scope;
      })) as T[];

    if (!result || result.length === 0) {
      throw new Error(`Nothing in ${table} was found`);
    }

    if (limit === KNEX_SELECT_ONE_RECORD) {
      return result[FIRST_ARRAY_ELEMENT_IDX] as T;
    }

    return result as T[];
  };

  const insert = <T extends Record<string, unknown>, K extends T>({
    table,
    data,
    returning = []
  }: InsertParameters<T>): Promise<K[]> => {
    const knex = getKnex();

    const toInsert = Array.isArray(data) ? data : [data];

    return knex(table)
      .insert(toInsert)
      .modify(scope => {
        if (!returning || returning.length === 0) {
          return scope.returning(['*']);
        }

        return scope.select(returning);
      }) as Promise<K[]>;
  };

  const count = async <
    T extends Record<string, unknown>,
    K extends Record<string, unknown>
  >({
    table,
    condition = {},
    conditionNot = [],
    joins
  }: CountParameters<T, K>): Promise<number> => {
    const knex = getKnex();

    const result: Record<'count', number>[] = await knex(table)
      .where({ ...condition })
      .modify(scope => {
        if (conditionNot.length === 0) {
          return scope;
        }
        for (const conditionKey of conditionNot) {
          if (Object.keys(conditionKey).length > 0) {
            void scope.whereNot({ ...conditionKey });
          }
        }

        return scope;
      })
      .modify(scope => {
        if (joins?.length) {
          for (const index of joins) {
            const [foreignTable, foreignKey, onTable] = index;
            void scope.join(foreignTable, foreignKey, onTable);
          }

          return scope;
        }

        return scope;
      })
      .count(`${table}.id`);

    return Number(
      (result[FIRST_ARRAY_ELEMENT_IDX] as Record<'count', number>).count ??
        NO_RECORDS
    );
  };

  const rawQuery = async <T extends Record<string, unknown>>(
    query: string
  ): Promise<T[]> => {
    const knex = getKnex();

    const result = await knex.raw<Record<'rows', T[]>>(query);

    return result?.rows as T[];
  };

  return { remove, update, select, insert, count, rawQuery };
};

export { getCrudHandlers };
