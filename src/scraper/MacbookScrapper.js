"use strict";

var Nightmare = require("nightmare");
var MongoClient	= require('mongodb').MongoClient;
var fs = require('fs');

const MACBOOK = {
  screen: [
    {
      size: "12",
      processors: [
        "1-10-ghz",
        "1-20-ghz",
        "1-30-ghz"
      ],
      year: [
        "early-2015"
      ]
    },
     {
       size:"13",
       processors: [
       "1-83-ghz",
       "2-0 -ghz",
       "2-10-ghz",
       "2-13-ghz",
       "2-16-ghz",
       "2-20-ghz",
       "2-26-ghz",
       "2-40-ghz"
       ],
       year: [
       "early-2009",
       "late-2006",
       "late-2007",
       "late-2008",
       "mid-2006",
       "mid-2006"
     ]
     }
  ]

};

const URL =  "https://www.gazelle.com/sell/macbook/macbook";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36";

function scrape() {
  var scraper = Nightmare({
    waitTimeout: 20000
  });
  var url = URL;
  scraper.viewport(1000, 1000).
    .goto(url, )

}
