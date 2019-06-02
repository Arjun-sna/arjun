import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import ExternalLinks from '../components/externalLinks';

class About extends React.Component {
  render() {
    return (
      <Layout>
        <h1 className="text-center">About Me</h1>
        <br />
        <p>
          <img src="http://www.gravatar.com/avatar/6f5c7e921b7858f3f855024c15000ea5?s=300" class="img-circle" />
        </p>
        <p class="subtitle text-center">
          <ExternalLinks />
        </p>
        <ul>
          <li>Computer Science Engineering Graduate</li>
          <li>Working as Software Engineer at CodeBrahma Technologies as a Mobile application developer</li>
          <li>Worked on Android, Java, JS while engineering products in various domains like social networking, live video streaming, instant messaging, health care and more.</li>
        </ul>
      </Layout>
    )
  }
}

export default About;