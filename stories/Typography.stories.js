import React from 'react';
import Typography from '../components/Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
};

const Template= (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Example Text',
};
