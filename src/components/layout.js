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
            <a href="{{ site.baseurl }}/" className="website-title">
              Arjun
            </a>
            <nav>
              <a href="{{ site.baseurl }}/about/">Blog</a>
              <a href="{{ site.baseurl }}/about/">About</a>
              <a href="{{ site.baseurl }}/contact/">Contact</a>
              <a href="{{ site.baseurl }}/archive/">Archive</a>
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
