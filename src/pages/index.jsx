/**
 * @component index.jsx
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
`;

class App extends React.Component {
  state = {};
  render() {
    return (
      <ContainerDiv>App App</ContainerDiv>
    );
  }
}

App.propTypes = {};

export default App;
