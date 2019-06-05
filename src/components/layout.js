import React from "react"
import { Link } from "gatsby"
import Wrapper from './wrapper';
import ExternalLinks from './externalLinks';

class Layout extends React.Component {
  render() {
    const { children } = this.props
    
    return (
      <div>
        <Wrapper>
          <header>
            <Link to="/" className="website-title">
              Arjun
            </Link>
            <nav>
              <Link to="/">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/archive">Archive</Link>
            </nav>
          </header>
          { children }
        </Wrapper>
        <footer>
          <div className="inner">
            <p className="text-center">
              <i>The central enemy of reliability is complexity</i>
              <br />
              <ExternalLinks />
            </p>
          </div>
        </footer>

      </div>
    )
  }
}

export default Layout
