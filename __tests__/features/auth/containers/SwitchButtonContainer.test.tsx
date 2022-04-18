import {render, screen} from '@testing-library/react';
import {INTL} from 'constants/intl';
import {SwitchButtonContainer} from 'features/auth/containers/SwitchButtonContainer';
import {setState} from 'features/auth/model/events';
import React from 'react';
import {intl} from 'utils/intl';

describe('<SwitchButtonContainer />', () => {
    test('should render SwitchButtonContainer', () => {
        render(<SwitchButtonContainer />);
        const element = screen.getByRole('button');

        expect(element).toBeInTheDocument();
    });

    test('should render SwitchButtonContainer with not.sign_in text', () => {
        render(<SwitchButtonContainer />);
        const element = screen.getByRole('button');

        expect(element.innerHTML).toBe(intl(INTL.AUTH.NOT.SIGN_IN));
    });

    test('should render SwitchButtonContainer with not.sign_up text', () => {
        setState('SIGN_UP');

        render(<SwitchButtonContainer />);
        const element = screen.getByRole('button');

        expect(element.innerHTML).toBe(intl(INTL.AUTH.NOT.SIGN_UP));
    });
});
