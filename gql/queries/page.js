import gql from 'graphql-tag';

const PageQuery = gql`
  query PageQuery($uid: String!) {
    route(path: $uid) {
      ... on EntityCanonicalUrl {
        nodeContext {
          ...Page
        }
      }
    }
    servicesMenu: menuByName(name: "services-menu") {
      links {
        label
        url {
          path
        }
      }
    }
    mainMenu: menuByName(name: "main") {
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
    fieldTextBanner {
      value
    }
  }
`;

export default PageQuery;
