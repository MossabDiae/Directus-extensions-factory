## These are the building directories for directus extensions

### How to use
1. cd the directory of the needed extension type (e.g: endpoint)
2. create a source file `./src/<extensionname.js>`
3. create a destination folder in the project extensions `extension/<extensiontype>/<extensionname>/`
4. each extension type has an `.envrc` file where you set the source and path for each extension.
5. build it using `npx directus-extension build -i $SOURCE_EXT -o $PATH_EXT`
6. you can take a a step further by adding `-w` for auto building (this with autoreload in the directus project = love)
7. for easier debuggin don't minify the output : `--no-minify`

#### The final build command there for would be
``` bash
# cd extensiontype (e.g: endpoint)
npx directus-extension build -i $SOURCE_COPYSTUDENT -o $PATH_COPYSTUDENT -w --no-minify

```
