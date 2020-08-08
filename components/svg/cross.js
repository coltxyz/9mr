import React from 'react';

const svg = p => `
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.28824 2.28788L21.0003 20.9999" stroke="${ p.color }" stroke-width="2" stroke-linecap="square"/>
<path d="M2.28788 21.4428L20.9999 2.7308" stroke="${ p.color }" stroke-width="2" stroke-linecap="square"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
