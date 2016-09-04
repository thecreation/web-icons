#Web Icons
###The web iconic font and CSS framework.

Web Icons is a full suite of popular web icons for easy scalable vector graphics on websites.

## Getting Started

 1. Download and extract the repository
 2. Copy the `css/web-icons.css` to your project
 3. Copy the `fonts` folder to your project
 4. Ensure the font urls within `web-icons.css` properly reference the `fonts` path within your project.
 5. Include a reference to the `web-icons.css` file from every webpage you need to use it.

## HTML Example

simply add icon's classname, such as `wb-dashboard` to an HTML element.

    <i class="wb-dashboard"></i>


## Contributing

Please read through our [contributing guidelines](https://github.com/amazingSurge/web-icons/blob/master/CONTRIBUTING.md).
Included are directions for opening issues, coding standards, and notes on development.

## Development Installation

This plugin requires Grunt. Note that `ttfautohint` is optional, but your generated font will not be properly hinted if it’s not installed. And make sure you don’t use `ttfautohint` 0.97 because that version won’t work. And you need add [WOFF2 support](https://github.com/sapegin/grunt-webfont/wiki/WOFF2-support).

### OS X

```
brew install ttfautohint fontforge --with-python
npm install grunt-webfont --save-dev
```

*You may need to use `sudo` for `brew`, depending on your setup.*

*`fontforge` isn’t required for `node` engine (see below).*

:skull: [Notes on experimental WOFF2 support](https://github.com/sapegin/grunt-webfont/wiki/WOFF2-support).

### Linux

```
sudo apt-get install fontforge ttfautohint
npm install grunt-webfont --save-dev
```

*`fontforge` isn’t required for `node` engine (see below).*

:skull: [Notes on experimental WOFF2 support](https://github.com/sapegin/grunt-webfont/wiki/WOFF2-support).

### Windows

```
npm install grunt-webfont --save-dev
```

Then [install `ttfautohint`](http://www.freetype.org/ttfautohint/#download) (optional).

*Only `node` engine available (see below).*

## Versioning

Web Icons will be maintained under the Semantic Versioning guidelines as much as possible. Releases will be numbered
with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions, including new icons, without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit http://semver.org.

## Social icons
Looking for social icons? Please checkout https://github.com/amazingSurge/brand-icons

## License

Web Icons is licensed under the [MIT license](http://opensource.org/licenses/MIT).
