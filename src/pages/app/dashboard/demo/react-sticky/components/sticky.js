/*
 * @component sticky.js
 * @description 简单版吸顶
 * @time 2019/9/6
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';

const eventList = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

const hardwareAcceleration = { transform: 'translateZ(0)' };

class Sticky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      placeholderHeight: 0,
    };

    this.placeholder = React.createRef();
    this.container = React.createRef();

    this.rafHandle = null;
  }

  componentDidMount() {
    eventList.forEach(event =>
      this.getCurrentTarget().node.addEventListener(event, this.handleEvent),
    );
  }

  componentWillUnmount() {
    if (this.rafHandle) {
      raf.cancel(this.rafHandle);
      this.rafHandle = null;
    }
    eventList.forEach(event =>
      this.getCurrentTarget().node.removeEventListener(event, this.handleEvent),
    );
  }

  getCurrentTarget = () => {
    const { currentTarget } = this.props;
    if (currentTarget === window) {
      return {
        node: currentTarget,
        offsetTop: 0,
      };
    }
    const node = document.querySelector(currentTarget);
    return {
      node,
      offsetTop: node.offsetTop,
    };
  };

  handleEvent = () => {
    this.rafHandle = raf(() => {
      const { top, height } = this.container.current.getBoundingClientRect();
      /* 由于container只包裹着placeholder和吸顶元素，且container的定位属性不会改变
      因此container.getBoundingClientRect().top大于0则吸顶元素处于正常文档流
      小于0则吸顶元素进行fixed定位，同时placeholder撑开吸顶元素原有的空间
      * */
      const { width, left } = this.placeholder.current.getBoundingClientRect();
      const { offsetTop } = this.getCurrentTarget();
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
          ...hardwareAcceleration,
        },
        placeholderHeight: height,
      });
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

Sticky.defaultProps = {
  currentTarget: window,
};

Sticky.propTypes = {
  children: PropTypes.func.isRequired,
  currentTarget: PropTypes.objectOf(PropTypes.any),
};

export default Sticky;
