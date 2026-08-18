# Changesets

Run `pnpm changeset` for a user-facing change that should be released. Select the semantic-version bump and write a short changelog summary; commit the generated Markdown file with the feature change.

The release workflow combines pending changesets into a reviewed version pull request. Merging that pull request publishes the package and creates the matching Git tag.
