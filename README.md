# pie-frame
A Javascript library that auto-generates responsive D3 charts from Google Sheets.

## Dependencies
This library has the following dependencies:

* jQuery
* D3
* RandomColor (https://github.com/davidmerfield/randomColor)

These dependencies can be called individually or via the included vendor file at `js/pieFrame-vendor.min.js`.

## Usage
The library relies on a new HTML-like tag called `<chart>`.  This tag will be replaced in the DOM by the library with a SVG chart, as dictated by the tag's attributes.

* __data-id__: The Google Sheet data ID.
* __data-type__: The style of chart that should be generated. Supported options are:
  * horizontal-bar
  * vertical-bar
  * pie

```
<body>
  <chart data-id="GOOGLE-SHEET-ID" data-type="TYPE-OF-CHART"></chart>

  <script src="js/pieFrame-vendor.min.js"></script>
  <script src="js/pieFrame.min.js"></script>
</body>
```

An example `index.html` file is included in this repository.
