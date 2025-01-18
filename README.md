# WebSee

WebSee is a blazingly fast NPM package designed for **real-time filtering and searching** with advanced features like pattern matching, fuzzy searching, and customizable options. It’s perfect for applications that require efficient data lookup with user-friendly configurations.

---

## Features

- 🔍 **Fuzzy Searching**: Match patterns even when the input isn't an exact match.
- ⚡ **Multiple Algorithms**: Choose between different algorithms for optimal performance.
- 🎨 **Customizable Options**: Add titles, descriptions, web links, and image links to your results.
- 🚀 **Easy Integration**: Simple setup for both small datasets and large-scale applications.

---

## Installation

Install WebSee via NPM:

```bash
npm i @ervarunsharma/websee
```

# Usage

To use WebSee, simply import it in your project and use it to search for data.

```js
import { websee } from "../index.js";

const data = [
  "foobar",
  "foo-bar",
  "test",
  "Fuzzy Finder",
  "Fuzzy-Finder",
  "FuzzyFinder",
  "fuzzyfinder",
  "fuzzy-finder",
  "maker",
  "sinderfinder",
  "funder-sfinder",
  "fuzzy finder",
  "foo bar",
  "funder sfinder",
  ""
]

const pattern = "furf"

const option = {
  algo: "v1",  // "v1" or "v2"
  title: true,  // default true
  desc: false,  // default false
  weblink: "www.domain.com/url",  // www.domain.com/url
  imglink: "www.cloudimage.com/url/make",  // www.cloudimage.com/url/make
}

console.log(websee(data, pattern, option))
```

# Github Contribution 
```bash
git clone https://github.com/VarunSharma3520/websee.git
```
