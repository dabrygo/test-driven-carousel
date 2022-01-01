import React from 'react';
import { action } from '@storybook/addon-actions';
import Carousel from '../src/Carousel';
import slides from '../example/slides';

export default {
  component: Carousel,
  argTypes: {
    autoAdvanceDelay: { 
        control: {
            type: 'range', min: 200, max:10e3, step: 200,
        }
    },
  },
};

const Template = (args) => {
    return <Carousel 
        slides={slides} 
        onIndexChange={action('onIndexChange')}
        {...args} 
    />;
};

export const Primary = Template.bind({});
Primary.args = {
    autoAdvanceDelay: 10e3,
};
