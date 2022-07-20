import {forward, split} from 'effector';
import {$appState} from 'features/common/app/model/stores';

import {toPageFx} from 'features/common/navigation/model/effects';
import 'features/common/navigation/model/effects';
import {toMain, toPage} from 'features/common/navigation/model/events';
import {setLinks} from 'features/common/navigation/model/stores';
import 'features/common/navigation/model/stores';

forward({
    from: toPage,
    to: toPageFx,
});

forward({
    from: toMain,
    to: toPage.prepend(() => '/'),
});

split({
    source: $appState,
    match: {
        authorized: state => state === 'AUTHORIZED',
    },
    cases: {
        authorized: setLinks.authorize,
        __: setLinks.unAuthorize,
    },
});
