import Image, {ImageProps} from 'next/image';
import React from 'react';
import style from './style.module.css';

export const Img = React.memo((props: ImageProps) => {
    const alt = props.alt || '';

    return (
        <div className={style.container} style={{width: `${props.width}px`, height: `${props.height}px`}}>
            {props.src && <Image alt={alt} className={style.img} {...props} />}
        </div>
    );
});
