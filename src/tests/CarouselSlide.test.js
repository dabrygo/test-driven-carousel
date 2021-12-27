import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import CarouselSlide from '../CarouselSlide';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('CarouselSlide', () => {
  const imgUrl = 'https://example.com/image.png';
  const description = 'A jaw-droppingly spectacular image';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide imgUrl={imgUrl} description={description} />,
    );
  });

  it('renders a <figure>', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('renders props.Img and a <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes `imgUrl` through to the <img>', () => {
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
    expect(img.prop('src')).toBe(imgUrl);
  });

  it('uses `description` and `attribution` as the <figcaption>', () => {
    const attribution = 'Trevor Burnham';
    wrapper.setProps({ attribution });
    expect(wrapper.find('figcaption').text()).toBe(
      `${description} ${attribution}`,
    );
    expect(wrapper.find('figcaption strong').text()).toBe(description);
  });

  it('passes other props through to the <figure>', () => {
    const style = () => {};
    const onClick = () => {};
    const className = 'my-carousel-slide';
    wrapper.setProps({ style, onClick, className });
    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('className')).toBe(className);
  });

  describe('Img', () => {
    let mounted;
    const imgUrl = 'https://example.com/default.jpg';

    beforeEach(() => {
      const Img = CarouselSlide.defaultProps.Img;
      mounted = mount(<Img src={imgUrl} imgHeight={500} />);
    });

    it('renders an <img> with the given src', () => {
      expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
    });
  });
});
