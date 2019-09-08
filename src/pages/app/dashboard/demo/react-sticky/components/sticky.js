/*
 * @component sticky.js
 * @description 简单版吸顶
 * @time 2019/9/6
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import { SubscriberContext } from './stickyContainer';

const hardwareAcceleration = { transform: 'translateZ(0)' };

class Sticky extends React.PureComponent {
  static contextType = SubscriberContext;

  constructor(props) {
    super(props);
    this.state = {
      style: {},
      placeholderHeight: 0,
    };

    this.placeholder = React.createRef();
    this.container = React.createRef();
  }

  componentDidMount() {
    if (!this.context.subscribe)
      throw new TypeError('Expected Sticky to be mounted within StickyContainer');

    this.context.subscribe(this.handleContainerEvent);
  }

  componentWillUnmount() {
    this.context.unsubscribe(this.handleContainerEvent);
  }

  handleContainerEvent = ({ offsetTop }) => {
    const { top, height } = this.container.current.getBoundingClientRect();
    /* 判断是否吸顶条件
    1. 由于container只包裹着placeholder和吸顶元素，且container的定位属性不会改变
    因此container.getBoundingClientRect().top大于0则吸顶元素处于正常文档流
    小于0则吸顶元素进行fixed定位，同时placeholder撑开吸顶元素原有的空间
    * */
    const { width, left } = this.placeholder.current.getBoundingClientRect();
    // console.log('@top:', top);
    if (!this.firstTop) {
      this.firstTop = top;
    }
    if (top - offsetTop > 0) {
      this.setState({
        style: {
          ...hardwareAcceleration,
        },
        placeholderHeight: 0,
      });
      return;
    }
    this.setState({
      style: {
        position: 'fixed',
        top: offsetTop,
        width,
        left,
        zIndex: 1,
        ...hardwareAcceleration,
      },
      placeholderHeight: height,
    });
  };

  render() {
    const {
      state: { style, placeholderHeight },
    } = this;
    return (
      <div ref={this.container}>
        <div style={{ height: placeholderHeight }} ref={this.placeholder} />
        {this.props.children({ style })}
      </div>
    );
  }
}

Sticky.defaultProps = {};

Sticky.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Sticky;
