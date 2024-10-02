# React + TypeScript + Vite

## Approach Summary

I decided to store the sidebar navigation state with local storage for
your current session and pass the value across domains using URL search
parameters. This allows for a seamless user experience with minimal
overhead and no additional values needing to be saved on the server. I
used ChakraUI as a components library as I am most familiar with it and
I'd like to use this SideNav component in a different project of mine
that uses ChakraUI. Though not explicitly requested (maybe it was a given?),
I also created comprehensive unit tests to be confident in my solution.

See `DesignDoc.pdf` for the initial planning thoughts and considerations.

## Install

```
yarn
```

## Running locally

To mimic the cross domain test locally you can run two dev servers like so:

In one terminal:

```
yarn dev --port 4321
```

In the other:

```
yarn dev --port 5174
```

Open `http://localhost:5174/` in your browser.

## Build

```
yarn build
```

## Test

```
yarn test
```
