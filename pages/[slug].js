import React from "react";
import Head from "next/head";
import Error from "./_error";
import Nav from "../components/nav";
import Jumbo from "../components/jumbo";
import client from "../utils/drupal";
import { Header } from "semantic-ui-react";
import PageQuery from "../gql/queries/page";

const GenericPage = props => {
  console.log('props', props.p)
  const links = props.page.data.menuByName.links;
  if (!props.page) {
    return <Error statusCode={404} />;
  }
  console.log(props)
  return (
    <div>
      <Head>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Nav links={links}/>
      <Jumbo />
      <Header as="h1">{props.page.data.route.nodeContext.title}</Header>
      <div dangerouslySetInnerHTML={{__html:props.page.data.route.nodeContext.body.value}} />
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
