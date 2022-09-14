import {render, screen} from '@testing-library/react';
import {INTL} from 'constants/intl';
import {LinkContainer} from 'features/pages/signin/containers/LinkContainer';
import React from 'react';
import {intl} from 'utils/intl';

describe('<LinkContainer />', () => {
    test('should to be exist', () => {
        render(<LinkContainer />);
        const divElement = screen.getByRole('link');

        expect(divElement).toBeInTheDocument();
    });

    test('should to be link text', () => {
        render(<LinkContainer />);
        const divElement = screen.getByRole('link');

        expect(divElement.innerHTML).toBe(intl(INTL.SIGN_IN.TO));
    });
});
