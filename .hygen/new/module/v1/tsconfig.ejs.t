---
inject: true
to: tsconfig.json
after: paths
skip_if: <%= h.fileName(name) %>
---
    "~<%= h.fileName(name) %>/*": [
        "src/modules/<%= h.fileName(name) %>/*"
    ],