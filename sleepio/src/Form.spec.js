import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import Form from './Form';

describe('<Form />', () => {
  it('updates UI correctly after submitting form', async () => {
    render(<Form />);

    const durationAsleepSelect = screen.getByLabelText(/duration asleep/i);
    fireEvent.change(durationAsleepSelect, { target: { value: '6:00' } });

    const durationInBedSelect = screen.getByLabelText(/duration in bed/i);
    fireEvent.change(durationInBedSelect, { target: { value: '8:00' } });

    const input = screen.getByText(/Calculate/i);
    await fireEvent.click(input);

    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading)
    const result = screen.getByText(/Result/i);
    expect(result).toBeInTheDocument();
  });
});
