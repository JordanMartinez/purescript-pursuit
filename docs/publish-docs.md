# Publish Docs

This document summarizes the code for publishing to Pursuit (Haskell version).

## Compiler

### Overview of Command

Publishing takes 4 args:
- manifest file
- resolutions file
- `output` dir
- whether to dry run or not

Control flow is
- parse CLI args
- create a `Publish` package (see next section), throwing if errors and printing warnings
- if not doing dry run, encode package to JSON and write to file

### Publish control flow (compiler)

- Manifest File
  - read the manifest file, throwing `PackageManifestNotFound` error if not found
  - file is parsed, throwing an error if decoding fails or converting to `purs.json` fails
  - throw if license not provided or not a SPDX license
  - information is obtained
    - get the published version from Git tag
    - get date of the tag
    - get the repo URL, or fail if not in manifest, valid git url, or not on github
- Resolutions file
  - read the resolutions file, throwing if not found
  - file is parsed, throwing an error if decoding fails
  - gets file paths for each package recursively
    - assumption: `src/**/*.purs` contains file paths
  - getModules
    - parses input and dependency files, associating a module to a package
    - compiles docs for src and dependency code
    - distinguishes local & dependency packages/modules, ignoring `Prim.*` modules
    - parses the docs for each module (without dropping association with module/package)
    - Adds re-exports to the file (but not in correct order)
    - Keeps only local modules
  - emits warning for each package found not in resolutions file
  - checks that each resolved dependency has a valid version or throws
- Creates a `Package` value

## Pulp

- throws if `bower.json` file does not exist
- throws if working tree is dirty
- throws if could not read from `~/.pulp/github-oauth-token`
- parses bower.json file, throwing if parsing fails
- writes the resolutions file
  - if has deps, reads each dependency's returning the resolution for that package: package name, version, path
  - encodes that as JSON
  - writes content to a temporary file (prefx = `pulp-publish`, suffix = `.json`)
  - returns the path of the file
- outputs the content of resolutions file (reads file to ensure it exists)
- calls `purs publish --manifest bower.json --resolutions <resolutionsFilePath>` and gzips the result
- gets URL for repo (throwing if not there) and verifies it matches the package's URL in registry
- gets version from `git` and pushes refs to repo (optional)
- submits gzipped JSON to Pursuit and exits on 201, throws on everything else
    ```
    POST https://pursuit.purescript.org/packages
    
    Accept: application/json
    Authorization: token <github oauth token>
    content-encoding: gzip
    ```

## Pursuit

### Misc.

- `dataDir/cache/<route>/`
- `dataDir/verified/<packageName>/<packageVersion>.json`

## Misc. links

- Zlib docs: https://zlib.net/manual.html
- 
