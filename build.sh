#!/bin/sh
npm run build && \
sed -e 's/window/self/g' -e 's/document/self/g' -e 's/parent/undefined/g' \
    background/api.bundled.worker.js -i