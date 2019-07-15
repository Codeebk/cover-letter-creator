import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header, BlogList } from 'components';
import { Layout, Container } from 'layouts';


const Blog = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title={'Blog Page'} />
      <Header title="Create Input form">Answer the following questions to generate a cover letter</Header>
      {/* {edges.map(({ node }) => (
        <BlogList
          key={node.id}
          cover={node.frontmatter.cover.childImageSharp.fluid}
          path={node.frontmatter.path}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          tags={node.frontmatter.tags}
          excerpt={node.excerpt}
        />
      ))} */}
      <Container>
      <form method="POST" data-netlify="true" name="cover-letter-form">

      {/* <input type="hidden" name="cover-letter-form" value="cover-letter-form" /> */}

      <p>Your First Name:</p>  
      <input type="text" name="firstname" id="firstname" required />

      <p>Your Last Name:</p>  
      <input type="text" name="lastname" id="lastname" required />

      <p>What is the title of the job you are applying for?</p>  
      <input type="text" name="targetjobtitle" id="targetjobtitle" required />

      <p>What is the name of the company?</p>  
      <input type="text" name="targetcompany" id="targetcompany" required />

      <p>What are your top 3 relevant skills?</p>
      <p>Skill 1:</p>  
      <input type="text" name="skillone" id="skillone" required />

      <p>Skill 2:</p>  
      <input type="text" name="skilltwo" id="skilltwo" required />

      <p>Skill 3:</p>  
      <input type="text" name="skillthree" id="skillthree" required />

  <h3>   
  <button type="submit">Create Letter</button>
  </h3>

</form>
</Container>

    
    </Layout>
  );
};

export default Blog;

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              cover: PropTypes.object.isRequired,
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
            path
            tags
            date(formatString: "MM.DD.YYYY")
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
