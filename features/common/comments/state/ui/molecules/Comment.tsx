import {CommentMainWrapper} from 'features/common/comments/state/ui/atoms/CommentMainWrapper';
import React from 'react';
import {CommentWrapper} from '../atoms/CommentWrapper';

type TProps = {
    actions: React.ReactNode;
    avatar: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
    header: React.ReactNode;
};

export const Comment = React.memo(({actions, avatar, children, footer, header}: TProps) => (
    <CommentWrapper>
        {avatar}

        <CommentMainWrapper>
            {header}

            {children}

            {actions}

            {footer}
        </CommentMainWrapper>
    </CommentWrapper>
));
