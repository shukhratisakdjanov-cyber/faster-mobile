import { fireEvent, render } from '@testing-library/react-native';
import { Input } from '../src';

describe('Input', () => {
  it('renders labels and communicates text changes', () => {
    const onChangeText = jest.fn();
    const screen = render(<Input label="Email" placeholder="you@example.com" onChangeText={onChangeText} />);

    fireEvent.changeText(screen.getByLabelText('Email'), 'person@example.com');

    expect(screen.getByText('Email')).toBeTruthy();
    expect(onChangeText).toHaveBeenCalledWith('person@example.com');
  });

  it('shows an error message and disables native entry when disabled', () => {
    const screen = render(<Input label="Email" disabled errorMessage="Enter a valid email" />);

    expect(screen.getByText('Enter a valid email')).toBeTruthy();
    expect(screen.getByLabelText('Email').props.editable).toBe(false);
  });
});
