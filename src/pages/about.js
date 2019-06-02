import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

class About extends React.Component {
  render() {
    return (
      <Layout>
        <h1 className="text-center">About Me</h1>
        <br />
        <p>
          <img src="http://www.gravatar.com/avatar/25e64e519ecd251446d48fbc09e0c87a?s=300" class="img-circle" />
        </p>
        <p class="subtitle text-center">
          <Link class="fa fa-linkedin" href=""></Link>
          <Link class="fa fa-github" href=""></Link>
          <Link class="fa fa-stack-overflow" href=""></Link>
          <Link class="fa fa-twitter" href=""></Link>
          <Link class="fa fa-facebook-official" href=""></Link>
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