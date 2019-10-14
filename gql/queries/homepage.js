import gql from 'graphql-tag';

const HomepageQuery = gql`
  query HomepageQuery {
    nodeById(id: "7") {
      ...Page
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

export default HomepageQuery;
