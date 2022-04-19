import {forward} from 'effector';
import {toPageFx} from 'features/navigation/model/effects';
import {toMain, toPage} from 'features/navigation/model/events';
import './effects';
import './stores';

forward({
    from: toPage,
    to: toPageFx,
});

forward({
    from: toMain,
    to: toPage.prepend(() => '/'),
});
