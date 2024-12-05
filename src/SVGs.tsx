
import React, { useContext } from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import { ThemeContext } from './App';

type SVGProps = {
  color?: string;
  width?: number;
  height?: number;
}


function BeardSVG (props : SVGProps): React.JSX.Element {
  const theme = useContext(ThemeContext)
  const color = props.color || theme.primaryColor
  return (
    <Svg width={75} height={75} fill={color} stroke={color} viewBox="0 0 48 48" x="0px" y="0px">
      <Path d="M41.0383,13.4137c-.7137,1.7179-1.7292,4.6773-2.7109,6.8009-4.4202,1.2171-5.5158-4.2146-9.3274-4.2146-2.3718,0-4.0345,1.0531-5,1.9118-.9655-.8587-2.6282-1.9118-5-1.9118-3.8116,0-4.9072,5.4317-9.3274,4.2146-.9817-2.1236-1.9973-5.083-2.7109-6.8009-.6865-1.6526-1.6963-3.1483-2.9617-4.4137,0,0,2,13,3,18s13,12,17,12,16-7,17-12,3-18,3-18c-1.2654,1.2654-2.2751,2.7611-2.9617,4.4137Zm-17.0383,14.5863c-1.6925,0-5.5225-1.2844-6.6635-3.0175,3.4861-.0927,5.5722-1.5548,6.6635-3.1368,1.0913,1.582,3.1774,3.0441,6.6635,3.1368-1.1411,1.7332-4.971,3.0175-6.6635,3.0175Z"/>
    </Svg>
  )
}

function ReloadSVG (props : SVGProps): React.JSX.Element {
  const theme = useContext(ThemeContext)
  const color = props.color || theme.repickColor
  return (
    <Svg width={25} height={25} fill={color} stroke={color} x="0px" y="0px" viewBox="0 0 90 90">
      <G>
        <Path d="M83.03,26.23c-1.05-0.35-2.18,0.23-2.52,1.27l-2.76,8.39C71.2,22.14,55.9,14.62,40.73,18.22   c-8.49,2.01-15.69,7.21-20.27,14.64c-4.58,7.43-5.99,16.19-3.98,24.68c2.01,8.49,7.21,15.69,14.64,20.27   c5.22,3.22,11.1,4.87,17.08,4.87c2.53,0,5.08-0.3,7.6-0.89c8-1.9,14.94-6.69,19.53-13.5c0.62-0.92,0.38-2.16-0.54-2.78   c-0.92-0.62-2.16-0.38-2.78,0.54C68,72.02,61.91,76.23,54.89,77.89c-7.45,1.77-15.14,0.53-21.66-3.49   c-6.52-4.02-11.08-10.33-12.85-17.79c-1.77-7.45-0.53-15.14,3.49-21.66s10.33-11.08,17.79-12.85c13.4-3.18,26.91,3.52,32.59,15.75   l-8.62-2.84c-1.05-0.35-2.18,0.23-2.52,1.27c-0.35,1.05,0.23,2.18,1.27,2.52l13.09,4.31c0.21,0.07,0.42,0.1,0.62,0.1   c0.84,0,1.62-0.53,1.9-1.38l4.31-13.09C84.65,27.71,84.07,26.58,83.03,26.23z"/>
      </G>
    </Svg>
  )
}

function PlusSVG (props : SVGProps): React.JSX.Element {
  const theme = useContext(ThemeContext)
  const color = props.color || theme.addColor
  return (
    <Svg width={25} height={25} fill={color} stroke={color} x="0px" y="0px" viewBox="0 0 100 100">
      <G transform="translate(0,-952.36218)">
        <Path d="m 50,965.36218 c -2.2092,0 -4,1.7909 -4,4 l 0,29.0001 -29,0 c -2.2091,0 -4,1.79082 -4,4.00002 0,2.2092 1.7909,4 4,4 l 29,0 0,28.9999 c 0,2.2091 1.7908,4 4,4 2.2092,0 4,-1.7909 4,-4 l 0,-28.9999 29,0 c 2.2091,0 4,-1.7908 4,-4 0,-2.2092 -1.7909,-4.00002 -4,-4.00002 l -29,0 0,-29.0001 c 0,-2.2091 -1.7908,-4 -4,-4 z" stroke="none" marker="none" />
      </G>
    </Svg>
  )
}

function MinusSVG (props : SVGProps): React.JSX.Element {
  const theme = useContext(ThemeContext)
  const color = props.color || theme.deleteColor
  return (
    <Svg width={25} height={25} fill={color} stroke={color} viewBox="10 10 80.0 80.0">
      <Path d="m16.668 50c0-2.3008 1.8633-4.168 4.1641-4.168h58.336c2.3008 0 4.1641 1.8672 4.1641 4.168s-1.8633 4.168-4.1641 4.168h-58.336c-2.3008 0-4.1641-1.8672-4.1641-4.168z" fill-rule="evenodd"/>
    </Svg>
  )
}

function StarSVG (props : SVGProps): React.JSX.Element {
  const theme = useContext(ThemeContext)
  const color = props.color || theme.addColor
  return (
    <Svg width={25} height={25} fill={color} stroke={color} viewBox="0 0 100.0 100.0">
      <Path d="m91.914 45.633-16.344 16.82 3.8633 23.789c0.40625 2.5039-0.60547 4.9453-2.6445 6.3828-1.9453 1.3672-4.4375 1.5-6.5156 0.35156l-20.039-11.121-20.043 11.121c-0.9375 0.52344-1.9609 0.77734-2.9844 0.77734-1.2383 0-2.4648-0.37891-3.5312-1.1289-2.0391-1.4297-3.0547-3.8789-2.6484-6.3828l3.8633-23.789-16.344-16.82c-1.707-1.7578-2.2773-4.3047-1.4922-6.6562 0.76562-2.2773 2.6797-3.9141 5-4.2695l22.461-3.4453 10.07-21.367c1.0508-2.2422 3.2148-3.6445 5.6484-3.6445 2.4297 0 4.5977 1.3984 5.6484 3.6484l10.07 21.355 22.461 3.4453c2.3203 0.35547 4.2344 1.9922 5 4.2695 0.78906 2.3477 0.21484 4.8984-1.4922 6.6562z"/>
    </Svg>
  )
}



export {
  BeardSVG,
  ReloadSVG,
  MinusSVG,
  PlusSVG,
  StarSVG
}
