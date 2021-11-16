# main-front-piece：kd前端项目框架

### 描述
```
有序、开箱即用、开关式配置、脚手架打包、加载优化
```

### 技术语言
```
Vue3.2、Webpack5、Ant Desion Vue、Typescript、Pretter、Eslint、Vuex、Axios
```

### 分支管理：开发/发布/缺陷分离模型

|  环境  | 分支  | 标识  | 打包命令  |
| ------------ | ------------ | ------------ | ------------ |
| 开发  | develop  | development  |  npm run dev  |
| 测试  | develop-fix  | development-fix  |  npm run build-dev-fix  |
| 生产  | master  | production  |  npm run build  |
| 发布  | release  |  release |  npm run build-release  |

### Vue3.2 优化方案
- [x] 禁用js和css的预加载
- [x] Gizp压缩js
- [x] 全局环境变量+打包配置
- [x] 跨域proxy代理
- [x] 修复 HMR(热更新)失效
- [x] 添加请求别名Alias
- [x] svg图标组件
- [x] 图片压缩
- [x] cdn加载包文件
- [x] 添加打包分析
- [x] 去除console.log
- [x] less全局样式
- [x] prerender-spa-plugin 预渲染（更好的SEO，比SSR开发成本低，代码侵入性低）
- [ ] 数据监控


------------

后续开发同事，请严格补充完善文档：赠人玫瑰，手有余香；

相关问题和优化建议，请提 **issue**，第一时间跟进解决；

项目开发请使用 **master** 分支
