import { render, screen, fireEvent } from '@testing-library/react';
import DropdownWithLabel from './DropdownWithLabel';

describe('<DropdownWithLabel', () => {
  it('renders the provided label', () => {
    render(
      <DropdownWithLabel
        labelText={'Duration Asleep'}
        onChange={() => null}
        options={['1:30', '2:00', '2:30']}
      />
    );

    const dropdown = screen.getByLabelText(/Duration Asleep/i);
    expect(dropdown).toBeInTheDocument();
  })

  it('selects an option', () => {
    render(
      <DropdownWithLabel
        labelText={'Duration Asleep'}
        onChange={() => null}
        options={['1:30', '2:00', '2:30']}
      />
    );

    const dropdown = screen.getByLabelText(/Duration Asleep/i);
    fireEvent.change(dropdown, { target: { value: '2:00' } });

    let options = screen.getAllByTestId('select-option');
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
  })
});


