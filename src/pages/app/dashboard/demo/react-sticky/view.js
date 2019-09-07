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
import Sticky from './components/sticky';

const StickyPage = styled.div`
  flex: 1;
  min-height: 2000px;
`;

const StickyHeaderView = styled.div`
  border: 1px solid red;
  height: 44px;
  display: flex;
  align-items: center;
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
        <div>ReactSticky page</div>
        <Sticky currentTarget='.layout-scroll-view'>
          {({ style }) => <StickyHeaderView style={style}>吸顶</StickyHeaderView>}
        </Sticky>
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
