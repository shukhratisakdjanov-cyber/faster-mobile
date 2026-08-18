import { fireEvent, render } from '@testing-library/react-native';
import { Dialog, ThemeProvider, defaultTheme, resolveDialogElevation } from '../src';

describe('Dialog', () => {
  it('resolves the semantic elevation token for both native platforms', () => {
    expect(resolveDialogElevation(defaultTheme.elevation.dialog, 'ios')).toEqual(defaultTheme.elevation.dialog.ios);
    expect(resolveDialogElevation(defaultTheme.elevation.dialog, 'android')).toEqual(defaultTheme.elevation.dialog.android);
  });

  it('renders actions and calls them', () => {
    const onConfirm = jest.fn();
    const onDismiss = jest.fn();
    const screen = render(
      <Dialog visible title="Delete item" onDismiss={onDismiss} primaryAction={{ label: 'Delete', onPress: onConfirm }}>
        Are you sure?
      </Dialog>,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.press(screen.getByRole('button', { name: 'Close dialog' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not expose a close control when non-dismissible', () => {
    const screen = render(<Dialog visible title="Working" onDismiss={jest.fn()} dismissible={false}>Please wait</Dialog>);

    expect(screen.queryByRole('button', { name: 'Close dialog' })).toBeNull();
  });

  it('uses the Dialog typography token supplied by the active theme', () => {
    const title = { ...defaultTheme.components.dialog.title, fontSize: 26 };
    const theme = {
      ...defaultTheme,
      components: { ...defaultTheme.components, dialog: { ...defaultTheme.components.dialog, title } },
    };
    const screen = render(
      <ThemeProvider theme={theme}>
        <Dialog visible title="Themed dialog" onDismiss={jest.fn()}>Content</Dialog>
      </ThemeProvider>,
    );

    expect(screen.getByText('Themed dialog').props.style).toEqual(title);
  });
});
