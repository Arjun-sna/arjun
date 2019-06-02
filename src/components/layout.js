import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    
    return (
      <header>
        <a href="{{ site.baseurl }}/" className="website-title">
          Arjun
        </a>
        <nav>
          <a href="{{ site.baseurl }}/about/">About</a>
          <a href="{{ site.baseurl }}/contact/">Contact</a>
          <a href="{{ site.baseurl }}/archive/">Archive</a>
        </nav>
      </header>
    )
  }
}

export default Layout
