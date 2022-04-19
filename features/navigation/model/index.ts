import {forward, sample} from 'effector';
import {setAppState} from 'features/app/model/events';
import {toPageFx} from 'features/navigation/model/effects';
import {setCurrentLinks, toMain, toPage} from 'features/navigation/model/events';
import {authorizedLinks, unauthorizedLinks} from 'features/navigation/model/stores';
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

sample({
    clock: setAppState,
    fn: state => (state === 'AUTHORIZED' ? authorizedLinks : unauthorizedLinks),
    target: setCurrentLinks,
});
