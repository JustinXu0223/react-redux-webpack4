/**
 * @component index.js
 * @description Demo页面
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// components
import { Button } from 'antd';
import HocBasic from 'components/hocBasic';

// reduxs
import { connect } from 'react-redux';
import immutable from 'immutable';
import { INCREMENT_REQ, DECREASE_REQ } from 'reduxs/actions/demo';
import { getCounter } from 'reduxs/selectors/demo';

const DemoPage = styled.div`
  flex: 1;
`;

const SectionView = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  height: 40px;
`;

const DemoItemView = styled.div`
  border-bottom: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

@connect(
  state => ({
    language: state.language,
    demo: state.demo,
    counter: getCounter(state),
  }),
  dispatch => ({
    incrementReq: payload => dispatch({ type: INCREMENT_REQ, payload }),
    decreaseReq: payload => dispatch({ type: DECREASE_REQ, payload }),
  }),
)
class Counter extends React.Component {
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
        <DemoItemView>
          <div> name: {value.get('name')}</div>
          <div> number: {value.get('number')}</div>
          <ButtonView>
            <Button type='primary' loading={loading} onClick={() => incrementReq(id)}>
              增加
            </Button>
            <Button type='danger' loading={loading} onClick={() => decreaseReq(id)}>
              减少
            </Button>
          </ButtonView>
        </DemoItemView>
      );
    });
  };

  render() {
    const {
      state: { backgroundColor },
      props: {
        counter,
        language: { i18n = {} },
      },
    } = this;
    return (
      <DemoPage>
        <Helmet>
          <title>{i18n.helmet_title('Counter')}</title>
        </Helmet>
        Demo page
        <SectionView style={{ backgroundColor, height: '30px' }} onClick={this.onToggleBg}>
          sum: {counter}
        </SectionView>
        {this.renderList()}
      </DemoPage>
    );
  }
}

Counter.defaultProps = {};

Counter.propTypes = {
  language: PropTypes.shape({
    code: PropTypes.string,
    i18n: PropTypes.object,
  }).isRequired,
  counter: PropTypes.number.isRequired,
  demo: PropTypes.instanceOf(immutable.Map).isRequired,
  incrementReq: PropTypes.func.isRequired,
  decreaseReq: PropTypes.func.isRequired,
};

export default HocBasic(Counter);
