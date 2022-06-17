import React from 'react';

export const useMountTransition = (isMounted: boolean, unmountDelay: number) => {
    const [hasTransitionedIn, setHasTransitionedIn] = React.useState(false);

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isMounted && !hasTransitionedIn) {
            setHasTransitionedIn(true);
        } else if (!isMounted && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [unmountDelay, isMounted, hasTransitionedIn]);

    return hasTransitionedIn;
};
