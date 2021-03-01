import classname from 'classnames';
import Head from 'next/head';
import { get } from 'dotty';
import Nav from './nav.js';

import {
  TRANSITION_ENTERING,
  TRANSITION_EXITING,
  COLORS,
  THEME_LIGHT,
  THEME_DARK,
} from '../lib/util';

export default class Layout extends React.Component {

  static defaultProps = {
    srollPos: 0,
    theme: THEME_LIGHT
  }

  render () {
    const {
      page_title: raw_title,
      page_description: description,
      page_share_image: social_img_url,
      page_url: url,
      gid: ga_id
    } = this.props.globals;
    const title = raw_title + (this.props.activePageName ? ` - ${ this.props.activePageName }` : '');
    const themeColor = name => get(COLORS, [this.props.theme, name]);

    return (
      <div>
        <Head>
          <script async src={ `https://www.googletagmanager.com/gtag/js?id=${ ga_id }` }></script>
          {
            ga_id && (
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                  function gtag(){
                    dataLayer.push(arguments);
                  }
                  gtag('js', new Date());
                  gtag('config', '${ ga_id }');
              `
            }}/>
          )}
          <link rel="shortcut icon" href="/favicon-32.png" />
          <link rel="icon" type="image/png" href="/favicon-196.png" />
          <link rel="apple-touch-icon" href="/favicon-180.png" />

          <meta name="description" content={ description } />
          <meta itemProp="name" content={ title } />
          <meta itemProp="description" content={ description } />
          <meta itemProp="image" content={ social_img_url } />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:title" content={ title } />
          <meta name="twitter:description" content={ description } />
          <meta name="twitter:image:src" content={ social_img_url } />
          <meta property="og:title" content={ title } />
          <meta property="og:image" content={ social_img_url } />
          <meta property="og:description" content={ description } />
          <meta property="og:type" content="website" />
          <meta property="og:image:height" content={ 1000 } />
          <meta property="og:image:width" content={ 1000 } />
          <meta property="og:description" content={ description } />
          <meta property="og:site_name" content={ title } />
          <meta property="og:url" content={ url } />

          <title>{ title }</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <style>
            {`
              :root {
                --stroke: ${ themeColor('black') };
                --background ${ themeColor('white') };
                --gray: ${ themeColor('gray') };
                --black: ${ themeColor('black') };
                --white: ${ themeColor('white') };
              }
            `}
          </style>
        </Head>
        <div
          id="main"
          className={classname({
            'content--homepage': !this.props.activeSlug,
            'content--pages': this.props.activeSlug
          })}
        >
          <div className="content-container">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
