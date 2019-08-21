/**
 * @component index.js
 * @description Demo页面
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';

// components
import { Button } from 'antd';
import HocBasic from 'components/hocBasic';

// reduxs
import { connect } from 'react-redux';
import immutable from 'immutable';
import { INCREMENT_REQ, DECREASE_REQ } from 'reduxs/actions/demo';
import { getCounter } from 'reduxs/selectors/demo';

// styles
import styles from './styles.less';

@connect(
  state => ({
    demo: state.demo,
    counter: getCounter(state),
  }),
  dispatch => ({
    incrementReq: payload => dispatch({ type: INCREMENT_REQ, payload }),
    decreaseReq: payload => dispatch({ type: DECREASE_REQ, payload }),
  }),
)
class Demo extends React.Component {
  state = {
    backgroundColor: 'red',
  };

  onToggleBg = () => {
    this.setState({
      backgroundColor: this.state.backgroundColor === 'red' ? 'blue' : 'red',
    });
  };

  renderList = () => {
    const {
      props: { demo, incrementReq, decreaseReq },
    } = this;
    const list = demo.get('list');
    const loading = demo.get('loading');
    if (!list.size) return null;
    return list.map(value => {
      const id = value.get('id');
      return (
        <div className={styles.demoItemView}>
          <div> name: {value.get('name')}</div>
          <div> number: {value.get('number')}</div>
          <div className={styles.buttonView}>
            <Button type='primary' loading={loading} onClick={() => incrementReq(id)}>
              增加
            </Button>
            <Button type='danger' loading={loading} onClick={() => decreaseReq(id)}>
              减少
            </Button>
          </div>
        </div>
      );
    });
  };

  render() {
    const {
      state: { backgroundColor },
      props: { counter },
    } = this;
    return (
      <div className={styles.demoPage}>
        Demo page
        <div
          className={styles.sectionView}
          style={{ backgroundColor, height: '30px' }}
          onClick={this.onToggleBg}
        >
          sum: {counter}
        </div>
        {this.renderList()}
      </div>
    );
  }
}

Demo.defaultProps = {};

Demo.propTypes = {
  counter: PropTypes.number.isRequired,
  demo: PropTypes.instanceOf(immutable.Map).isRequired,
  incrementReq: PropTypes.func.isRequired,
  decreaseReq: PropTypes.func.isRequired,
};

export default HocBasic(Demo);
