import React from 'react';

const svg = p => `
<svg viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24.5" cy="24.5" r="10.5" stroke="${ p.color }" stroke-width="2"/>
<rect x="42" y="24" width="7" height="2" rx="1" fill="${ p.color }"/>
<rect y="24" width="7" height="2" rx="1" fill="${ p.color }"/>
<rect x="26" y="42" width="7" height="2" rx="1" transform="rotate(90 26 42)" fill="${ p.color }"/>
<rect x="26" width="7" height="2" rx="1" transform="rotate(90 26 0)" fill="${ p.color }"/>
<rect x="37.2285" y="36.5205" width="7" height="2" rx="1" transform="rotate(45 37.2285 36.5205)" fill="${ p.color }"/>
<rect x="7.5293" y="6.82227" width="7" height="2" rx="1" transform="rotate(45 7.5293 6.82227)" fill="${ p.color }"/>
<rect x="13.1855" y="37.9346" width="7" height="2" rx="1" transform="rotate(135 13.1855 37.9346)" fill="${ p.color }"/>
<rect x="42.8848" y="8.23633" width="7" height="2" rx="1" transform="rotate(135 42.8848 8.23633)" fill="${ p.color }"/>
</svg>
`;

export default props => (
  <span dangerouslySetInnerHTML={{ __html: svg(props) }} />
)
