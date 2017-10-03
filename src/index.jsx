import { Shader } from './Shader.jsx';
import { ShaderCursor } from './ShaderCursor.jsx';
import { h, render } from 'preact';

require('../css/main.scss');


render((
  <div id={`app`}>
    <ShaderCursor />
    <Shader name={`stripey`} />
    <Shader name={`perlin-cloudfield`} />
    <Shader name={`gooey-colors`} />
    <Shader name={`stripey`} />
    <Shader name={`perlin-cloudfield`} />
    <Shader name={`gooey-colors`} />
    <Shader name={`stripey`} />
  </div>
), document.body);
