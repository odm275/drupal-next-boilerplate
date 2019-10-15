import gql from 'graphql-tag';
const SiteMapQuery = gql`
  query SiteMapQuery {
    nodeQuery(
      limit: 100
      offset: 0
      filter: {
        conditions: [{ operator: NOT_EQUAL, field: "type", value: ["webform"] }]
      }
    ) {
      entities {
        entityUrl {
          path
        }
      }
    }
  }
`;

export default SiteMapQuery;
