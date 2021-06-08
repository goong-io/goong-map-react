# Testing

## Unit, Lint

```
npm run test
```

## Browser

```
npm run test-browser
```

**You'll need to specify a valid Goong Maptiles Key in the URL** for the tests to pass.

```
http://localhost:8080/?access_token=YOUR_MAPTILES_KEY
```

# Bumping Goong Version

Always pin Goong to a specific release.

The React controls (`NavigationControl`, `Popup` and `Marker`) are dependent on
the Goong stylesheet, and may be broken by Goong updates.
Always run `examples/controls` after bumping Goong version to make sure they
still work.
