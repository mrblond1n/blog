import React from 'react';
import {Typography} from 'ui/atoms';
import {Card} from 'ui/atoms/Card';

export const PostContent = React.memo(({title, text}: {title: string; text: string}) => {
    return (
        <Card.Content>
            <Typography variant="h5">{title}</Typography>

            <Typography variant="body2">{text}</Typography>
        </Card.Content>
    );
});
