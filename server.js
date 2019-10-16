const next = require('next');
const express = require('express');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const basePath = 'https://dev-drupal-next-boilerplate.pantheonsite.io/graphql';
const { request } = require('graphql-request');

const wildCardsAndPathToTemplate = [
  { endpoint: ':/page', pathToTemplate: '/page' },
  { endpoint: ':/page/:insurance', pathToTemplate: '/:product' }
];

function endPointFactor(arr) {
  return arr.map(newPage => {
    return function() {
      server.get(newPage.endpoint, (req, res) => {
        const queryParams = req.params.page ? { slug: req.params.page } : null;
        app.render(req, res, newPage.pathToTemplate, queryParams);
      });
    };
  });
}

function dynamicEndPointFactory(endPoint, pathToTemplate) {
  server.get(newPage.endpoint, (req, res) => {
    const queryParams = req.params.page ? { slug: req.params.page } : null;
    app.render(req, res, newPage.pathToTemplate, queryParams);
  });
}

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
    const queryParams = { page: req.params.page };
    //if query params title === fetch(drupal service pages)
    app.render(req, res, '/[page]', queryParams);
  });

  server.get('*', async (req, res) => {
    // console.log(req.originalUrl);
    // const allRoutes = await request(
    //   basePath,
    //   `query SiteMapQuery {
    //   nodeQuery(
    //     limit: 100
    //     offset: 0
    //     filter: {
    //       conditions: [{ operator: EQUAL, field: "type", value: ["page"] }]
    //     }
    //   ) {
    //     entities {
    //       entityUrl {
    //         path
    //       }
    //     }
    //   }
    // }`
    // );
    // if (allRoutes.find(req.originalUrl)) {
    // }
    // return res
    //   .status(200)
    //   .send('hello')
    //   .end();
    // l;
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log('server started at' + port);
  });
});
