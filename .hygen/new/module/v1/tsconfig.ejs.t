---
inject: true
to: tsconfig.json
after: paths
---
"~<%= h.fileName(name) %>/*": [
    "src/modules/<%= h.fileName(name) %>/*"
],