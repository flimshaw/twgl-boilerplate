import { Component, h } from 'preact';
import { TwglScene } from './TwglScene.jsx';

export class ShaderCursor extends Component {
  constructor() {
    super();
    // set initial time:
    this.state = {
      scrollY: 0,
      currentShader: 0,
      nextShader: 1,
    };
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }
  tick() {
    if(window.scrollY !== this.state.scrollY) {
      this.setState({ scrollY: window.scrollY });
      if(this.state.scrollY > ((this.state.currentShader + 1) * window.innerHeight)) {
        this.setState({ currentShader: this.state.currentShader + 1, nextShader: this.state.nextShader + 1 });
      } else if(this.state.scrollY <= ((this.state.currentShader - 1) * window.innerHeight)) {
        this.setState({ currentShader: this.state.currentShader - 1, nextShader: this.state.nextShader - 1 });
      }

    }
    requestAnimationFrame(this.tick);
  }
	render({ name, playing }) {
		return (
      <div className={`shaderCursor`}>

      </div>
    );
	}
}
