# TVK Vijay static clone

Mirrored from https://tvkvijay.com/en.

Serve this directory with a static server:

```sh
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173/.

The pages are mapped as static HTML with local CSS/images and without the original Next.js client runtime or missing video embeds, so the clone loads faster and does not depend on unavailable chunks.

To rebuild/remap the clone from the live site, run this from the workspace root:

```sh
node staticize-tvkvijay.mjs
node customize-static-site.mjs
```

`customize-static-site.mjs` adds the front video, keeps the homepage fully static, removes Organisation/Updates/More from the nav bar, anchors the Our Journey section, and limits the district section to Tiruppur.

Pages mirrored: 84
Assets mirrored: 8873
