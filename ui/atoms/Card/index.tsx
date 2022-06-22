import {
    Card as MUICard,
    CardActionArea,
    CardActionAreaProps,
    CardActions,
    CardActionsProps,
    CardContent,
    CardContentProps,
    CardMedia,
    CardMediaProps,
    CardProps,
} from '@mui/material';
import React from 'react';

export class Card {
    static Actions = React.memo(({children, ...props}: CardActionsProps) => (
        <CardActions {...props}>{children}</CardActions>
    ));

    static Area = React.memo(({children, ...props}: CardActionAreaProps) => (
        <CardActionArea {...props}>{children}</CardActionArea>
    ));

    static Content = React.memo(({children, ...props}: CardContentProps) => (
        <CardContent {...props}>{children}</CardContent>
    ));

    static Main = React.memo(({children, ...props}: CardProps) => <MUICard {...props}>{children}</MUICard>);

    static Media = React.memo((props: CardMediaProps<any>) => <CardMedia {...props} />);
}
