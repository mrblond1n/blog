import {forward, sample} from 'effector';
import {setAppState} from 'features/common/app/model/events';
import {toPageFx} from 'features/common/navigation/model/effects';
import {setCurrentLinks, toMain, toPage} from 'features/common/navigation/model/events';
import {authorizedLinks, unauthorizedLinks} from 'features/common/navigation/model/stores';
import 'features/common/navigation/model/effects';
import 'features/common/navigation/model/stores';

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
