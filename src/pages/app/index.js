/**
 * @component index.js
 * @description 全局入口
 * @time 2018/6/12
 * @author JUSTIN XU
 */
import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

// components
import LoadingComponent from 'components/loading';

// constants
import routerId from 'constants/routerId';

// import { getUser } from 'services/demo';
import styles from './styles.less';

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
  loader: () => import('./home/index'),
  loading: LoadingComponent,
});

const AsyncDemo = Loadable({
  loader: () => import('./demo/index'),
  loading: LoadingComponent,
});

class Index extends React.Component {
  state = {};
  async componentDidMount() {
    // const data = await getUser();
    // alert(JSON.stringify(data));
  }
  renderHeaderView = () => (
    <div className={styles.headerView}>
      {HeaderList.map(v => (
        <NavLink className={styles.headerItemView} key={v.name} to={v.path}>
          {v.name}
        </NavLink>
      ))}
    </div>
  );
  render() {
    return (
      <div className={styles.containerView}>
        {this.renderHeaderView()}
        <div className={styles.sectionView}>
          <Switch>
            <Route exact path={routerId.app} component={() => <Redirect to={routerId.home} />} />
            <Route exact path={routerId.home} component={AsyncHome} />
            <Route exact path={routerId.demo} component={AsyncDemo} />
            <Route path='*' render={() => <Redirect to={routerId.notFound} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
