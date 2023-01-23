import React, {ImgHTMLAttributes} from 'react';
import {styled} from 'utils/styles';

export const Img = React.memo((props: ImgHTMLAttributes<HTMLImageElement>) => {
    const alt = props.alt || '';

    return <Container>{props.src && <Image alt={alt} {...props} />}</Container>;
});

const Container = styled('div')(() => ({
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
}));

const Image = styled('img')(() => ({
    position: 'absolute',
    width: 'auto',
    maxHeight: '100%',
    left: '50%',
    top: '50%',
    height: '100%',
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)',
}));
