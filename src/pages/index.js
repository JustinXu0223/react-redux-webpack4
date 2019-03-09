/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import styled from 'styled-components';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

// components
import LoadingComponent from 'components/Loading';
import routers from 'constants/routers';

const ContainerView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderView = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
`;

const HeaderItemView = styled(NavLink)`
  border: 1px solid red;
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionView = styled.div`
  max-width: 900px;
  min-height: 100px;
  width: 100vw;
  border: 1px solid blue;
`;

const HeaderList = [
  {
    path: routers.home,
    name: '首页',
  },
  {
    path: routers.demo,
    name: 'demo',
  },
  {
    path: routers.notFound,
    name: '404',
  },
];

const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: LoadingComponent,
});

const AsyncDemo = Loadable({
  loader: () => import('./Demo'),
  loading: LoadingComponent,
});

class App extends React.Component {
  state = {};
  renderHeaderView = () => {
    return (
      <HeaderView>
        {
          HeaderList.map(v => (
            <HeaderItemView
              key={v.name}
              to={v.path}
            >
              {v.name}
            </HeaderItemView>
          ))
        }
      </HeaderView>
    );
  };
  render() {
    return (
      <ContainerView>
        {this.renderHeaderView()}
        <SectionView>
          <Switch>
            <Route exact path={routers.app} component={() => <Redirect to={routers.home} />} />
            <Route exact path={routers.home} component={AsyncHome} />
            <Route exact path={routers.demo} component={AsyncDemo} />
            <Route path="*" render={() => <Redirect to={routers.notFound} />} />
          </Switch>
        </SectionView>
      </ContainerView>
    );
  }
}

App.propTypes = {};

export default App;
