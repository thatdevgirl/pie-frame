# pie-frame
A library that auto-generates responsive D3 charts from Google Sheets.

## Dependencies
This library has the following dependencies:

* jQuery
* D3
* randomColor (https://github.com/davidmerfield/randomColor)

These dependencies can be called individually or via the included vendor file at `js/pieFrame-vendor.min.js`.

## Usage
The library relies on a new HTML-like tag called `<chart>`.  This tag will be replaced in the DOM by the library with a SVG chart, as dictated by the tag's attributes.

* __data-id__: _(required)_ The Google Sheet data ID. The spreadsheet __must__ be publicly accessible.
* __data-type__: _(required)_ The style of chart that should be generated. Supported options are:
  * horizontal-bar
  * vertical-bar
  * pie
* __data-colorseed__: _(optional)_ A random string or integer that will ensure the same colors are generated each time. If no seed is specified, random colors will be generated on each page load.
* __data-hue__: _(optional)_ Determines which color hue is used by the chart. Supported hues (as per the randomColor library) are `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, and `monochrome`.

```
<html>
  <head>
    <link href="css/pieFrame.css" rel="stylesheet">
  </head>

  <body>
    <chart data-id="GOOGLE-SHEET-ID" data-type="TYPE-OF-CHART"></chart>

    <script src="js/pieFrame-vendor.min.js"></script>
    <script src="js/pieFrame.min.js"></script>
  </body>
</html>
```

An example `index.html` file is included in this repository.
