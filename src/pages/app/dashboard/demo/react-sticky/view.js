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

// components

// reduxs
import { connect } from 'react-redux';

const StickyPage = styled.div`
  flex: 1;
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
        ReactSticky page
      </StickyPage>
    );
  }
}

ReactSticky.defaultProps = {};

ReactSticky.propTypes = {
  language: PropTypes.shape({
    code: PropTypes.string,
    i18n: PropTypes.object,
  }).isRequired,
};

export default ReactSticky;
