import React from 'react';

type TAnyEvent = MouseEvent | TouchEvent;

export const useOuterClick = <T extends HTMLElement = HTMLElement>(callback?: (event: TAnyEvent) => void) => {
    const callbackRef = React.useRef<(event: TAnyEvent) => void>(); // initialize mutable ref, which stores callback
    const innerRef = React.useRef<T>(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value
    React.useEffect(() => {
        callbackRef.current = callback;
    });

    const handleClick = React.useCallback(e => {
        if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) callbackRef.current(e);
    }, []);

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [handleClick]); // no dependencies -> stable click listener

    return innerRef as React.RefObject<T>; // convenience for client (doesn't need to init ref himself)
};
