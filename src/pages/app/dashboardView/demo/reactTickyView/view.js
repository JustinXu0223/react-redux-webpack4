/**
 * @component index.js
 * @description react sticky 页面
 * @time 2019/3/9
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// reduxs
import { connect } from 'react-redux';

// components
import StickyContainer from './components/stickyContainer';
import Sticky from './components/sticky';

const StickyPage = styled.div`
  flex: 1;
  height: 100%;
`;

const HeaderView = styled.div`
  height: 200px;
  background-color: #a397e4;
`;

const StickyHeaderView = styled.div`
  background-color: #d076e4;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const SectionView = styled.div`
  padding-top: 100px;
  height: 1000px;
  border: 1px solid red;
`;

@connect(state => ({
  language: state.language,
}))
class ReactSticky extends React.Component {
  state = {};

  render() {
    const {
      props: {
        language: { i18n = {} },
      },
    } = this;
    return (
      <StickyPage>
        <Helmet>
          <title>{i18n.helmet_title('react-sticky')}</title>
        </Helmet>
        {/*<StickyContainer relative>*/}
        {Array.from(Array(3)).map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <StickyContainer currentTarget='.layout-scroll-view' key={index}>
            <HeaderView>ReactSticky page {index}</HeaderView>
            <Sticky>
              {({ style }) => <StickyHeaderView style={style}>吸顶{index}</StickyHeaderView>}
            </Sticky>
            <SectionView>123123</SectionView>
          </StickyContainer>
        ))}
      </StickyPage>
    );
  }
}

ReactSticky.WrappedComponent.defaultProps = {};

ReactSticky.WrappedComponent.propTypes = {
  language: PropTypes.shape({
    code: PropTypes.string,
    i18n: PropTypes.object,
  }).isRequired,
};

export default ReactSticky;
