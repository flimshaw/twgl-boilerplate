import { Shader } from './Shader.jsx';
import { h, render } from 'preact';

require('../css/main.scss');


render((
  <div id={`app`}>
    <Shader />
    <Shader />
    <Shader />
    <Shader />
  </div>
), document.body);
