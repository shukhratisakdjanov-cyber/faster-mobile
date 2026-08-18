# Faster Mobile native host

This React Native 0.78 app consumes `@shukhratisakdjanov-cyber/faster-mobile` as a file dependency using its public package name. It is the device host for manual verification and the Maestro component journey.

```sh
pnpm install
bundle install
bundle exec pod install --project-directory=ios
pnpm ios
```

For Android, start an emulator and run `pnpm android`. Once installed, run `maestro test ../../.maestro/component-journey.yaml` from this folder.
