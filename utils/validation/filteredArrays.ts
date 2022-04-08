import {either} from 'fp-ts/Either';
import {withValidate} from 'io-ts-types';
import * as t from './index';

export const filteredArray = <C extends t.Any>(codec: C) =>
    withValidate(t.array(codec), (u, c) =>
        either.map(t.withFallback(t.array(t.nullable(codec)), []).validate(u, c), v =>
            v.filter(value => value !== null)
        )
    );
