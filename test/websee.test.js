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

