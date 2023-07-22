import { writeFileSync } from 'fs';
import path from 'path';

import { selectLayerProfile, layerProfile } from './select-profile.js';

import func from './func.js';

import mouse from './mouse.js';
import nav from './nav.js';
import number from './number.js';
// import shiftLayer from './shift.js';
import { windowsToMacKeys } from './simple.js';

// run from repo root
[
  { name: 'layerProfile', data: layerProfile },
  { name: 'selectLayerProfile', data: selectLayerProfile },
  { name: 'func', data: func },
  { name: 'mouse', data: mouse },
  { name: 'nav', data: nav },
  { name: 'number', data: number },
  // { name: 'shiftLayer', data: shiftLayer },
  { name: 'windowsToMacKeys', data: windowsToMacKeys },
].forEach(({ name, data }) => {
  writeFileSync(
    path.resolve('my-config', 'test-output', `${name}.json`),
    JSON.stringify(data, null, 2),
    'utf-8'
  );
});
