import React from 'react';
import {
    CardActionAreaProps,
    CardActionsProps,
    CardContentProps,
    CardHeaderProps,
    CardMediaProps,
    CardProps,
} from 'types/components';
import {Card as MUICard, CardActionArea, CardActions, CardContent, CardHeader, CardMedia} from 'ui/atoms';

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

    static Header = React.memo(({children, ...props}: CardHeaderProps) => (
        <CardHeader {...props}>{children}</CardHeader>
    ));

    static Main = React.memo(({children, ...props}: CardProps) => <MUICard {...props}>{children}</MUICard>);

    static Media = React.memo((props: CardMediaProps<any>) => <CardMedia {...props} />);
}
