import React from 'react';

const svg = p => `
<svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 16.2982C21 3.5655 7.78571 -0.8747 1 1.70178C1 1.70178 11 4.85317 11 16.2982C11 27.7433 1 30.3636 1 30.3636C6 32.634 21 29.031 21 16.2982Z" stroke="${ p.color }" stroke-width="2" stroke-linejoin="round"/>
</svg>

`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
