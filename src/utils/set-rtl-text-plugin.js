import mapboxgl from './goongmap';

// mapboxgl's setRTLTextPlugin, but does not crash in SSR
const setRTLTextPlugin = mapboxgl ? mapboxgl.setRTLTextPlugin : () => {};
export default setRTLTextPlugin;
