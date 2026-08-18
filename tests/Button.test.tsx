import { fireEvent, render } from '@testing-library/react-native';
import { Button } from '../src';

describe('Button', () => {
  it('exposes its label and calls onPress once', () => {
    const onPress = jest.fn();
    const screen = render(<Button onPress={onPress}>Continue</Button>);

    const button = screen.getByRole('button', { name: 'Continue' });
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it.each([{ disabled: true }, { loading: true }])('prevents presses when $disabled$loading', (props) => {
    const onPress = jest.fn();
    const screen = render(<Button onPress={onPress} {...props}>Continue</Button>);

    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('reports disabled and busy accessibility states', () => {
    const screen = render(<Button loading>Continue</Button>);

    expect(screen.getByRole('button', { name: 'Continue' }).props.accessibilityState).toMatchObject({
      disabled: true,
      busy: true,
    });
  });
});
