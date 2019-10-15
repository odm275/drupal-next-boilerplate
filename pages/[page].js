import React from 'react';
import Head from 'next/head';
import Error from './_error';
import Nav from '../components/nav';
import Jumbo from '../components/jumbo';
import client from '../utils/drupal';
import PageQuery from '../gql/queries/page';
import Stats from '../components/stats';

const GenericPage = props => {
  const { mainMenu } = props.page.data;
  const { servicesMenu } = props.page.data;
  const { fieldTextBanner } = props.page.data.route.nodeContext;
  const { title } = props.page.data.route.nodeContext;

  if (!props.page) {
    return <Error statusCode={404} />;
  }
  return (
    <div>
      <Head>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <title>{title}</title>
      </Head>

      <Nav links={mainMenu.links} />
      <Jumbo
        textBanner={fieldTextBanner.value}
        servicesMenu={servicesMenu.links}
      />
      <Stats data={props.page.data.route.nodeContext} />
    </div>
  );
};

GenericPage.getInitialProps = async ({ req, res, query }) => {
  console.log('page-queryyyyyyyyyy', query);
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
