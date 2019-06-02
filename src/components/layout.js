import React from "react"
import Wrapper from './wrapper';
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    
    return (
      <div>
        <Wrapper>
          <header>
            <Link to="/" className="website-title">
              Arjun
            </Link>
            <nav>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/archive">Archive</Link>
            </nav>
          </header>
          { children }
        </Wrapper>
        <footer>
          <div className="inner">
            <p className="text-center"><i>The central enemy of reliability is complexity</i></p>
          </div>
        </footer>

      </div>
    )
  }
}

export default Layout
