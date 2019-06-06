import React from 'react';

const siteLink = [
  { className: 'fa-linkedin', extLink: 'https://www.linkedin.com/in/arjun-s-n-166b3b64/' },
  { className: 'fa-github', extLink: 'https://github.com/Arjun-sna' },
  { className: 'fa-stack-overflow', extLink: 'https://stackoverflow.com/users/2809326/arjun' },
  { className: 'fa-twitter', extLink: 'https://twitter.com/arjun_sna' },
  { className: 'fa-facebook-official', extLink: 'https://www.facebook.com/arjun.sna' },
]

export default () => (
  <>
    {
      siteLink.map(({ className, extLink }) => (
        <a className={`fa-sm fa ${className}`}  target="_blank" href={extLink} />
      ))
    }
  </>
)