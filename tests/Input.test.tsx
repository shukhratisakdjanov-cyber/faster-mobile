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

  it('toggles password visibility with an accessible control', () => {
    const screen = render(<Input label="Password" secureTextEntry passwordToggle />);

    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(true);
    fireEvent.press(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(false);
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeTruthy();

    fireEvent.press(screen.getByRole('button', { name: 'Hide password' }));

    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(true);
  });

  it('disables the password visibility control with the input', () => {
    const screen = render(<Input label="Password" secureTextEntry passwordToggle disabled />);

    const toggle = screen.getByRole('button', { name: 'Show password' });
    fireEvent.press(toggle);

    expect(toggle.props.accessibilityState).toMatchObject({ disabled: true });
    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(true);
  });

  it('renders the password control only for secure inputs', () => {
    const screen = render(<Input label="Password" passwordToggle />);

    expect(screen.queryByRole('button', { name: 'Show password' })).toBeNull();
  });
});
