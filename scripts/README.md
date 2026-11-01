# Scripts

## admin-use-map.json

Source-to-bundle map for the admin dashboard's translation JSON. WordPress
resolves script translations for a handle from the built file's path, so
`wp i18n make-json` needs this map to collect every string under `admin/src`
into the one JSON file core looks for (`assets/admin/js/dashboard.js`).

Generate the dashboard JSON with:

    wp i18n make-json languages/gslider-blocks-de_DE.po languages --use-map=scripts/admin-use-map.json --no-purge

`--no-purge` is required. By default, `make-json` purges every entry whose
references are all JavaScript files from the PO file once it has run. That
also covers block-editor entries this map does not map: they would be deleted
from the PO even though no JSON was generated for them.
