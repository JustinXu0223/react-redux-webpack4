/*
 * @component sticky.js
 * @description 简单版吸顶
 * @time 2019/9/6
 * @author JUSTIN
 */
import React from 'react';
import PropTypes from 'prop-types';
// 引入context内容
import { SubscriberContext } from './stickyContainer';

const hardwareAcceleration = { transform: 'translateZ(0)' };

class Sticky extends React.PureComponent {
  // 将context绑定在contextType上面
  static contextType = SubscriberContext;

  constructor(props) {
    super(props);
    this.state = {
      style: {},
      placeholderHeight: 0,
    };

    this.container = React.createRef();
    this.placeholder = React.createRef();
  }

  componentDidMount() {
    if (!this.context.subscribe)
      throw new TypeError('Expected Sticky to be mounted within StickyContainer');

    // 使用context，将处理事件handleContainerEvent传递给父组件
    this.context.subscribe(this.handleContainerEvent);
  }

  componentWillUnmount() {
    // 使用context，移除父组件的监听
    this.context.unsubscribe(this.handleContainerEvent);
  }

  handleContainerEvent = ({ offsetTop, distanceFromBottom }) => {
    /* 判断是否吸顶条件
    由于container只包裹着placeholder和吸顶元素，且container的定位属性不会改变
    因此container.getBoundingClientRect().top大于0则吸顶元素处于正常文档流
    小于0则吸顶元素进行fixed定位，同时placeholder撑开吸顶元素原有的空间
    * */
    const { top, height } = this.container.current.getBoundingClientRect();
    const { width, left } = this.placeholder.current.getBoundingClientRect();
    const bottomDifference = distanceFromBottom - offsetTop - height;
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
        top: bottomDifference > 0 ? offsetTop + 0 : offsetTop + bottomDifference,
        width,
        left,
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
        {/* 目前使用children为func模式，传入style */}
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
