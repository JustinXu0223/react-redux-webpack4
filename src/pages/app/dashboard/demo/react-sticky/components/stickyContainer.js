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

export const SubscriberContext = React.createContext({});

class StickyContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    // 容器ref
    this.scrollView = React.createRef();

    // raf处理器
    this.rafHandle = null;

    // 订阅监听处理列表
    this.subscribers = [];
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
    const { currentTarget, relative } = this.props;
    if (relative) {
      const node = this.getParent();
      return {
        node,
        offsetTop: node.offsetTop,
      };
    }
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

  getParent = () => this.scrollView.current;

  subscribe = handler => {
    this.subscribers = this.subscribers.concat(handler);
  };

  unsubscribe = handler => {
    this.subscribers = this.subscribers.filter(current => current !== handler);
  };

  handleEvent = () => {
    if (!this.framePending) {
      this.rafHandle = raf(() => {
        this.framePending = false;
        // 获取容器滚动高度 -> 为联系人多列表使用
        const { offsetTop } = this.getCurrentTarget();
        this.subscribers.forEach(handler =>
          handler({
            offsetTop,
          }),
        );
      });
      this.framePending = true;
    }
  };

  render() {
    const {
      props: { children, relative },
    } = this;
    const subscribeValue = {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
    return (
      <SubscriberContext.Provider value={subscribeValue}>
        <div ref={this.scrollView} style={relative ? { overflowY: 'auto', height: '100%' } : {}}>
          {children}
        </div>
      </SubscriberContext.Provider>
    );
  }
}

StickyContainer.defaultProps = {
  currentTarget: window,
  relative: false,
};

StickyContainer.propTypes = {
  children: PropTypes.node.isRequired,
  currentTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.any)]),
  relative: PropTypes.bool,
};

export default StickyContainer;
