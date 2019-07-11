import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { projectsToShow } from '../utils/helpers';

export default ({ data }) => {
  const filteredProjects = data.github.viewer.repositories.nodes.filter(
    ({ name }) => projectsToShow.includes(name)
    );
  console.log({filteredProjects});
  return (
    <Layout>
      {
        filteredProjects.map(project => (
          <article>
            <span className="meta">
              { `${project.stargazers.totalCount} Stars • ${project.forkCount} forks` }
            </span>
            <a href={project.url} target="_blank"><h1>{ project.name }</h1></a>
            <p>
              { project.description }
            </p>
            {
              project.homepageUrl && 
                <a href={project.homepageUrl} target="_blank" className="read-more">Try Demo →</a>
            }
          </article>
        ))
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    github {
      viewer {
        repositories(first: 100, orderBy: { field : CREATED_AT, direction: DESC }) {
          nodes {
            name
            url
            description
            homepageUrl
            stargazers {
              totalCount
            }
            languages(first: 100) {
              nodes {
                name
              }
            }
            forkCount
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`