import gql from "graphql-tag";

const HomepageQuery = gql`
{
  nodeOne: nodeById(id: "7") {
    ... on NodePage {
      title
      body {
        value
      }
    }
  }
}
`;

export default HomepageQuery;
