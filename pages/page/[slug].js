import React from "react";
import Head from "next/head";
import Error from "../_error";
import Nav from "../../components/nav";
import Jumbo from "../../components/jumbo";
import client from "../../utils/drupal";
import { Header } from "semantic-ui-react";
import PageQuery from "../../gql/queries/page";

const GenericPage = props => {
  if (!props.page) {
    return <Error statusCode={404} />;
  }
  console.log(props.page.data.nodeOne)
  return (
    <div>
      <Nav />
      <Jumbo />
      <Header as="h1">{props.page.data.nodeOne.title}</Header>
      <p>
     { props.page.data.nodeOne.body.value}
      </p>
    </div>
  );
};

GenericPage.getInitialProps = async ({ req, res, query }) => {
  console.log('query',query)
  try {
    const page = await client.query({
      query: PageQuery,
      variables: {
        uid: query.slug
      }
    });

    return { page };
  } catch (E) {
    console.log(E);
    return {};
  }
};

export default GenericPage;
