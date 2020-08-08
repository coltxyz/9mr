
import React from 'react';

const svg = p => `
<svg viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.691223" y1="1.21779" x2="13.0337" y2="13.0237" stroke="${ p.color }" stroke-width="2"/>
<line x1="11.6357" y1="13.039" x2="23.4416" y2="1.2331" stroke="${ p.color }" stroke-width="2"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
