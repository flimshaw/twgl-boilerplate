import twgl from 'twgl.js';
import { Component, h } from 'preact';

export class TwglScene extends Component {

  constructor(props) {
    super();
    // set initial time:
    this.state = {
      time: Date.now(),
      playing: false,
    };
		this.count = 0;
    this.glRender = this.glRender.bind(this);
  }

  componentDidMount() {

    const canvas = this.el;

    this.gl = canvas.getContext("webgl");
    this.programInfo = twgl.createProgramInfo(this.gl, [this.vertShader, this.fragShader]);

		this.rectProgramInfo = twgl.createProgramInfo(this.gl, [require('./shaders/rect.vert'), require('./shaders/rect.frag')]);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const boxSize = 1.;

    const arrays = {
      position: [-boxSize, -boxSize, 0, boxSize, -boxSize, 0, -boxSize, boxSize, 0, -boxSize, boxSize, 0, boxSize, -boxSize, 0, boxSize, boxSize, 0],
    };
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

		this.fbos = [];

		this.fbos.push(twgl.createFramebufferInfo(this.gl));
		this.fbos.push(twgl.createFramebufferInfo(this.gl));

    this.textures = twgl.createTextures(this.gl, {
      noise: {
        src: 'assets/textures/noise256.png',
        mag: this.gl.LINEAR,
        min: this.gl.LINEAR,
      }
    }, () => this.glRender(1.));

		this.mousePos = [0,0];
		this.mouseVel = [0,0];
		window.addEventListener('mousemove', this.handleMouseMove.bind(this));
	}
	handleMouseMove(e) {
		const newPos = [ e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
		[0,1].map( i => {
			this.mouseVel[i] = (newPos[i] - this.mousePos[i]) * -1;
			this.mousePos[i] = newPos[i]; 
		});
	}
  handleMouseOver() {
    this.setState({ playing: true });
    requestAnimationFrame(this.glRender);
  }

  handleMouseOut() {
    this.setState({ playing: false });
  }

  glRender(time) {
		if(this.fbos[0] === undefined) {
			requestAnimationFrame(this.glRender);
			return;
		}
    let width = this.el.width;
    let height = this.el.height;
    this.gl.viewport(0, 0, width, height);
		this.count += 1;
    const uniforms = {
      time: time,
      resolution: [width, height],
      noise: this.textures.noise,
			mousePos: this.mousePos,
			mouseVel: this.mouseVel,
    };
		//console.log(this.mousePos);
		// determine if this is an odd or even frame and arrange
		// buffers accordingly
		const i = this.count % 2;
		// mount the opposite FBO to a uniform texture
		uniforms.fbo = this.fbos[Math.floor(!i)].attachments[0];
		// target the current fbo
		twgl.bindFramebufferInfo(this.gl, this.fbos[i]);
    this.gl.useProgram(this.programInfo.program);
		// render the scene out to the target buffer
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);


		uniforms.fbi = this.fbos[i].attachments[0];

		twgl.bindFramebufferInfo(this.gl);
    this.gl.useProgram(this.rectProgramInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.rectProgramInfo, this.bufferInfo);
    twgl.setUniforms(this.rectProgramInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);

		//twgl.bindFramebufferInfo(this.gl, this.fbi);
		//twgl.drawBufferInfo(this.gl, this.bufferInfo);

    if(this.state.playing) {
      requestAnimationFrame(this.glRender);
    }
  }

	render({ frag, vert, playing }) {
    if(this.state.playing !== playing) {
      this.state.playing = playing;
      requestAnimationFrame(this.glRender);
    }

		return (<div><canvas ref={(canvas) => { this.el = canvas; this.fragShader = frag; this.vertShader = vert; }}/></div>);
	}

}
