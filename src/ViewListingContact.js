import React from "react";
import { Button, Icon, Grid, Segment, Header, Label } from "semantic-ui-react";

const ViewListingAction = ({ contactName, contactEmail, adoptionFee }) => (
  <Grid.Column style={{ paddingTop: "14px" }} width={16}>
    <Segment inverted color="pink" className="listing-story">
      <Header as="h2" color="violet" content="Interested?" />
      <Grid stackable columns={16} className="listing-contact">
        <Grid.Row columns={16}>
          <Grid.Column mobile={16} tablet={8} computer={8} className="contact-info">
            <Header as="h4">
              <Icon name="user" color="violet" />
              <Header.Content>
                Contact Name:
                <Header.Subheader content={contactName} />
              </Header.Content>
            </Header>
            <Header as="h4">
              <Icon name="mail" color="violet" />
              <Header.Content>
                Contact Email:
                <Header.Subheader content={contactEmail} />
              </Header.Content>
            </Header>
            <Header as="h4">
              <Icon name="won sign" color="violet" />
              <Header.Content>
                Adoption Fee:
                <Header.Subheader
                  content={
                    adoptionFee
                      ? `₩${Number(adoptionFee.slice(1)).toLocaleString()}`
                      : adoptionFee
                  }
                />
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} className="listing-actions">
            <Button size="huge" color="purple">
              I'm interested!
            </Button>
            <div className="share-container">
              <Label
                icon="share"
                color="purple"
                pointing="below"
                className="socialMediaShare"
                content="Share"
              />
              <Button.Group>
                {socialShares.map(social => (
                  <Button
                    circular
                    {...social}
                    as="a"
                    rel="external-new-window"
                    className="socialMediaButton"
                  />
                ))}
              </Button.Group>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Grid.Column>
);

const socialShares = [
  {
    icon: "facebook",
    color: "facebook",
    key: "facebook",
    href:
      "http://www.facebook.com/sharer.php?u=https://www.adoptapet.com/pet/11308970-los-angeles-california-chihuahua&amp;text=Scrappy Doo, aChihuahuainCalifornia, needs a home now! See him on Adopt-a-Pet.com&amp;picture=https://pet-uploads.adoptapet.com/4/5/9/363003065.jpg",
  },
  {
    icon: "twitter",
    color: "twitter",
    key: "twitter",
    href:
      "https://twitter.com/intent/tweet?related=TweetACritter&url=https://www.adoptapet.com/pet/11308970-los-angeles-california-chihuahua&text=Scrappy%20Doo,%20a%20Chihuahua%20in%20California,%20needs%20a%20home%20now!%20See%20him%20on%20Adopt-a-Pet.com%20#TwitterACritter",
  },
  {
    icon: "pinterest",
    color: "red",
    key: "pinterest",
    href:
      "https://www.pinterest.com/login/?next=/pin/create/button/%3Furl%3Dhttps%3A//www.adoptapet.com/pet/11308970-los-angeles-california-chihuahua%26media%3Dhttps%3A//pet-uploads.adoptapet.com/4/5/9/363003065.jpg%26description%3DLos%2520Angeles%2C%2520California%2520-%2520Chihuahua.%2520Meet%2520Scrappy%2520Doo%2C%2520a%2520for%2520adoption.%2520https%3A//www.adoptapet.com/pet/11308970-los-angeles-california-chihuahua",
  },
  {
    icon: "mail",
    color: "yellow",
    key: "mail",
    href: "mailto:?Subject=Adopt a pet",
  },
];

export default ViewListingAction;
