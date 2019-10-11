import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";

const Stats = ({data}) =>{
  console.log('data for statss', data)

  
return(
  <Container>
    <Segment.Group
      horizontal
      style={{ borderRadius: 0, margin: 0, border: 0, boxShadow: "none" }}
    >
        <Segment
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 175,
            backgroundColor: "transparent",
            border: 0
          }}
        >
          <Container text>
            <Header
              as="h2"
              style={{
                fontWeight: "bold",
                marginBottom: 0,
                fontSize: 40,
                color: "rgba(67, 206, 224,1)"
              }}
              content={data.title}
            />
            <Header
              as="h3"
              style={{
                fontWeight: "lighter",
                marginTop: 5,
                lineHeight: 1.7,
                fontSize: 16
              }}
              content={data.body.value}
            />
          </Container>
        </Segment>

    </Segment.Group>
  </Container>
);
}

export default Stats;
