import React, {ImgHTMLAttributes} from 'react';
import style from './style.module.css';

export const Img = React.memo((props: ImgHTMLAttributes<HTMLImageElement>) => {
    const alt = props.alt || '';

    return (
        <div className={style.container} style={{width: `${props.width}px`, height: `${props.height}px`}}>
            {props.src && <img alt={alt} className={style.img} {...props} />}
        </div>
    );
});
