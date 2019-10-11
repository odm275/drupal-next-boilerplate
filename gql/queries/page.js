import gql from "graphql-tag";

const PageQuery = gql`
query PageQuery($uid: String!){
  nodeOne: nodeById(id: $uid) {
    ... on NodePage {
      title
      body {
        value
      }
    }
  }
}
`;

export default PageQuery;
