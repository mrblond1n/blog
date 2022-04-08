import {decrementScore, incrementScore} from 'features/example/model/events';
import {createStore} from 'effector';

export const $score = createStore<number>(0)
    .on(incrementScore, value => value + 1)
    .on(decrementScore, value => value - 1);
