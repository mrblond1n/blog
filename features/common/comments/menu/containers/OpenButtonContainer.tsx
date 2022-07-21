import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import React from 'react';

export const OpenButtonContainer = React.memo(({onClick}: {onClick: (props: any) => any}) => {
    return (
        <IconButton onClick={onClick}>
            <MoreVertIcon />
        </IconButton>
    );
});
