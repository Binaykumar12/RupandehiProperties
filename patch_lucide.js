import fs from 'fs';

const fb = `import createLucideIcon from '../createLucideIcon.mjs';
const __iconData = {
  name: 'facebook',
  size: 24,
  node: [
    ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: 'fb' }]
  ]
};
const Facebook = createLucideIcon(__iconData);
export { __iconData, Facebook as default };
`;

const tw = `import createLucideIcon from '../createLucideIcon.mjs';
const __iconData = {
  name: 'twitter',
  size: 24,
  node: [
    ['path', { d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z', key: 'tw' }]
  ]
};
const Twitter = createLucideIcon(__iconData);
export { __iconData, Twitter as default };
`;

const ig = `import createLucideIcon from '../createLucideIcon.mjs';
const __iconData = {
  name: 'instagram',
  size: 24,
  node: [
    ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'ig1' }],
    ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'ig2' }],
    ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'ig3' }]
  ]
};
const Instagram = createLucideIcon(__iconData);
export { __iconData, Instagram as default };
`;

const yt = `import createLucideIcon from '../createLucideIcon.mjs';
const __iconData = {
  name: 'youtube',
  size: 24,
  node: [
    ['path', { d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17', key: 'yt1' }],
    ['path', { d: 'm10 15 5-3-5-3z', key: 'yt2' }]
  ]
};
const Youtube = createLucideIcon(__iconData);
export { __iconData, Youtube as default };
`;

fs.writeFileSync('node_modules/lucide-react/dist/esm/icons/facebook.mjs', fb);
fs.writeFileSync('node_modules/lucide-react/dist/esm/icons/twitter.mjs', tw);
fs.writeFileSync('node_modules/lucide-react/dist/esm/icons/instagram.mjs', ig);
fs.writeFileSync('node_modules/lucide-react/dist/esm/icons/youtube.mjs', yt);

const esmExports = `
export { default as LucideFacebook, default as Facebook, default as FacebookIcon } from './icons/facebook.mjs';
export { default as LucideTwitter, default as Twitter, default as TwitterIcon } from './icons/twitter.mjs';
export { default as LucideInstagram, default as Instagram, default as InstagramIcon } from './icons/instagram.mjs';
export { default as LucideYoutube, default as Youtube, default as YoutubeIcon } from './icons/youtube.mjs';
`;

let esmContent = fs.readFileSync('node_modules/lucide-react/dist/esm/lucide-react.mjs', 'utf8');
if (!esmContent.includes('Facebook')) {
  fs.writeFileSync('node_modules/lucide-react/dist/esm/lucide-react.mjs', esmContent + esmExports);
}

const dtsExports = `
export declare const Facebook: LucideIcon;
export declare const Twitter: LucideIcon;
export declare const Instagram: LucideIcon;
export declare const Youtube: LucideIcon;
`;
let dtsContent = fs.readFileSync('node_modules/lucide-react/dist/lucide-react.d.ts', 'utf8');
if (!dtsContent.includes('Facebook')) {
  fs.writeFileSync('node_modules/lucide-react/dist/lucide-react.d.ts', dtsContent + dtsExports);
}

// Also CJS for completeness
const cjsFb = `"use strict";
var createLucideIcon = require('../createLucideIcon.js');
var __iconData = {
  name: 'facebook',
  size: 24,
  node: [
    ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: 'fb' }]
  ]
};
var Facebook = createLucideIcon.default ? createLucideIcon.default(__iconData) : createLucideIcon(__iconData);
exports.__iconData = __iconData;
exports.default = Facebook;
`;
fs.writeFileSync('node_modules/lucide-react/dist/cjs/icons/facebook.js', cjsFb);
fs.writeFileSync('node_modules/lucide-react/dist/cjs/icons/twitter.js', cjsFb.replace('facebook', 'twitter').replace('fb', 'tw'));
fs.writeFileSync('node_modules/lucide-react/dist/cjs/icons/instagram.js', cjsFb.replace('facebook', 'instagram').replace('fb', 'ig'));
fs.writeFileSync('node_modules/lucide-react/dist/cjs/icons/youtube.js', cjsFb.replace('facebook', 'youtube').replace('fb', 'yt'));

let cjsContent = fs.readFileSync('node_modules/lucide-react/dist/cjs/lucide-react.js', 'utf8');
if (!cjsContent.includes('Facebook')) {
  const cjsExports = `
var facebook = require('./icons/facebook.js');
var twitter = require('./icons/twitter.js');
var instagram = require('./icons/instagram.js');
var youtube = require('./icons/youtube.js');
exports.Facebook = facebook.default || facebook;
exports.Twitter = twitter.default || twitter;
exports.Instagram = instagram.default || instagram;
exports.Youtube = youtube.default || youtube;
`;
  fs.writeFileSync('node_modules/lucide-react/dist/cjs/lucide-react.js', cjsContent + cjsExports);
}

console.log('Patch complete!');
