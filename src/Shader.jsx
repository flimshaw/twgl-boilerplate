import { Component, h } from 'preact';
import { TwglScene } from './TwglScene.jsx';

export class Shader extends Component {
	render({ name }) {
		let time = new Date().toLocaleTimeString();
    const frag = require(`./shaders/${name}/shader.frag`);
    const vert = require(`./shaders/${name}/shader.vert`);

		return (
      <span>
        <TwglScene frag={frag} vert={vert} />
      </span>
    );
	}
}
