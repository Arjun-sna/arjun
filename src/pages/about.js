import React from "react"
import { Link } from "gatsby"
import { CopyToClipboard } from "react-copy-to-clipboard"
import classnames from "classnames"
import Layout from "../components/layout"
import ExternalLinks from "../components/externalLinks"
import CopyIcon from "../../content/assets/copy.png"

const ClipboardInfo = info => (
  <p className="subtitle text-center">
    {info}
    <CopyToClipboard text={info}>
      <img
        src={CopyIcon}
        className={classnames(["img-small-icon", "pointer"])}
      />
    </CopyToClipboard>
  </p>
)

class About extends React.Component {
  copyToClipboard = content => {
    content.select()
    document.execCommand("copy")
  }

  render() {
    const email = "arj.sna@gmail.com"

    return (
      <Layout>
        <p>
          <img
            src="http://www.gravatar.com/avatar/6f5c7e921b7858f3f855024c15000ea5?s=300"
            className="img-circle"
          />
        </p>
        <ClipboardInfo info={email} />
        <p className="subtitle text-center">
          <ExternalLinks />
        </p>
        <p className="subtitle text-center">
          JavaScript | React | React Native | Node.js | Python | Java | Android
        </p>
        <ul>
          <li>Computer Science Engineering Graduate</li>
          <li>Software Engineer at Walmart Labs</li>
          <li>
            Worked on JS, Java, Android while engineering products in various
            domains like social networking, live video streaming, instant
            messaging, health care and more.
          </li>
        </ul>
      </Layout>
    )
  }
}

export default About
