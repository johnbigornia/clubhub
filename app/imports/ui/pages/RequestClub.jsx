import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Requests } from '../../api/request/Requests';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  clubName: String,
  type: [{ type: String }],
  contactName: String,
  email: String,
  website: {
    type: String,
    optional: true,
    defaultValue: 'N/A',
  },
  image: {
    type: String,
    defaultValue: 'https://react.semantic-ui.com/images/wireframe/image.png',
    optional: true,
  },
  description: {
    type: String,
    defaultValue: 'magnus opus change me',
    optional: true,
  },
  rioemail: { type: String, optional: true },
});

/** Renders the Page for adding a document. */
class RequestClub extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { clubName, type, contactName, email, website, image, description, rioemail } = data;
    const owner = Meteor.user().username;
    Requests.insert({ clubName, type, contactName, email, website, image, description, rioemail, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Club request sent!', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <div className={'general-background'}>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Request a Club</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <TextField name='clubName'/>
                  <SelectField
                      name='type'
                      options={[
                        { label: 'Academic', value: 'Academic' },
                        { label: 'Professional', value: 'Professional' },
                        { label: 'Athletic', value: 'Athletic' },
                        { label: 'Religious', value: 'Religious' },
                        { label: 'Spiritual', value: 'Spiritual' },
                        { label: 'Political', value: 'Political' },
                        { label: 'Sports', value: 'Sports' },
                        { label: 'Leisure', value: 'Leisure' },
                        { label: 'Service', value: 'Service' },
                        { label: 'Fraternity', value: 'Fraternity' },
                        { label: 'Sorority', value: 'Soroity' },
                        { label: 'Recreational', value: 'Recreational' },
                        { label: 'Student Affairs', value: 'Student Affairs' },
                        { label: 'Ethnic', value: 'Ethnic' },
                        { label: 'Cultural', value: 'Cultural' },
                        { label: 'Honorary Society', value: 'Honorary Society' },
                      ]}/>
                  <TextField name='contactName'/>
                  <TextField name='email'/>
                  <TextField name='website'/>
                  <TextField name='rioemail'/>
                  <LongTextField name='description'/>
                  <SubmitField value={'submit'} />
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default RequestClub;
