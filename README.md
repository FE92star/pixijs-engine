# Pixijs-Engine

## 说明
* Pixi是一个超快的2D游戏渲染框架，即它的定位是`渲染框架——framework`，意味着它会帮助你用JavaScript或者其他HTML5技术来显示媒体，创建动画或管理交互式图像，从而制作一个游戏或应用。但是它并不能直接提供给开发者`游戏开发引擎`的能力，类似于`资源加载`、`碰撞检测`、`事件模块`等功能模块，因此本项目的主要目的就是基于Pixi进行二次封装，提供一系列游戏开发者需要的引擎`API`。

## 项目架构
* demo的预览通过`vite`开启一个`web服务`, 关于`vite`的命令行参数定义：
```bash
npx vite --help
```
1. `--host`-配置静态资源的主域名
2. `--port`-配置开发端口
3. `--open`-自动开启浏览器
4. `--c, --config`-使用自定义的`vite.config.js`配置文件
