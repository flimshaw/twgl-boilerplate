import { Component, h } from 'preact';

export class FlimshawHeader extends Component {
	render({}) {
		return (
      <header className={`flimshaw`}>
        <a href={'http://flimshaw.net'}><img src={`assets/images/flimshaw-logo.png`} /></a>
      </header>
    );
	}
}
