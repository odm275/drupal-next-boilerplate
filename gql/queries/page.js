import gql from "graphql-tag";

const PageQuery = gql`
query PageQuery($uid: String!){
  route(path: $uid) {
    ... on EntityCanonicalUrl {
      nodeContext {
        ...Page
      }
    }
  }
  menuByName(name: "main") {
    links {
      label
      url {
        path
      }
    }
  }
}
fragment Page on NodePage {
  title
  body {
    value
  }

}
`;

export default PageQuery;
