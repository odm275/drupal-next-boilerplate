import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';
import Jumbo from '../components/jumbo';
import Stats from '../components/stats';
import client from '../utils/drupal';
import HomepageQuery from '../gql/queries/homepage';

const Home = props => {
  const { mainMenu } = props.homepage.data;
  const { servicesMenu } = props.homepage.data;
  const { fieldTextBanner } = props.homepage.data.nodeById;
  const { title } = props.homepage.data.nodeById;

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
      <Stats data={props.homepage.data.nodeById} />
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  try {
    const homepage = await client.query({
      query: HomepageQuery
    });

    return { homepage };
  } catch (E) {
    console.log(E);
  }
};

export default Home;
