# Contributing to goong-map-react

**Thanks for taking the time to contribute!**

PRs and bug reports are welcome, and we are actively looking for new maintainers.

## Setting Up Dev Environment

The **main** branch is the active development branch.

Building `@goongmaps/goong-map-react` locally from the source requires node.js `>=8`.
We use [yarn](https://yarnpkg.com/en/docs/install) to manage the dependencies.

```bash
git checkout main
yarn bootstrap
yarn test
```

Test:

```bash
$ npm run test
```

Test in Node:

```bash
$ npm run test node
```

Test in browser (can use Chrome dev tools for debugging):

```bash
$ npm run test browser
```

## Pull Requests

Any intended change to the code base must open a [pull request](https://help.github.com/articles/creating-a-pull-request/) and be approved. 

### PR Checklist

- [ ] Tests
  + `npm run test` must be successful.
  + New code should be covered by unit tests whenever possible.
- [ ] Documentation
  + If public APIs are added/modified, update component documentation in `docs/api-reference`.
  + Breaking changes and deprecations must be added to `docs/upgrade-guide.md`.
  + Noteworthy new features should be added to `docs/whats-new.md`.
- [ ] Description on GitHub
  + Link to relevant issue.
  + Label with a milestone (latest release or vNext).
  + If public APIs are added/modified, describe the intended behavior.
  + If visual/interaction is affected, consider attaching a screenshot/GIF.

## Code of Conduct

Please be mindful of and adhere to the Linux Foundation's [Code of Conduct](https://lfprojects.org/policies/code-of-conduct/) when contributing to goong-map-react.
