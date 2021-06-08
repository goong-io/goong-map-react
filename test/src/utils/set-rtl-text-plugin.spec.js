import test from 'tape-catch';
import {setRTLTextPlugin} from '@goongmaps/goong-map-react';

test('setRTLTextPlugin', t => {
  t.ok(typeof setRTLTextPlugin === 'function', 'setRTLTextPlugin is exported');
  t.end();
});
