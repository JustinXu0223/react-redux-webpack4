>  react-redux-webpack4

* Bale 'webpack@4 + babel'
* Eslint 'airbnb + babel-eslint + prettier'
* Ui 'react@16 + antd + styled-components'
* Router 'react-router-dom@4 + history@4'
* Xhr 'axios'
* Handle state 'redux + redux-sage + reselect + immutable'
* Other library '...'

> 规范说明 (最近优先为原则)

1. 统一使用小驼峰命名, api接口那边除外
2. 文件以js结尾
3. 事件方法以on开头
4. 如果使用callback, 需要传回调事件，请以express规范，给callback第一个参数赋值错误，第二个
   参数赋值返回数据，请不用同时使用成功和失败回调
5. 如果render要拆分，方法以render开头
6. 页面分层，以最近优先级，将当前页面相关的代码放在一个文件夹，增加其高内聚，如果有业务代码，
   放置于当前模块，尽量不提到顶层方法库
7. 每个页面文件有两个文件夹是必须index.js(暴露路由和Router规则)，view.js(当前页面顶层容器)
8. 文件结构以树型分层，每个stack对应的模块内部，一个页面对应内部一个文件夹，
9. 不管是component，utils，config，constants，assets, 都遵循src顶层-> stack顶层 -> 页面层，
   以当前的通用的程度，决定文件层级位置，最近优先为原则
10.构建组件采用容器和试图组件的设计模式
11.高阶组件默认使用hoc开头
12.获取数据以get开头(参考实现一个java pojo类, 默认暴露get/set方法)


> 多入口配置

多入口配置在pages下面，每个入口为一个新文件夹，并且在索引文件夹第一层,
并且以entry_开头， 并截取_后的名字为文件名，对于在public下新建对应的html文件名

> 路由自动化配置

1. 首先在constants/routerId.js, layoutTree决定layout的层级。
2. export default 默认导出所有的路由字典
3. 在layout，比如rootRouter.js
   - [3.1] 需要默认暴露layoutType，
   - [3.2] rootRouter.js，会根据自动扫描的routerTree，并通过cotext传递到下级
   - [3.3] 得到当前的routerTree得到layoutType的路由信息，
   - [3.4] 这时只需要注入其他，switch中
4. 在layout，比如在authRouter.js这种二层路由中
   - [4.1] 首先重复上面，3.1
   - [4.2] 然后需要SubscriberContext注入到static contextType，
   - [4.3] 然后，执行3.3 (不过是通过this.context的layoutType得到路由)
   - [4.4] 最后，执行3.4
5. 怎么扫描视图
   - [5.1] 根据当前文件以View结尾，扫描其index.js文件
   - [5.2] 暴露的view字段就是路由级的切分视图，
   - [5.3] 暴露的navigation包含，当前路由的path/是否使用exact，已经sort排序的字段，
     [注意1]exact，在src/app/dashboardView/index.js中，这里因为dashboardRouter.js是layout，
     所有必须声明exact为false，不然不能正确switch正确导航。
     [注意2]sort, 在src/app/404View/index.js, 这时候设置sort为999，标示为
     当前层级最后一位，默认sort为5，如果需要保持在最前面，请设置为0。
     [注意3]使用index.js文件下的export default，默认路由配置，如果导出，那么自动扫描工具，
     就不会为其生成router规则，使用默认暴露的配置。

> SVG使用

1. 在顶层assets/svg下面分为colorful(多种颜色)和single(单种颜色)
2. 将需要单种颜色，变色的svg放在assets/svg/single
3. 将需要多种颜色，不需要变色的svg放在assets/svg/colorful
4. 使用，导入components/svgIcon.js，传人iconClass为文件名

> 最近原则维护代码
1. 关于redux, 顶层在redux的rootReducer.js/rootSaga.js/rootStore.js中
2. 以pages/app/dashboardView/demo/counterView为example。
   内部分为demoService.js(独立的api文件)，
   redux文件(维护当前文件的demoAction.js，demoReducer.js， demoSaga.js， demoSelector.js)

> Version
```html
node 8.0+(v10.9.0)
npm 5.0+(v6.2.0)
```

> 开始命令
### 如果为安装yarn
* Run 'npm i yarn -g'

### Dos development
1. Run 'yarn start'


>  Dos production
* Run 'yarn build-s'
* OR
* Run 'yarn build:(any)'


>  Project structure
```html
|--src              Source dir
  |--assets         (静态资源)Static source
  |--components     (公共组件)Only common & Layout
  |--config         (公共配置)
  |--constants      (公共常量)
  |--library        (公共以来插件)
  |--pages          多页面入口
    |--app          app页面
      |--404View             404未发现页面
      |--authView            权限layout
      |--components          顶层业务组件
      |--constants           app页面常量
      |--dashboardView       面板layout
      |--i18n                国际化页面
      |--loadingView         加载中页面
      |--maintainView        维护页面
      |--mock                mock数据
      |--redux               顶层redux
      |--theme               主题
      |--entry_index.js      入口文件
      |--rootRouter.js       顶层路由
    |--download     下载页面
      |--entry_download.js   下载入口页面
  |--utils

|--.env-cmdrc       Base url config
```

- 问题

1. https://stackoverflow.com/questions/55689238/webpack-imported-module-4-react-default-a-memo-is-not-a-function/55772558
