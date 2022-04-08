import {useStore} from 'effector-react';
import {decrementScore, incrementScore} from 'features/example/model/events';
import {$score} from 'features/example/model/stores';
import React from 'react';
import {ROUTES} from 'routes';
import {Button} from 'ui/atoms/Button';
import {NavLink} from 'ui/atoms/NavLink';

const Effector = () => {
    const onDecrement = () => decrementScore();
    const onIncrement = () => incrementScore();

    return (
        <div>
            <h1>{'Welcome to effector'}</h1>
            <Score />

            <Button onClick={onIncrement}>{'Inc'}</Button>
            <Button onClick={onDecrement}>{'Dec'}</Button>

            <div />
            <NavLink href={ROUTES.HOME}>{'to home'}</NavLink>
        </div>
    );
};

const Score = () => {
    const score = useStore($score);

    return <div>{`score is ${score}`}</div>;
};

export default Effector;
