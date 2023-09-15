# Pursuit Routes

## Routes

Copied from [pursuit](https://github.com/purescript/pursuit/blob/master/config/routes). One thing to note is that every route expects a GET method.
```
/static StaticR EmbeddedStatic appStatic

/robots.txt          RobotsR     GET

/ HomeR GET

/packages                                              PackageIndexR               GET POST
/packages/#PathPackageName                             PackageR                    GET
/packages/#PathPackageName/#PathVersion                PackageVersionR             GET
/packages/#PathPackageName/#PathVersion/docs           PackageVersionDocsR         GET
/packages/#PathPackageName/#PathVersion/docs/#Text     PackageVersionModuleDocsR   GET
!/packages/#PathPackageName/docs/#Text                 PackageModuleDocsR          GET
!/packages/#PathPackageName/badge                      PackageBadgeR               GET
!/packages/#PathPackageName/available-versions         PackageAvailableVersionsR   GET

/builtins/docs/#Text                                   BuiltinDocsR                GET

/search                                                SearchR                     GET OPTIONS

/help         HelpR        GET
/help/authors HelpAuthorsR GET
/help/users   HelpUsersR   GET
```

### Route Meaning

| Method | Route | Meaning |
| - | - | - |
| GET | /static/css/extra.css | CSS for pages not produced by `purs` (e.g. help pages) |
| GET | /static/css/normalize.css | Normalize.css |
| GET | /static/favicon/* | Favion for most OSes |
| GET | /static/fonts/* | Fonts for the site |
| GET | /static/js/html5shiv.js | [Repo](https://github.com/aFarkas/html5shiv): The HTML5 Shiv enables use of HTML5 sectioning elements in legacy Internet Explorer and provides basic HTML5 styling for Internet Explorer 6-9, Safari 4.x (and iPhone 3.x), and Firefox 3.x. |
| GET | /static/js/js.cookie.js | [Repo](https://github.com/js-cookie/js-cookie): A simple, lightweight JavaScript API for handling cookies |
| GET | /static/js/Pursuit.js | Defines 3 functions. <ol><li>`initializeVersionSelector` - adds the package's versions to the version selector dropdown using data from `!/packages/<packageName>/available-versions`</li><li>`initializeSearchForm` - adds "focus-on-`S`" keypress listener, placeholder handling depending on if focused, trims search input, renders any messages</li><li>`initializeLoadMoreLink` - sets up the 'load more' link when a search has more results than initially shown</li></ol> |
| GET | /static/opensearchdescription.xml | ??? |
| GET | `/robots.txt` | Robots file |
| GET | `/` | Home page. Content includes docs for sample searches, how to publish, how to contribute, list of latest uploads, and then package index |
| GET | `/packages` | Redirects to `/` | 
| POST | `/packages` | Endpoint to which packages are uploaded | 
| GET | `/packages/<packageName>` | Redirects to `/packages/<packageName>/<latestVersion>` | 
| GET | `/packages/<packageName>/<version>` | Page for a package at a given version. Content includes package name, version being viewed (and whether or not this is latest version), license, uploader and upload date, README content of package, list of package's modules, list of packages' dependencies. | 
| GET | `/packages/<packageName>/<version>/docs` | Redirects to `/packages/<packageName>/<latestVersion>` |
| GET | `/packages/<packageName>/<version>/docs/<Module>` | Page for a module for a package at a given version. Content includes module name, link to repo, link to package, module docs, and list of package's modules. | 
| GET | `!/packages/<packageName>/docs/<Module>` | Redirects to `/packages/<packageName>/<latestVersion>/docs/<Module>`. If module does not exist, renders Not Found page with path `/packages/<packageName>/<latestVersion>/docs/<NonExistentModule>`.| 
| GET | `!/packages/<packageName>/badge` | Returns an SVG file rendering `[Pursuit][<version>]` | 
| GET | `!/packages/<packageName>/available-versions` | Returns a JSON file with schema `Array (Tuple Version String)` where content looks like `[["3.0.0", "https://pursuit.purescript.org/packages/<packageName>/3.0.0"]]`. | 
| GET | `/builtins/docs/<PrimModule>` | Docs for `Prim` and `Prim.*` modules | 
| GET | `/search` | Redirects to `/` | 
| GET | `/search?q=<searchQuery>` | Executes search using `searchQuery` | 
| OPTIONS | `/search` | | 
| GET | `/help` | Help docs index page. Largely just a ToC of help pages |
| GET | `/help/authors` | Help docs targeting library authors on how to upload packages |
| GET | `/help/users` | Help docs targeting users of Pursuit |
