#!/usr/bin/env bash

node complex/select-profile.js > complex/select-profile.json

node function_keys/func.js > function_keys/func.json

node simple/mouse.js > simple/mouse.json
node simple/nav.js > simple/nav.json
node simple/number-layer.js > simple/number-layer.json
node simple/shift-layer.js > simple/shift-layer.json
node simple/windows-modifiers.js > simple/windows-modifiers.json
