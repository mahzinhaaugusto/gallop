import { render, screen } from '@testing-library/react';
// import App from './App';
import { Footer } from './Components/Footer';

test('renders Footer component', () => {
    render(<Footer />);
    const linkElement = screen.getByText('Gallop Documentation');
    expect(linkElement).toBeInTheDocument();
});