import { Shader } from './Shader.jsx';
import { ShaderCursor } from './ShaderCursor.jsx';
import { FlimshawHeader } from './FlimshawHeader.jsx';
import { h, render } from 'preact';

require('../css/main.scss');

const shaders = [
  `brots`,
  `theyre-here`,
  `lifestyle`,
  `autumnal`,
  `pyorpull-ran`,
  `tropicalia`,
  `perlin-cloudfield`,
  `stripey`,
  `gooey-colors`,
];

const ShaderDivs = shaders.map( (s,i) => {
  return <Shader name={s} id={`shader_${i}`} />
});

render((
  <div id={`app`}>
    <FlimshawHeader />
    <ShaderCursor shaderDivs={ShaderDivs} />
  </div>
), document.body);
