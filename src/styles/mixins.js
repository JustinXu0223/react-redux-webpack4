/**
 * @component mixins.js
 * @description 混合 styles
 * @time 2018/5/4
 * @author JUSTIN XU
 */
import { css, keyframes } from 'styled-components';

// input
const InputBack = css`
  background-color: rgba(0, 0, 0, 0.04);
`;

const InputFocus = css`
  background-color: #ffffff;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.04);
`;

const InputMixin = css`
  ${InputBack};
  &:focus {
    ${InputFocus};
  };
`;
// margin
const ClearBefore = css`
  &:before {
    content: '';
    display: table;
  }
`;

const BoxShadow = css`
  background-color: #ffffff;
  box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.04);
`;

const SilderTitle = css`
  height: 44px;
  padding-left: 22px;
  font-family: ${props => props.theme.fontPingFang};
  font-weight: 500;
  line-height: 44px;
  color: ${props => props.theme.fontColor};
  border-bottom: 1px solid #efefef;
`;

const TabsDivider = css`
   .ant-tabs-bar {
      margin-left: 7px;
      margin-right: 11px;
   }
   .ant-tabs-tab + .ant-tabs-tab:before {
      content: "";
      height: 21.5px;
      width: 1px;
      position: absolute;
      left: -11.5px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #efefef;
    }
`;

const PageActive = css`
  .ant-pagination-item-active {
     background-color: ${props => props.theme.default};
     >a {
      transition-delay: .03s;
      color: #ffffff !important;
     }
     a:hover {
      color: #ffffff;
    }
  }
`;

const TextWrap = css`
  overflow: hidden;
  word-wrap: break-word;
`;

const SingleEllipsis = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TableCommonStyle = css`
  .ant-table-placeholder {
    border-bottom: 0;
  }
  .ant-table-thead {
    th {
      padding-top: 14px;
      padding-bottom: 14px;
      text-align: center;
    }
    th:first-child {
      text-align: left;
    }
    th:last-child {
      text-align: right;
    }
  }
  .ant-table-tbody {
    td {
      text-align: center;
    }
    td:first-child {
      text-align: left;
    }
    td:last-child {
      text-align: right;
    }
  }
`;

const animateOpacity = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const opacityAnimation = css`
  animation: ${animateOpacity} 1s linear;
`;

export default {
  InputBack,
  InputFocus,
  InputMixin,
  ClearBefore,
  BoxShadow,
  SilderTitle,
  TabsDivider,
  PageActive,
  TextWrap,
  SingleEllipsis,
  TableCommonStyle,
  opacityAnimation,
};
