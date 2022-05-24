## These are the building directories for directus extensions

### How to use
1. cd the directory of the needed extension type
2. create a source file `./src/<extensionname.js>`
3. create a destination folder in the project extensions `extension/<extensiontype>/<extensionname>/`
4. set the source and path for the extension in environment .envrc
5. build it using `npx directus-extension build -i $SOURCE_EXT -o $PATH_EXT`
6. you can take a a step further by adding `-w` for auto building (this with autoreload in the directus project = love)
