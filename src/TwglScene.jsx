import twgl from 'twgl.js';
import { Component, h } from 'preact';

export class TwglScene extends Component {

  constructor() {
    super();
    // set initial time:
    this.state = {
      time: Date.now(),
      playing: false,
    };
    this.glRender = this.glRender.bind(this);
  }

  componentDidMount() {

    this.el.addEventListener('mouseover', this.handleMouseOver.bind(this));
    this.el.addEventListener('mouseout', this.handleMouseOut.bind(this));

    this.el.addEventListener('mousedown', () => {
      this.el.width = window.screen.width * window.devicePixelRatio;
      this.el.height = window.screen.height * window.devicePixelRatio;

      this.el.webkitRequestFullScreen();
    });

    // Note that the API is still vendor-prefixed in browsers implementing it
    document.addEventListener('webkitfullscreenchange', () => {

      const fs = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenEnabled;

      if ( !fs && this.el.width !== this.originalWidth ) {
        this.el.width = this.originalWidth;
        this.el.height = this.originalHeight;
      }
    });

    const canvas = this.el;

    this.gl = canvas.getContext("webgl");
    this.programInfo = twgl.createProgramInfo(this.gl, [this.vertShader, this.fragShader]);

    canvas.width = canvas.width * devicePixelRatio;
    canvas.height = canvas.height * devicePixelRatio;

    this.originalWidth = canvas.width;
    this.originalHeight = canvas.height;

    const boxSize = 1.;

    const arrays = {
      position: [-boxSize, -boxSize, 0, boxSize, -boxSize, 0, -boxSize, boxSize, 0, -boxSize, boxSize, 0, boxSize, -boxSize, 0, boxSize, boxSize, 0],
    };
    this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, arrays);

    this.textures = twgl.createTextures(this.gl, {
      noise: {
        src: 'assets/textures/noise256.jpg',
        mag: this.gl.NEAREST,
        min: this.gl.LINEAR,
      },
    }, () => this.glRender(1.));

  }

  handleMouseOver() {
    this.setState({ playing: true });
    requestAnimationFrame(this.glRender);
  }

  handleMouseOut() {
    this.setState({ playing: false });
  }

  glRender(time) {

    let width = this.gl.canvas.width;
    let height = this.gl.canvas.height;
    //
    // if(fs) {
    //   width = window.screen.width;
    //   height = window.screen.height;
    // }

    this.gl.viewport(0, 0, width, height);

    const uniforms = {
      time: time,
      resolution: [width, height],
      noise: this.textures.noise
    };

    this.gl.useProgram(this.programInfo.program);
    twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
    twgl.setUniforms(this.programInfo, uniforms);
    twgl.drawBufferInfo(this.gl, this.bufferInfo);

    if(this.state.playing) {
      requestAnimationFrame(this.glRender);
    }
  }

	render({ frag, vert }) {
		return (<div><canvas ref={(canvas) => { this.el = canvas; this.fragShader = frag; this.vertShader = vert; }}/></div>);
	}

}
