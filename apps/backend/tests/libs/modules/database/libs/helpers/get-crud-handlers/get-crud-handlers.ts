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
    condition,
    table
  }: RemoveParameters<T>): Promise<Record<string, unknown>[]> => {
    const knex = getKnex();

    return knex(table)
      .where({ ...condition })
      .del();
  };

  const update = <T extends Record<string, unknown>>({
    condition,
    data,
    returning = ['*'],
    table
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
    columns = [],
    condition = {},
    conditionNot = {},
    conditionRaw,
    joins = [],
    limit,
    offset,
    table
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
        if (Object.keys(conditionNot).length === NO_RECORDS) {
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
        if (columns.length === NO_RECORDS) {
          return scope.select(['*']);
        }

        return scope.select(columns);
      })
      .modify(scope => {
        if (joins.length > NO_RECORDS) {
          return scope;
        }

        for (const index of joins) {
          const [foreignTable, foreignKey, onTable] = index;
          void scope.join(foreignTable, foreignKey, onTable);
        }

        return scope;
      })) as T[];

    if (result.length === NO_RECORDS) {
      throw new Error(`Nothing in ${table} was found`);
    }

    if (limit === KNEX_SELECT_ONE_RECORD) {
      return result[FIRST_ARRAY_ELEMENT_IDX] as T;
    }

    return result;
  };

  const insert = <T extends Record<string, unknown>, K extends T>({
    data,
    returning = [],
    table
  }: InsertParameters<T>): Promise<K[]> => {
    const knex = getKnex();

    const toInsert = Array.isArray(data) ? data : [data];

    return knex(table)
      .insert(toInsert)
      .modify(scope => {
        if (returning.length === NO_RECORDS) {
          return scope.returning(['*']);
        }

        return scope.select(returning);
      }) as Promise<K[]>;
  };

  const count = async <
    T extends Record<string, unknown>,
    K extends Record<string, unknown>
  >({
    condition = {},
    conditionNot = [],
    joins,
    table
  }: CountParameters<T, K>): Promise<number> => {
    const knex = getKnex();

    const result: Record<'count', number>[] = await knex(table)
      .where({ ...condition })
      .modify(scope => {
        if (conditionNot.length > NO_RECORDS) {
          return scope;
        }

        for (const conditionKey of conditionNot) {
          if (Object.keys(conditionKey).length > NO_RECORDS) {
            void scope.whereNot({ ...conditionKey });
          }
        }

        return scope;
      })
      .modify(scope => {
        if (!joins?.length) {
          return scope;
        }

        for (const index of joins) {
          const [foreignTable, foreignKey, onTable] = index;
          void scope.join(foreignTable, foreignKey, onTable);
        }

        return scope;
      })
      .count(`${table}.id`);

    return (
      (result[FIRST_ARRAY_ELEMENT_IDX] as Record<'count', number | undefined>)
        .count ?? NO_RECORDS
    );
  };

  const rawQuery = async <T extends Record<string, unknown>>(
    query: string
  ): Promise<T[]> => {
    const knex = getKnex();

    const result = await knex.raw<Record<'rows', T[]> | undefined>(query);

    return result?.rows as T[];
  };

  return { count, insert, rawQuery, remove, select, update };
};

export { getCrudHandlers };
