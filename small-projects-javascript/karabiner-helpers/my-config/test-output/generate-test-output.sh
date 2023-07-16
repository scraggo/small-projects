#!/usr/bin/env bash

node my-config/select-profile.js > my-config/test-output/select-profile.json

node my-config/func.js > my-config/test-output/func.json

node my-config/mouse.js > my-config/test-output/mouse.json
node my-config/nav.js > my-config/test-output/nav.json
node my-config/number-layer.js > my-config/test-output/number-layer.json
node my-config/shift-layer.js > my-config/test-output/shift-layer.json
node my-config/windows-modifiers.js > my-config/test-output/windows-modifiers.json
