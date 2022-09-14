import React from 'react';
import {Card} from 'ui/atoms/Card';
import style from 'features/pages/post/state/ui/atoms/PostWrapper/style.module.css';

export const PostWrapper = React.memo(({children}) => <Card.Main className={style.container}>{children}</Card.Main>);
