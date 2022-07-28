import { ColumnOfEntityWithAlias, BaseEntity } from '~common';
import bcrypt from 'bcrypt';
import _, { isNil } from 'lodash';

export function convertEnumToValues(enumType: any): any[] {
    type EnumValueType = [`${typeof enumType}`];
    const values: EnumValueType[] = Object.values(enumType);
    return values;
}

export function genPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.values(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
}

export function columnsWithAlias<T extends BaseEntity>(
    tables: ColumnOfEntityWithAlias<T>[],
): string[] {
    return _.concat(
        ...tables.map((table) => {
            if (typeof table.columns === 'string') {
                return [`${table.alias}.${table.columns}`];
            } else if (_.isArray(table.columns)) {
                return table.columns.map(
                    (column) => `${table.alias}.${column as string}`,
                );
            }
        }),
    );
}

export function isEmptyValue(value: any): boolean {
    return value === '' || isNil(value) || isNaN(value);
}
