import MenuItem from '@mui/material/MenuItem';
import {Close} from '@mui/icons-material';
import * as React from 'react';

export const CloseButtonContainer = React.memo(({onClick}: {onClick: () => void}) => {
    return (
        <MenuItem disableRipple onClick={onClick}>
            <Close fontSize="small" />
            {'close'}
        </MenuItem>
    );
});
