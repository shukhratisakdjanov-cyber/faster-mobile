# Faster Mobile

An accessible React Native component library built for the Faster Mobile design-system exercise.

## Current status

The typed token/theme system and the Button, Input, and Dialog components are implemented with baseline interaction and accessibility tests. Root and native-host lint, type, and Jest checks pass; the integrated Maestro journey has passed on iOS. Storybook is configured for the native host, and an isolated consumer successfully installed, tested, built, and ran the packed library on iOS. CI, Changesets, and an approval-gated GitHub Packages release workflow are configured, but the first external publish remains pending. Simulator visual/console-error proof and Android verification are intentionally deferred.

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

`Button` supports `primary`, `outline`, `ghost`, and `link` variants; `default` and `danger` tones; and small, medium, and large sizes. Native pressed state is derived by `Pressable`; disabled and loading buttons suppress presses and announce their accessibility state.

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

On 18 August 2026, a packed library tarball was installed into an isolated clean copy of the native host. Its type check, lint, Jest test, iOS build, and simulator runtime passed; the host imported Button, Input, Dialog, and ThemeProvider only from the public package API. Repeat this proof after the first GitHub Packages release, using the published scoped version.

## CI and releases

GitHub Actions runs two pull-request checks: `library` validates the package itself (lint, types, tests, build, and packed contents), while `native-host` validates the example app, generated Storybook registry, native-host types/lint, and its Jest test. Native simulator and Android checks remain intentionally outside pull-request CI because they are slower and are deferred in this exercise.

Publishing is defined in `.github/workflows/release.yml` and uses Changesets. For a user-facing change, run `pnpm changeset`, choose its patch/minor/major semantic-version bump, and commit the generated Markdown file. A push to `main` turns pending changesets into a reviewed version pull request; merging that pull request publishes `@shukhratisakdjanov-cyber/faster-mobile` to GitHub Packages and creates the matching Git tag. The release requires the `github-packages` GitHub environment variable `PUBLISH_ENABLED` to be `true`. It uses its repository-scoped `GITHUB_TOKEN` with `packages: write`; no personal access token is stored in the repository.

Consumers route this scope to GitHub Packages with the committed `.npmrc`. To install a published version outside GitHub Actions, authenticate to GitHub Packages with an authorized token and then install the scoped package:

```sh
pnpm add @shukhratisakdjanov-cyber/faster-mobile@0.1.0
```

The repository must first exist at the `repository` URL in `package.json`; then configure the protected `github-packages` environment and set `PUBLISH_ENABLED=true` there before the first release. The current Builder Bob build also emits a CommonJS export-map warning that should be resolved before publishing externally.

## Architecture

`src/theme/primitives.ts` holds raw Figma-derived values. `src/theme/themes.ts` maps them into semantic and component tokens. Components use `useTheme`, not raw color or spacing values. The current theme contract is intentionally typed and can be extended with dark-mode or brand themes without changing component APIs.

Platform-specific styling also belongs in the theme contract. For example, `theme.elevation.dialog` holds native iOS shadow and Android elevation values; Dialog resolves the appropriate style through `resolveDialogElevation` while its API remains platform-neutral.

## Figma adaptations

The supplied design is web-oriented. Its hover states are retained only as a future React Native Web/pointer enhancement; touch uses native pressed feedback. The smallest 24px visual control has `hitSlop` for a more practical mobile target. Exact Dialog shadow values and complete cross-platform visual verification remain documented as follow-up work.
