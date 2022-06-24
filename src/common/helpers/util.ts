export function convertEnumToValues(enumType: any): any[] {
    type EnumValueType = [`${typeof enumType}`];
    const values: EnumValueType[] = Object.values(enumType);
    return values;
}
