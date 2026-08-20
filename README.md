# Faster Mobile

An accessible React Native component library built for the Faster Mobile design-system exercise.

## Current status

The typed token/theme system and the Button, Input, and Dialog components are implemented with baseline interaction and accessibility tests. Root and native-host lint, type, and Jest checks pass; the integrated Maestro journey has passed on iOS. Storybook is configured for the native host, and an isolated consumer successfully installed, tested, built, and ran the packed library on iOS. CI, Changesets, and the GitHub Packages release workflow are configured; version `0.2.0` is published. Simulator visual/console-error proof, Android verification, and a clean consumer install of the published package are intentionally deferred.

## Prerequisites

- Node 22
- pnpm 10.10.0
- For device testing: the React Native iOS/Android toolchain

## Commands

```sh
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
pnpm changeset # for a user-facing release change
```

## Native example and E2E verification

The native host is in `example/native` and consumes this library through the `@shukhratisakdjanov-cyber/faster-mobile` package name. Install its dependencies separately, then run the app on a simulator/emulator:

```sh
cd example/native
pnpm install
bundle install && bundle exec pod install --project-directory=ios
pnpm ios
```

After the app is installed and an iOS simulator or Android emulator is running, run the critical journey:

```sh
maestro test .maestro/component-journey.yaml
```

## On-device Storybook

Storybook runs inside the native example application. It documents every Button, Input, and Dialog variant, size, key state, long-content case, playground, and a Theme Matrix that renders key states under every available theme.

The library exports `defaultTheme`, `darkTheme`, and `brandPurpleTheme`. In Storybook, use `Foundations/Theme Preview → Preview` to explore one theme at a time, or use each component's `ThemeMatrix` story to compare the same states across all themes.

```sh
cd example/native
pnpm storybook:generate
pnpm storybook:ios
# or: pnpm storybook:android
```

For an already-installed simulator/emulator, start Metro separately with `pnpm storybook:start`, then launch with `pnpm exec react-native run-ios --no-packager` (or `run-android --no-packager`).

The Storybook runtime is pinned to the 9.x line because the current app is React Native 0.78; newer Storybook releases require Reanimated 4, whose supported React Native range begins after this host version.

The current iOS proof used React Native 0.78 on Xcode 26. Its legacy `glog` pod can require a clean, interactive CocoaPods/Xcode build to generate headers correctly; this is a React Native tooling compatibility concern, not a library API issue. Keep the successful native build log as review evidence and upgrade React Native or standardize the Xcode version before production release.

## Usage

```tsx
import { Button, ThemeProvider } from '@shukhratisakdjanov-cyber/faster-mobile';

<ThemeProvider>
  <Button variant="primary" onPress={submit}>Continue</Button>
</ThemeProvider>
```

`Button` supports `primary`, `outline`, `ghost`, and `link` variants; `default` and `danger` tones; and small, medium, and large sizes. Native pressed state is derived by `Pressable`; disabled and loading buttons suppress presses and announce their accessibility state. Set `loadingLabel` to localize or contextualize the loading indicator's accessible name.

`Input` supports labels, helper and error text, disabled and clearable states, and standard native `TextInput` props. Set both `secureTextEntry` and `passwordToggle` to add an accessible Show/Hide password control.

## Consumer-package verification

The package is verified from its generated tarball, rather than through a source link. Build and pack the library, then install the resulting archive into a separate React Native app that imports only from `@shukhratisakdjanov-cyber/faster-mobile`:

```sh
pnpm build
pnpm pack:check
cd /path/to/consumer-app
pnpm add /absolute/path/to/shukhratisakdjanov-cyber-faster-mobile-0.1.0.tgz
pnpm typecheck
pnpm lint
pnpm exec jest --runInBand
```

For Jest-based consumers, allow `@shukhratisakdjanov-cyber/faster-mobile` through `transformIgnorePatterns`: React Native resolves its `react-native` export to TypeScript source, which Jest must transform just like React Native itself. The native example’s [Jest configuration](example/native/jest.config.js) is a working reference.

To install the published package in an external consumer, configure that consumer's `.npmrc` without committing a token:

```ini
@shukhratisakdjanov-cyber:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Set `NODE_AUTH_TOKEN` to a GitHub classic personal access token with `read:packages`, then install the current published version:

```sh
pnpm add @shukhratisakdjanov-cyber/faster-mobile@latest
```

## CI and releases

GitHub Actions runs two pull-request checks: `library` validates the package itself (lint, types, tests, build, and packed contents), while `native-host` validates the example app, generated Storybook registry, native-host types/lint, and its Jest test. Native simulator and Android checks remain intentionally outside pull-request CI because they are slower and are deferred in this exercise.

Publishing is defined in `.github/workflows/release.yml` and uses Changesets. For a user-facing change, run `pnpm changeset`, choose its patch/minor/major semantic-version bump, and commit the generated Markdown file with the feature. After the feature pull request passes CI and merges to `main`, Changesets opens a reviewed Version Packages pull request. Merging that pull request publishes `@shukhratisakdjanov-cyber/faster-mobile` to GitHub Packages and creates the matching Git tag. The release requires the repository variable `PUBLISH_ENABLED` to be `true`; the `github-packages` environment remains the approval and protection boundary. It uses its repository-scoped `GITHUB_TOKEN` with `packages: write`; no personal access token is stored in the repository.

Consumers route this scope to GitHub Packages with the `.npmrc` configuration shown above. To install a published version outside GitHub Actions, authenticate with a classic personal access token that has `read:packages`, then install the scoped package:

```sh
pnpm add @shukhratisakdjanov-cyber/faster-mobile@latest
```

The repository must first exist at the `repository` URL in `package.json`; then configure the protected `github-packages` environment and set repository variable `PUBLISH_ENABLED=true` before the first release. The Builder Bob CommonJS export-map warning remains a known follow-up.

## Architecture

`src/theme/primitives.ts` holds raw Figma-derived values. `src/theme/themes.ts` maps them into semantic and component tokens. Components use `useTheme`, not raw color or spacing values. The current theme contract is intentionally typed and can be extended with dark-mode or brand themes without changing component APIs.

Platform-specific styling also belongs in the theme contract. For example, `theme.elevation.dialog` holds native iOS shadow and Android elevation values; Dialog resolves the appropriate style through `resolveDialogElevation` while its API remains platform-neutral.

## Figma adaptations

The supplied design is web-oriented. Its hover states are retained only as a future React Native Web/pointer enhancement; touch uses native pressed feedback. The smallest 24px visual control has `hitSlop` for a more practical mobile target. Exact Dialog shadow values and complete cross-platform visual verification remain documented as follow-up work.
