In the project directory, you can run:

##### Configuration

- Go to ***src/settings***
- Copy ***production.config.js.sample*** to ***production.config.js***.
- Copy ***development.config.js.sample*** to ***development.config.js***.
- Edit configuration

#### Run dev-server in browser

#### `yarn start --web`

Or

#### `yarn start --dev`

#### Run development electron app

#### `yarn electron-dev`

#### Build application

#### `yarn electron-pack`

#### Prepare to build and publish new version

Generate a GitHub access token by going to https://github.com/settings/tokens/new. The access token should have the repo scope/permission. Once you have the token, assign it to an environment variable

On macOS/linux:

    export GH_TOKEN="<YOUR_TOKEN_HERE>"

On Windows, run in powershell:

    [Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")
 
Make sure to restart IDE/Terminal to inherit latest env variable.

See more https://github.com/iffy/electron-updater-example

#### Build and publish new version

Increase verison in **package.json** file

#### `yarn publish-app`
