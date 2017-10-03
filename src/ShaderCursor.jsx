import { Component, h } from 'preact';
import { TwglScene } from './TwglScene.jsx';

export class ShaderCursor extends Component {
  constructor(props) {
    super();
    // set initial time:
    this.state = {
      scrollY: 0,
      currentShader: 0,
      nextShader: 1,
    };
    this.shaderDivs = props.shaderDivs;
    this.tick = this.tick.bind(this);
    requestAnimationFrame(this.tick);
  }
  tick() {
    if(window.scrollY !== this.state.scrollY) {
      this.setState({ scrollY: window.scrollY });
      if(this.state.scrollY > ((this.state.currentShader + 1) * window.innerHeight)) {
        this.setState({ currentShader: this.state.currentShader + 1, nextShader: this.state.nextShader + 1 });
      } else if(this.state.scrollY <= ((this.state.currentShader) * window.innerHeight)) {
        this.setState({ currentShader: this.state.currentShader - 1, nextShader: this.state.nextShader - 1 });
      }
    }
    requestAnimationFrame(this.tick);
  }
	render({ name, playing }) {

    this.shaderDivs = this.shaderDivs.map( (s,i) => {
      if(i === this.state.currentShader || i === this.state.nextShader) {
        s.attributes.playing = true;
        console.log(`Playing ${i}`)
      } else {
        s.attributes.playing = false;
      }
      return s;
    });

		return (
      <div className={`shaderCursor`}>
        {this.shaderDivs}
      </div>
    );
	}
}
