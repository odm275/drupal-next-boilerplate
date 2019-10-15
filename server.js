const next = require('next');
const express = require('express');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const basePath = 'https://dev-drupal-next-boilerplate.pantheonsite.io/graphql';
const { request } = require('graphql-request');

const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.get('/sitemap.xml', async (req, res) => {
    const sitemap = await request(
      basePath,
      ` query SiteMapQuery {
      nodeQuery(
        limit: 100
        offset: 0
        filter: {
          conditions: [{ operator: EQUAL, field: "type", value: ["page"] }]
        }
      ) {
        entities {
          entityUrl {
            path
          }
        }
      }
    }`
    );
    const allUrl = sitemap.nodeQuery.entities;
    const myDomain = 'mySite.com';
    const siteMapString = allUrl
      .map((url, i, array) => {
        if (i === 0) {
          return `<urlset><url>${myDomain}${url.entityUrl.path}</url>`;
        } else if (i === array.length - 1) {
          return `</urlset>`;
        } else {
          return `
          <url>${myDomain}${url.entityUrl.path}</url>`;
        }
      })
      .join('')
      .trim();
    res.setHeader('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>${siteMapString}`);
    res.end();
  });

  server.get('/', (req, res) => {
    app.render(req, res, '/homepage');
  });
  server.get('/:page', (req, res) => {
    const queryParams = { slug: req.params.page };
    //if query params title === fetch(drupal service pages)
    app.render(req, res, '/page', queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log('server started at' + port);
  });
});
