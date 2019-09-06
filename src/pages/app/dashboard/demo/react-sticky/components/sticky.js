/*
 * @component sticky.js
 * @description 简单版吸顶
 * @time 2019/9/6
 * @author chat
 */
import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';

const events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

const hardwareAcceleration = { transform: 'translateZ(0)' };

class Sticky extends React.Component {
  constructor(props) {
    super(props);
    this.placeholder = React.createRef();
    this.container = React.createRef();
    this.state = {
      style: {},
      placeholderHeight: 0,
    };
    this.rafHandle = null;
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    events.forEach(event => window.addEventListener(event, this.handleEvent));
  }

  componentWillUnmount() {
    if (this.rafHandle) {
      raf.cancel(this.rafHandle);
      this.rafHandle = null;
    }
    events.forEach(event => window.removeEventListener(event, this.handleEvent));
  }

  handleEvent() {
    this.rafHandle = raf(() => {
      const { top, height } = this.container.current.getBoundingClientRect();
      // 由于container只包裹着placeholder和吸顶元素，且container的定位属性不会改变
      // 因此container.getBoundingClientRect().top大于0则吸顶元素处于正常文档流
      // 小于0则吸顶元素进行fixed定位，同时placeholder撑开吸顶元素原有的空间
      const { width } = this.placeholder.current.getBoundingClientRect();
      if (top > 0) {
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
          top: '0',
          width,
          ...hardwareAcceleration,
        },
        placeholderHeight: height,
      });
    });
  }

  render() {
    const { style, placeholderHeight } = this.state;
    return (
      <div ref={this.container}>
        <div style={{ height: placeholderHeight }} ref={this.placeholder} />
        {React.cloneElement(this.props.children, { style })}
      </div>
    );
  }
}

Sticky.defaultProps = {};

Sticky.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sticky;
