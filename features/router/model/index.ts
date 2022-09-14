import {forward, split} from 'effector';
import {$appState} from 'features/app/model/stores';

import {toPageFx} from 'features/router/model/effects';
import 'features/router/model/effects';
import {toMain, toPage} from 'features/router/model/events';
import {setLinks} from 'features/router/model/stores';
import 'features/router/model/stores';

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
