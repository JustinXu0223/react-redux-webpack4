import React from 'react';

// utils
import { isIos } from 'utils/device';

function WithFixIosInput(Component) {
  class WrapperComponent extends React.Component {
    state = {};

    componentDidMount() {
      this.addEventListener();
    }

    componentWillUnmount() {
      this.removeEventListener();
    }

    flag;
    timeout;
    addEventListener = () => {
      if (!isIos()) {
        return;
      }
      document.body.addEventListener('focusin', () => {
        // 软键盘弹起事件
        this.flag = true;
        clearTimeout(this.timeout);
      });
      document.body.addEventListener('focusout', () => {
        // 软键盘关闭事件
        this.flag = false;
        if (!this.flag) {
          this.timeout = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // 重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
          }, 200);
        }
      });
    };

    removeEventListener = () => {
      document.body.removeEventListener('focusin', () => null);
      document.body.removeEventListener('focusout', () => null);
    };

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

export default WithFixIosInput;
