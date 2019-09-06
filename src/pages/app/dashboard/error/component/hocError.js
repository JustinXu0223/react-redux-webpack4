/*
 * @component HocError
 * @description
 * @time 2019/8/26
 * @author chat
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { connect } from 'react-redux';

// reudxs
import { CHANGE_LANGUAGE_NAME } from 'reduxs/actions/global';

// components
import SvgIcon from 'components/svgIcon';

// utils
import history from 'utils/history';

const ContainerView = styled.div`
  flex: 1;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionView = styled.div`
  width: 400px;
  padding-top: 80px;
  padding-left: 60px;
`;

const TitleText = styled.div`
  font-size: 35px;
  font-weight: 600;
  line-height: 72px;
  margin-bottom: 24px;
`;

const MessageText = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
`;

const ButtonView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function WithError(Component) {
  @connect(
    state => ({
      language: state.language,
    }),
    dispatch => ({
      changeLanguageReq: payload => dispatch({ type: CHANGE_LANGUAGE_NAME, payload }),
    }),
  )
  class WrappedComponent extends Component {
    render() {
      const {
        props: {
          language: { name, i18n },
          changeLanguageReq,
        },
        i18nName,
      } = this;
      return (
        <ContainerView>
          <SvgIcon iconClass='not-found' size={250} />
          <Helmet>
            <title>{i18n.helmet_title(i18n[`${i18nName}_name`])}</title>
          </Helmet>
          <SectionView>
            <Button type='primary' onClick={() => changeLanguageReq(name === 'en' ? 'zh' : 'en')}>
              切换语言
            </Button>
            <TitleText>{i18n[`${i18nName}_name`]}</TitleText>
            <MessageText>{i18n[`${i18nName}_message`]}</MessageText>
            <ButtonView>
              <Button
                style={{ marginRight: '7px' }}
                onClick={() => {
                  history.go(-1);
                }}
              >
                {i18n[`${i18nName}_back_button`]}
              </Button>
              <Button type='primary'>
                <a href={`${window.location.origin}`}>{i18n[`${i18nName}_home_button`]}</a>
              </Button>
            </ButtonView>
          </SectionView>
        </ContainerView>
      );
    }
  }

  WrappedComponent.propTypes = {
    language: PropTypes.shape({
      name: PropTypes.string,
      i18n: PropTypes.object,
    }).isRequired,
    changeLanguageReq: PropTypes.func.isRequired,
  };

  return WrappedComponent;
}

export default WithError;
