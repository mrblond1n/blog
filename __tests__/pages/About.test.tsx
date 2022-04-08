import {render, screen} from '@testing-library/react';
import About from 'pages/about';
import React from 'react';

describe('<About />', () => {
    test('should display about page', async () => {
        render(<About />);
        const divElement = screen.getByText(/about page/i);

        expect(divElement).toBeInTheDocument();
    });
});
