import {INTL} from 'constants/intl';
import {useStoreMap} from 'effector-react';
import {OpenButtonContainer} from 'features/common/comments/menu/containers/OpenButtonContainer';
import {onClose, onOpen, onRemove} from 'features/common/comments/menu/model/events';
import {$accessToMenuIndex, $openMenuIndex} from 'features/common/comments/menu/model/store';
import {Icons} from 'icons';
import React from 'react';
import {Menu} from 'ui/atoms/Menu';
import {MenuItem} from 'ui/atoms/MenuItem';
import {intl} from 'utils/intl';

export const MenuContainer = React.memo(({id}: {id: string}) => {
    const hasAccess = useStoreMap({
        store: $accessToMenuIndex,
        keys: [id],
        defaultValue: false,
        fn: (index, [id]) => index[id],
    });

    if (!hasAccess) return null;

    return <MenuContentContainer id={id} />;
});

const MenuContentContainer = React.memo(({id}: {id: string}) => {
    const isOpened = useStoreMap({
        store: $openMenuIndex,
        keys: [id],
        defaultValue: false,
        fn: (index, [id]) => index[id],
    });

    const ref = React.useRef<HTMLDivElement>(null);

    const handleClose = React.useCallback(() => onClose(id), [id]);
    const handleOpen = React.useCallback(() => onOpen(id), [id]);
    const handleRemove = React.useCallback(() => onRemove(id), [id]);

    return (
        <div ref={ref}>
            <OpenButtonContainer onClick={handleOpen} />

            <Menu anchorEl={ref.current} onClose={handleClose} open={isOpened}>
                <MenuItem disableRipple onClick={handleClose}>
                    <Icons.Close fontSize="small" />
                    {intl(INTL.COMMENT.MENU.ACTION.CLOSE)}
                </MenuItem>

                <MenuItem disableRipple onClick={handleRemove}>
                    <Icons.Delete fontSize="small" />
                    {intl(INTL.COMMENT.MENU.ACTION.REMOVE)}
                </MenuItem>
            </Menu>
        </div>
    );
});
