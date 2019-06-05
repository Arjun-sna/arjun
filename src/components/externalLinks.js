import React from 'react';

const siteLink = [
  { className: 'fa-linkedin', extLink: '' },
  { className: 'fa-github', extLink: '' },
  { className: 'fa-stack-overflow', extLink: 'https://stackoverflow.com/users/2809326/arjun' },
  { className: 'fa-twitter', extLink: '' },
  { className: 'fa-facebook-official', extLink: '' },
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