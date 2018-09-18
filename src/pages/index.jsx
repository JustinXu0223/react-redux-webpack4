/**
 * @component index.jsx
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';

const ContainerView = styled.div`
`;

class App extends React.Component {
  state = {};
  render() {
    return (
      <ContainerView>App App</ContainerView>
    );
  }
}

App.propTypes = {};

export default App;
