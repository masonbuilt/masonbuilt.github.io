# Deployment:

Get on your development branch.

Make sure it's synced with upstream (`git pull upstream development`)

Create a build using `gulp build`

```
git push upstream `git subtree split --prefix build master`:master --force
```

This will force push your local `build` subtree to master and [our page](http://masonbuilt.com)

### Linux build:

```
sudo apt-get update
sudo apt-get install nodejs-legacy npm
npm install
bower install
gulp
```

Troubleshooting [gulp-autoprefixer error](http://stackoverflow.com/questions/32490328/gulp-autoprefixer-throwing-referenceerror-promise-is-not-defined)
