## There is nothing here to look at
Yet at least. Rigth now this is just a semi-sophisticated boilerplate for React-Typescript-SASS-Electron projects.

In the future I hope to make this into a standalone interactive fiction editor, something like [InkleWriter](https://www.inklestudios.com/inklewriter/) but with a bit more spice and a documentation that exists.

## How do I make it run?
You go like:
```
yarn && yarn start
```
And this hello-world appears on your screen as an electron app. And when you make changes in sourcecode, it refreshes. And you can test things with Jest (although there is nothing much to test). And you can write stories for your components and view them in storybook, though I haven't figure out how to integrate it with fuse, so I have to use slow and ugly webpack configuration, but it works.

`yarn start` launches electron with chrome debugging tools. You can debug main process with vscode. I also hacked together a `yarn watch-electron` task, but it's proven to be unnecessary — HMR seems to be working fine in electron, so you probably should stick to using plain `start` script.

### Tests
U launch tests like that:
```
yarn test
```
This gets you coverage. Or you can
```
yarn test-watch
```
for immediate test results during active development.

### Storybook
```
yarn storybook
```
