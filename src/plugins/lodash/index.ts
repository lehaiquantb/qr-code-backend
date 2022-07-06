import _ from 'lodash';
declare module 'lodash' {
    interface LoDashStatic {
        toNumberDefault(value: any, defaultValue: number): number;
    }
}

_.mixin({
    toNumberDefault: function (value: any, defaultValue: number) {
        const val = _.toNumber(value);
        if (!!defaultValue && isNaN(val)) {
            return defaultValue;
        } else return val;
    },
});
