import React from 'react';
import {useOuterClick} from 'utils/hooks/useOuterClick';
import {useWindowSize} from 'utils/hooks/useWindowSize';

type TProps = {
    children: React.ReactNode;
    classNames: string;
    delay?: number;
    onOutsideClick?: () => void;
    show: boolean;
};

export const Animation = React.memo(({children, classNames, delay, onOutsideClick, show}: TProps) => {
    const [render, setRender] = React.useState(show);
    const ref = useOuterClick<HTMLDivElement>(onOutsideClick);
    const {width} = useWindowSize();

    React.useEffect(() => {
        if (show) setRender(true);

        if (!delay) return;
        const timer = setTimeout(() => onOutsideClick?.(), delay);

        return () => clearTimeout(timer);
    }, [delay, onOutsideClick, show]);

    const onAnimationEnd = (): void => {
        if (!show) setRender(false);
    };

    if (width && width > 768)
        return (
            <div ref={ref} className={classNames}>
                {children}
            </div>
        );

    return render ? (
        <div ref={ref} className={classNames} onAnimationEnd={onAnimationEnd}>
            {children}
        </div>
    ) : null;
});
