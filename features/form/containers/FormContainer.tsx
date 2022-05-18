import {useGate, useList, useStore} from 'effector-react';
import {FormGate} from 'features/form/model';
import {onChange, onSubmit} from 'features/form/model/events';
import {$buttonText, $inputs} from 'features/form/model/stores';

import React from 'react';
import {Button} from 'ui/atoms/Button';
import {Input} from 'ui/atoms/Input';
import {Form} from 'ui/molecules/Form';

export const FormContainer = React.memo(() => {
    const ref = React.useRef<HTMLFormElement>(null);
    const text = useStore($buttonText);

    useGate(FormGate, {form: ref});

    const handleSubmit = React.useCallback(e => onSubmit(e), []);
    const handleChange = React.useCallback(e => onChange(e), []);

    return (
        <Form onSubmit={handleSubmit} refWrapper={ref}>
            {useList($inputs, input => (
                <Input onChange={handleChange} {...input} />
            ))}

            <Button type="submit">{text}</Button>
        </Form>
    );
});
