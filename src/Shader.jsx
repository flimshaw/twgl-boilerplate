import { Component, h } from 'preact';
import { TwglScene } from './TwglScene.jsx';

export class Shader extends Component {
	render({ name, playing }) {
		let time = new Date().toLocaleTimeString();
    const frag = require(`./shaders/${name}/shader.frag`);
    const vert = require(`./shaders/${name}/shader.vert`);

		return (
      <div className={`shader ${playing ? 'playing' : ''}`}>
        <h2>{name}</h2>
        <TwglScene frag={frag} vert={vert} />
      </div>
    );
	}
}
