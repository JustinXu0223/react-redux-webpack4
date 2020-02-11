import React from 'react';
import { throttle } from 'lodash';

function getClient() {
  return {
    clientWidth: document.body.clientWidth,
    clientHeight: document.body.clientHeight,
  };
}

function WithOrientation(Component) {
  class WrapperComponent extends React.Component {
    state = {
      ...getClient(),
    };

    componentDidMount() {
      this.handleOrientationThrottle();
      // orientationchange 旋转无法获取当前真实的document.body.clientWidth
      window.addEventListener('resize', this.handleOrientationThrottle);
    }

    componentWillUnmount() {
      this.removeEventListener();
    }

    removeEventListener = () => {
      window.removeEventListener('resize', this.handleOrientationThrottle);
    };

    lastOrientation;
    handleOrientation = () => {
      if (typeof this.lastOrientation === 'undefined') {
        this.lastOrientation = window.orientation;
        return;
      }
      if (window.orientation === this.lastOrientation) {
        return;
      }
      this.lastOrientation = window.orientation;
      // 重新渲染整个页面
      this.setState(() => getClient());
    };
    handleOrientationThrottle = throttle(this.handleOrientation, 100);

    render() {
      const componentProps = {
        ...this.props,
        ...this.state,
      };
      return <Component {...componentProps} />;
    }
  }

  return WrapperComponent;
}

export default WithOrientation;
