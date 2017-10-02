import { Component, h } from 'preact';
import { TwglScene } from './TwglScene.jsx';

export class Shader extends Component {
	render() {
		let time = new Date().toLocaleTimeString();
		return (
      <span>
        <TwglScene />
      </span>
    );
	}
}
