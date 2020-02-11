import React from 'react';
import { throttle } from 'lodash';

// 判断元素是否在可视区
function isInViewPort(el) {
  if (!el) {
    return {};
  }
  const viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
  return {
    needAnimate: top > 0,
    isVisible: top <= viewPortHeight - 10 && top >= 10 - viewPortHeight,
  };
}

/* 参数
 *  {node} Component 容器组件 isRequire
 *  {array/string} classList 样式列表 isRequire ['className'] / 'className'
 *  {string} animateClassName 动画名称 'fadeInUp'
 *  {number} duration 动画持续时间 800 默认进场800秒 -> ./common/animated.scss $animated-duration
 * */
function WithScrollVisible(
  Component,
  { scrollClassName = '', classList, animateClassName = 'fadeInUp', duration = 800 },
) {
  class WrapperComponent extends React.Component {
    state = {
      isAnimated: false,
      isAnimatedMap: {},
    };

    componentDidMount() {
      this.handleScroll();
      this.getCurrScrollElem().addEventListener('scroll', this.handleScrollThrottle);
      window.addEventListener('resize', this.handleScrollThrottle);
    }

    componentWillUnmount() {
      this.removeEventListener();
    }

    getCurrScrollElem = () => {
      if (scrollClassName) {
        return document.querySelector(scrollClassName) || window;
      }
      return window;
    };

    getVisibilityStyle = () => {
      return this.state.isAnimated ? { visibility: 'visible' } : { visibility: 'hidden' };
    };

    removeEventListener = () => {
      this.getCurrScrollElem().removeEventListener('scroll', this.handleScrollThrottle);
      window.removeEventListener('resize', this.handleScrollThrottle);
    };

    // 进场完成后0.1s后，移除进场className，避免和切换动画冲突
    removeClassName = element => {
      setTimeout(() => {
        try {
          if (!element.classList) {
            return;
          }
          element.classList.remove('animated', animateClassName);
        } catch (e) {
          // 不处理
        }
      }, duration + 100);
    };

    // 处理多个class
    handleSelectorAll = () => {
      const list = Array.from(document.querySelectorAll(classList));
      if (!(Array.isArray(list) && list.length)) {
        return;
      }
      list.forEach(async (item, index) => {
        if (!item) {
          return;
        }
        const { needAnimate, isVisible } = isInViewPort(item);
        if (!(isVisible && !this.state.isAnimatedMap[index])) {
          return;
        }
        if (needAnimate) {
          item.classList.add('animated', animateClassName);
          this.removeClassName(item);
        }
        await this.setState(state => ({
          ...state,
          isAnimatedMap: {
            ...state.isAnimatedMap,
            [index]: true,
          },
        }));
        if (index !== list.length - 1) {
          return;
        }
        this.removeEventListener();
      });
    };

    // 处理单个class
    handleSelector = async () => {
      const element = document.querySelector(classList[0]);
      if (!element) {
        return;
      }
      const { needAnimate, isVisible } = isInViewPort(element);
      if (!(isVisible && !this.state.isAnimated)) {
        return;
      }
      this.removeEventListener();
      await this.setState({ isAnimated: true });
      if (needAnimate) {
        element.classList.add('animated', animateClassName);
        this.removeClassName(element);
      }
      if (classList.length <= 1) {
        return;
      }
      classList.slice(1).forEach(item => {
        const ele = document.querySelector(item);
        if (!ele) {
          return;
        }
        if (needAnimate) {
          ele.classList.add('animated', animateClassName);
          this.removeClassName(ele);
        }
      });
    };

    handleScroll = () => {
      if (typeof classList === 'string') {
        return this.handleSelectorAll();
      }
      if (Array.isArray(classList)) {
        return this.handleSelector();
      }
    };
    handleScrollThrottle = throttle(this.handleScroll, 100);

    render() {
      const componentProps = {
        ...this.props,
        ...this.state,
        visibilityStyle: this.getVisibilityStyle(),
      };
      return <Component {...componentProps} />;
    }
  }

  return WrapperComponent;
}

export default WithScrollVisible;
