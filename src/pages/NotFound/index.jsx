/**
 * @component index.jsx
 * @description 错误页
 * @time 2018/5/7
 * @author JUSTIN XU
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import history from '@/utils/history';
import errorImage from '../../assets/404.svg';

const ContainerDiv = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionDiv = styled.div`
  width: 400px;
  padding-top: 80px;
  padding-left: 60px;
`;

const TitleH2 = styled.h2`
  font-size: 72px;
  font-weight: 600;
  line-height: 72px;
  margin-bottom: 24px;
`;

const MessageP = styled.p`
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFound = ({ language: { i18n = {} } }) => (
  <ContainerDiv>
    <img src={errorImage} alt="404" />
    <Helmet>
      <title>{i18n.helmet_title('Not Found')}</title>
    </Helmet>
    <SectionDiv>
      <TitleH2>404</TitleH2>
      <MessageP>{i18n.not_found_message}</MessageP>
      <ButtonDiv>
        <Button
          style={{ marginRight: '7px' }}
          onClick={() => {
            history.go(-1);
          }}
        >
          {i18n.not_found_back_button}
        </Button>
        <Button type="primary">
          <a href={`${window.location.origin}`}>{i18n.not_found_home_button}</a>
        </Button>
      </ButtonDiv>
    </SectionDiv>
  </ContainerDiv>
);

const mapStateToProps = (state) => ({
  language: state.language,
});

NotFound.propTypes = {
  language: PropTypes.shape({
    code: PropTypes.string,
    i18n: PropTypes.object,
  }).isRequired,
};

export default connect(mapStateToProps, null)(NotFound);

