>  react-redux-webpack4

* Bale 'webpack@4 + babel'
* Eslint 'airbnb + babel-eslint'
* Ui 'react@16 + antd + styled-components'
* Router 'react-router-dom@4 + history@4'
* Xhr 'axios'
* Handle state 'redux + redux-sage + reselect + immutable'
* Other library '...'

> 目录说明，

多入口配置在pages下面，每个入口为一个新文件夹，并且在索引文件夹第一层, 并且以entry_开头，
并截取_后的名字为文件名，对于在public下新建对应的html文件名


>  Version
```html
node 8.0+(v10.9.0)
npm 5.0+(v6.2.0)
```

>  Start
1. Run 'yarn setup'

### Dos development
2. Run 'yarn start'


>  Dos production
* Run 'yarn build'

* OR

* Run 'yarn build:(any)'


>  Project structure
```html
|--src              Source dir
  |--assets         Static source
  |--components     Only common & Layout
  |--config              
  |--constants     
  |--entries        Multi-page entry     
    |--index.js       Entry of Program
  |--i18n
  |--library        
  |--mock        
  |--pages          Container & Self component
  |--reduxs
  |--services
  |--theme          
    |--dark.js          
    |--light.js   
  |--utils
  |--router.js      Top Router        

|--.env-cmdrc       Base url config
```
