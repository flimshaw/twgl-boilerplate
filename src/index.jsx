import { Shader } from './Shader.jsx';
import { ShaderCursor } from './ShaderCursor.jsx';
import { h, render } from 'preact';

require('../css/main.scss');

const shaders = [
  `stripey`,
  `perlin-cloudfield`,
  `gooey-colors`,
  `stripey`,
  `perlin-cloudfield`,
  `gooey-colors`,
  `stripey`,
];

const ShaderDivs = shaders.map( (s,i) => {
  return <Shader name={s} id={`shader_${i}`} />
});

render((
  <div id={`app`}>
    <ShaderCursor shaderDivs={ShaderDivs} />
  </div>
), document.body);
