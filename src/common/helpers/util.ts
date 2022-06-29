import bcrypt from 'bcrypt';
import _ from 'lodash';

export function convertEnumToValues(enumType: any): any[] {
    type EnumValueType = [`${typeof enumType}`];
    const values: EnumValueType[] = Object.values(enumType);
    return values;
}

export function genPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
}

export function columnsWithAlias(
    tables: { alias: string; columns: string[] }[],
): string[] {
    return _.concat(
        ...tables.map((table) =>
            table.columns.map((column) => `${table.alias}.${column}`),
        ),
    );
}
