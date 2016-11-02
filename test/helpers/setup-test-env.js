import jsdom from 'jsdom';

global.document = jsdom.jsdom('<body></body>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
