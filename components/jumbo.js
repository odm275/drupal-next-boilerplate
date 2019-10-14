import React from 'react';
import Dropdown from 'react-select';
import { Container, Header, Segment } from 'semantic-ui-react';
import Link from 'next/link';

const containerStyle = {
  width: '100%',
  height: '80vh',
  backgroundImage: 'url("/static/jumbo.jpg")',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundColor: 'rgba(0, 0, 54, 0.3)',
  backgroundBlendMode: 'multiply',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const buttonStyle = {
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  border: 0,
  borderRadius: 0,
  backgroundColor: 'transparent'
};

const segmentStyle = {
  flex: '1 0 25%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
};

const Jumbo = ({ textBanner, servicesMenu }) => {
  const serviceMenuColors = [
    'rgba(0,100,75,0.8)',
    'rgba(70,0,0,0.6)',
    'rgba(130,40,0,0.6)'
  ];
  console.log('servicesMenu', servicesMenu);
  return (
    <Container style={containerStyle}>
      <Container text>
        <Header
          as="h1"
          content="For Life's Biggest Decisions"
          inverted
          style={{
            fontSize: '0.9em',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            marginBottom: 0
          }}
        />
        <Header
          as="h2"
          content={textBanner}
          inverted
          style={{
            fontSize: '1.75em',
            fontWeight: 'lighter',
            marginTop: 0
          }}
        />
      </Container>
      <Container style={{ marginTop: 30 }}>
        <Segment.Group horizontal style={{ borderRadius: 0 }}>
          <Segment style={segmentStyle}>
            <div className="ui left icon input">
              <input
                type="text"
                placeholder="Your Name"
                style={{ border: 'none' }}
              />
              <i aria-hidden="true" className="user icon"></i>
            </div>
          </Segment>
          <Segment style={segmentStyle}>
            <div className="ui left icon input">
              <input
                type="text"
                placeholder="Your Email"
                style={{ border: 'none' }}
              />
              <i aria-hidden="true" className="mail icon"></i>
            </div>
          </Segment>
          <Segment style={segmentStyle}>
            <Dropdown
              styles={{ container: () => ({ width: '100%' }) }}
              options={[]}
              onChange={() => null}
              value={null}
              placeholder="How can we help?"
            />
          </Segment>
          <Segment style={segmentStyle}>
            <button style={buttonStyle}>
              Submit request{' '}
              <i aria-hidden="true" className="angle right icon"></i>
            </button>
          </Segment>
        </Segment.Group>
      </Container>
      <Container style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Segment.Group
          horizontal
          style={{ borderRadius: 0, margin: 0, border: 0 }}
        >
          {servicesMenu.map((link, i) => (
            <Segment
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 175,
                backgroundColor: serviceMenuColors[i]
              }}
            >
              <Container text>
                <Header as="h2" content={link.label} inverted />
                <Link href={link.url.path}>
                  <button style={{ ...buttonStyle, ...{ color: 'white' } }}>
                    {link.label}
                    <i
                      aria-hidden="true"
                      className="inverted angle right icon"
                    />
                  </button>
                </Link>
              </Container>
            </Segment>
          ))}
        </Segment.Group>
      </Container>
    </Container>
  );
};

export default Jumbo;
