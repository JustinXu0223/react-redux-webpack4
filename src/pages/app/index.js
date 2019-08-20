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

// constants
import routerId from 'constants/routerId';

// import { getUser } from 'services/demo';

const ContainerView = styled.div`
  align-items: center;
`;

const HeaderView = styled.div`
  height: 40px;
  flex-direction: row;
  justify-content: center;
`;

const HeaderItemView = styled(NavLink)`
  border: 1px solid ${props => props.theme.primaryColor};
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
  border: 1px solid ${props => props.theme.primaryColor};
`;

const HeaderList = [
  {
    path: routerId.home,
    name: '首页',
  },
  {
    path: routerId.demo,
    name: 'demo',
  },
  {
    path: routerId.notFound,
    name: '404',
  },
];

const AsyncHome = Loadable({
  loader: () => import('./Home/index'),
  loading: LoadingComponent,
});

const AsyncDemo = Loadable({
  loader: () => import('./Demo/index'),
  loading: LoadingComponent,
});

class Index extends React.Component {
  state = {};
  async componentDidMount() {
    // const data = await getUser();
    // alert(JSON.stringify(data));
  }
  renderHeaderView = () => (
    <HeaderView>
      {HeaderList.map(v => (
        <HeaderItemView key={v.name} to={v.path}>
          {v.name}
        </HeaderItemView>
      ))}
    </HeaderView>
  );
  render() {
    return (
      <ContainerView>
        {this.renderHeaderView()}
        <SectionView>
          <Switch>
            <Route exact path={routerId.app} component={() => <Redirect to={routerId.home} />} />
            <Route exact path={routerId.home} component={AsyncHome} />
            <Route exact path={routerId.demo} component={AsyncDemo} />
            <Route path='*' render={() => <Redirect to={routerId.notFound} />} />
          </Switch>
        </SectionView>
      </ContainerView>
    );
  }
}

Index.propTypes = {};

export default Index;
