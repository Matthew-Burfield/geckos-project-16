import React, { Fragment } from "react";
import { List, Grid } from "semantic-ui-react";

const ViewListingFacts = ({ breed, gender, age, color, weight, location }) => (
  <Fragment>
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <List.Item>
            <List.Content>
              <strong>Breed:</strong> Husky
            </List.Content>
          </List.Item>
        </Grid.Column>
        <Grid.Column width={3}>
          <List.Item>
            <List.Content>
              <strong>Color:</strong> Black
            </List.Content>
          </List.Item>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>
          <List.Item>
            <List.Content>
              <strong>Gender:</strong> Female
            </List.Content>
          </List.Item>
        </Grid.Column>
        <Grid.Column width={3}>
          <List.Item>
            <List.Content>
              <strong>Weight:</strong> 8kg
            </List.Content>
          </List.Item>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>
          <List.Item>
            <List.Content>
              <strong>Age:</strong> 3 years
            </List.Content>
          </List.Item>
        </Grid.Column>
        <Grid.Column width={3}>
          <List.Item>
            <List.Content>
              <strong>Location:</strong> Busan
            </List.Content>
          </List.Item>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Fragment>
);

export default ViewListingFacts;
