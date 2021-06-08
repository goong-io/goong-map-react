import * as GoongJS from "@goongmaps/goong-js";
import {ReactElement, Ref} from "react";

export interface LayerProps {
  id?: string;
  type:  'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade' | 'sky';
  source?: string;
  'source-layer'?: string,
  beforeId?: string;
  layout?: GoongJS.AnyLayout;
  paint:
    | GoongJS.BackgroundPaint
    | GoongJS.FillPaint
    | GoongJS.FillExtrusionPaint
    | GoongJS.LinePaint
    | GoongJS.SymbolPaint
    | GoongJS.RasterPaint
    | GoongJS.CirclePaint
    | GoongJS.HeatmapPaint
    | GoongJS.HillshadePaint;
  filter?: any[];
  minzoom?: number;
  maxzoom?: number;
  ref?:Ref<LayerProps>
}

export default function Layer(props: LayerProps): ReactElement;


