import twgl from 'twgl.js';
import { Component, h } from 'preact';

export class TwglScene extends Component {

  constructor() {
    super();
    // set initial time:
    this.state = {
      time: Date.now(),
      hovering: false
    };
    this.glRender = this.glRender.bind(this);
  }

  componentDidMount() {

    this.el.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.el.addEventListener('mouseout', this.handleMouseOut.bind(this));

    const canvas = this.el;
    canvas.width = canvas.width * window.devicePixelRatio;
    canvas.height = canvas.width * window.devicePixelRatio;

    this.gl = canvas.getContext("webgl");
    this.programInfo = twgl.createProgramInfo(this.gl, [this.vertShader, this.fragShader]);

    const boxSize = 1.;

    const arrays = {
      position: [-boxSize, -boxSize, 0, boxSize, -boxSize, 0, -boxSize, boxSize, 0, -boxSize, boxSize, 0, boxSize, -boxSize, 0, boxSize, boxSize, 0],
    };
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

    this.textures = twgl.createTextures(this.gl, {
      noise: {
        src: 'assets/textures/noise256.jpg',
      },
    });

    // update time every second
    setTimeout(() => {
      this.glRender(1.)
    }, 100);

  }

  handleMouseOver() {
    this.setState({ hovering: true });
    requestAnimationFrame(this.glRender);
  }

  handleMouseOut() {
    this.setState({ hovering: false });
  }

  glRender(time) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    const uniforms = {
      time: time,
      resolution: [this.gl.canvas.width, this.gl.canvas.height],
      noise: this.textures.noise
    };

    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);

    if(this.state.hovering) {
      requestAnimationFrame(this.glRender);
    }
  }

	render({ frag, vert }) {
		return (<span><canvas ref={(canvas) => { this.el = canvas; this.fragShader = frag; this.vertShader = vert; }}/></span>);
	}

}
