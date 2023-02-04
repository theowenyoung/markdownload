# MarkDownload - Markdown Web Clipper

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/deathau/markdownload?style=for-the-badge&sort=semver)](https://github.com/deathau/markdownload/releases/latest)

## Changelog

### 0.0.10

- Fix br to p

This is an extension to clip websites and download them into a readable markdown file. Please keep in mind that it is not guaranteed to work on all websites.

To use this add-on, simply click the add-on icon while you are browsing the page you want to save offline. A popup will show the rendered markdown so you can make minor edits or copy the text, or you can click the download button to download an .md file.  
Selecting text will allow you to download just the selected text

See the [Markdownload User Guide](https://death.id.au/30-39+Personal+Dev/33+Browser+Extensions/33.01+MarkDownload/Markdownload+User+Guide) for more details on the functionality of this extension

# Installation

The extension is available for [Firefox](https://addons.mozilla.org/en-GB/firefox/addon/markdownload/), [Google Chrome](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi), [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/hajanaajapkhaabfcofdjgjnlgkdkknm) and [Safari](https://apple.co/3tcU0pD).

[![](https://img.shields.io/chrome-web-store/v/pcmpcfapbekmbjjkdalcgopdkipoggdi.svg?logo=google-chrome&style=flat)](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi) [![](https://img.shields.io/chrome-web-store/rating/pcmpcfapbekmbjjkdalcgopdkipoggdi.svg?logo=google-chrome&style=flat)](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi) [![](https://img.shields.io/chrome-web-store/users/pcmpcfapbekmbjjkdalcgopdkipoggdi.svg?logo=google-chrome&style=flat)](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi)

[![](https://img.shields.io/amo/v/markdownload.svg?logo=firefox&style=flat)](https://addons.mozilla.org/en-US/firefox/addon/markdownload/) [![](https://img.shields.io/amo/rating/markdownload.svg?logo=firefox&style=flat)](https://addons.mozilla.org/en-US/firefox/addon/markdownload/) [![](https://img.shields.io/amo/users/markdownload.svg?logo=firefox&style=flat)](https://addons.mozilla.org/en-US/firefox/addon/markdownload/)

[![](https://img.shields.io/badge/dynamic/json?label=edge%20add-on&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fhajanaajapkhaabfcofdjgjnlgkdkknm&style=flat&logo=microsoft-edge)](https://microsoftedge.microsoft.com/addons/detail/hajanaajapkhaabfcofdjgjnlgkdkknm) [![](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fhajanaajapkhaabfcofdjgjnlgkdkknm&style=flat&logo=microsoft-edge)](https://microsoftedge.microsoft.com/addons/detail/hajanaajapkhaabfcofdjgjnlgkdkknm)

[![iTunes App Store](https://img.shields.io/itunes/v/1554029832?label=Safari&logo=safari&style=flat)](https://apple.co/3tcU0pD)

# Obsidian Integration

For integration with obsidian, you need to install and enable community plugins named "Advanced Obsidian URI". This plugin help us to bypass character limitation in URL. Because it's using clipboard as the source for creating new file.
More information: https://vinzent03.github.io/obsidian-advanced-uri/

# External Libraries

It uses the following libraries:

- [Readability.js](https://github.com/mozilla/readability) by Mozilla in version from commit [1fde3ac626bc4c2e5e54daa57c57d48b7ed9c574](https://github.com/mozilla/readability/commit/1fde3ac626bc4c2e5e54daa57c57d48b7ed9c574). This library is also used for the Firefox Reader View and it simplifies the page so that only the important parts are clipped. (Licensed under Apache License Version 2.0)
- [Turndown](https://github.com/mixmark-io/turndown) by Dom Christie in version 7.1.1 is used to convert the simplified HTML (from Readability.js) into markdown. (Licensed under MIT License)
- [Moment.js](https://momentjs.com) version 2.29.4 used to format dates in template variables

# Permissions

- Data on all sites: used to enable "Download All Tabs" functionality - no other data is captured or sent online
- Access tabs: used to access the website content when the icon in the browser bar is clicked.
- Manage Downloads: necessary to be able to download the markdown file.
- Storage: used to save extension options
- Clipboard: used to copy Markdown to clipboard

---

The Common Mark icon courtesy of https://github.com/dcurtis/markdown-mark

## Pricing

This is an open-source extension I made _for fun_. It's intention is to be completely free.
It's free on Firefox, Edge and Chrome (and other Chromium browsers),
but unfortunately for Safari there is a yearly developer fee, so I've decided to
charge a small price for the Safari version to help cover that cost.
Alternately, you can become a GitHub Sponsor for as little as $2 per month and
you can request a key for the Safari version.
Also, even if you're using the free version and you absolutely _have_ to
send me money because you like it that much, feel free to throw some coins
in my hat via the following:

[![GitHub Sponsors](https://img.shields.io/github/sponsors/deathau?style=social)](https://github.com/sponsors/deathau)
[![Paypal](https://img.shields.io/badge/paypal-deathau-yellow?style=social&logo=paypal)](https://paypal.me/deathau)

# Version History

## 3.2.1

- Bugfixes for the Obsidian integration (thanks @aancw !)

## 3.2.0

- Added a basic Obsidian integration using the [Obsidian Advanced URI](https://vinzent03.github.io/obsidian-advanced-uri/) plugin and clipboard (thanks @aancw !)
- Keep sub/sup tags so that superscript and subscript text is retained (thanks @mnaoumov !)
- Added a keyboard shortcut for copy selection as markdown (nothing by default, needs to be user-configured)
- Added a new context menu item to copy all tabs as a list of markdown links
- Updated dependencies

## 3.1.0

- Firefox for Android (nightly) support
- Updated Readability and Turndown
- Added GitHub-flavoured Markdown (GFM) plugin to Turndown (adds some mardown table support)
- Added support for MathJax -> LaTeX (thanks @LeLocTai)
- Disallow slashes in title text replacements
- Suport for Open Graph meta tags as variables (which use `property` instead of `key`)
- Fixed an issue with regex characters like `|` in date formats
- Resolved an extra slash in file name causing images to fail to download in chromium browsers
- Added some support to parse pre elements as code blocks (supports syntax highlighting on GitHub, but not much else yet)
- Added option to enable or disable the context menus
- Added some extra keyboard shortcuts. These can be customised, depending on your browser
  - <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> opens the popup (as it has in previous versions)
  - <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> downloads the current tab as markdown, bypassing the popup
  - <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> copies the current tab as markdown to the clipboard, bypassing the popup
  - <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> copies the current tabs URL as a markdown link to the clipboard
- Added support for template variables having different casing using `:` followed by the casing type. For example, for an article titled "Different Types of Casing":
  - `{pageTitle:pascal}` — "DifferentTypesOfCasing"
  - `{pageTitle:camel}` — "differentTypesOfCasing"
  - `{pageTitle:kebab}` — "different-types-of-casing"
  - `{pageTitle:snake` — "different_types_of_casing"
- Added support for rending italics in double underscores (`__`). This isn't valid MarkDown (will output as **bold**), but it's useful for people copying to Roam
- Support image download as base64 embedded urls, directly in the markdown file
- Added some extra variables related to the url beyond the existing `{baseURI}`:
  - `{origin}` - The origin of the URL, that is its scheme, its domain and its port
  - `{host}` - The domain (that is the _hostname_) followed by (if a port was specified) a `:` and the _port_ of the URL.
  - `{hostname}` - The domain of the URL.
  - `{port}` - The port number of the URL.
  - `{protocol}` - The protocol scheme of the URL, including the final `':'`.
  - `{pathname}` - An initial `'/'` followed by the path of the URL, not including the query string or fragment.
  - `{search}` - The URL's parameter string; if any parameters are provided, this string includes all of them, beginning with the leading `?` character.

## 3.0.0

- Theme revamp
- Utilizing CodeMirror for the Markdown Editor
- Strip Disallowed characters on title and image filenames during text replacement
- Add "Download Type" option, to attempt to resolve conflicts with other Download extensions (and to help support Safari!)
- Add options for stripping images and links
- Fixes around downloading images and getting correct urls in the markdown
- Added meta keywords support for the text replace
- Added text replace support for meta tags in general
- Add option to disable turndown escaping
- Strip out 'red dot' special characters
- Added an option to specify a download path (within the downloads folder). Thanks to Nikita Lukianets!

## 2.4.1

- Add option for Obsidian-style image links (when downloading images with the markdown file)
- Downloaded images should download relative to the markdown file in the case where you specify a subfolder in your title template
- Front- and back-matter template will no longer put in extra lines on Opera
- Adjusted the way text is copied to the clipboard

## 2.4.0

- Fixed typo on options page (thanks Dean Cook)
- Added option to download images alongside the markdown file
  - Also added the ability to add a prefix to the images you download, so you can, for example, save them in a subfolder
  - If your browser has the option to always show a save as dialog enabled, you might get a dialog for every image. Sorry about that 😬
- Updated turndown to 7.0.1 and allowed iframes to be kept in the markdown
- Added a new `{pageTitle}` option for template replacement (there are many websites where the `{title}` and `{pageTitle}` actually differ)
- Added a context menu option to copy a tab URL as a markdown link, using the title configured in settings as the link title (i.e. `[<custom title>](<URL>)`)
- Added custom disallowed characters to strip from titles (set to `[]#^` by default for maximum compatibility with Obsidian)
- Added some focus styling so you can tell what is focused
- Auto-focus the download button (you can now `ctrl`+`shift`+`M`, Enter to quickly download a file)
- Template title (and image prefixes) now allow forward slashes (`/`) so that files get saved to a subfolder

## 2.3.1

- Added template toggle to Firefox's tab context menu

## 2.3.0

- Added contexy menus for copying markdown
- Added options to clip selected text
- Include front-matter/back-matter templates in popup
- Add title templating
- Added keyboard shortcut to show the popup
- Added option to always show Save As
- Added context menus to download all tabs as markdown

## 2.2.0

- Added extension options
  - Turndown (markdown generation) options
  - Front-matter/back-matter templates with replacement variables from page metadata (and date)

## 2.1.6

- Replace non-breaking spaces in filenames

## 2.1.5

- Fixed an issue with sites with invalid `<base>` tags

## 2.1.4

- Fixed issue with relative links [#1](https://github.com/deathau/markdownload/issues/1)

## 2.1.3

- Fist change, forked from [enrico-kaack/markdown-clipper](https://github.com/enrico-kaack/markdown-clipper)
- Added URL to markdown output ([#5](https://github.com/deathau/markdownload/issues/5))
