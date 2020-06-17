import React from "react"
import classnames from "classnames"
import { CopyToClipboard } from "react-copy-to-clipboard"
import CopyIcon from "../../content/assets/copy.png"

export default ({ info }) => (
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
