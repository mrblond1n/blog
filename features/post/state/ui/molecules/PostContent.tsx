import {Typography} from '@mui/material';
import React from 'react';
import {Card} from 'ui/atoms/Card';

export const PostContent = React.memo(({title, text}: {title: string; text: string}) => {
    return (
        <Card.Content>
            <Typography variant="h5">{title}</Typography>

            <Typography variant="body2">{text}</Typography>
        </Card.Content>
    );
});
