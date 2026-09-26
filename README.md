# zhongyangcixiu
网站代码存放

## Windows 离线版

打包后位于 `dist/Zhongyang-Embroidery-1.0.0-Windows-x64.exe`。将这一个文件复制到 Windows 64 位电脑，双击即可使用，无需安装 Node.js、Python 或启动网页服务器。所有图片、文案与音效随应用打包，运行时不访问网络。

- F11：进入或退出全屏；Esc：退出全屏。
- 保留网页版的拖动、缩放、点位、详情页及音效。声音按原有交互触发。
- 免安装包启动时会解压到临时目录，首次打开需要稍等；更新时关闭应用，用新版 EXE 替换旧版即可。
- 当前为未签名的本地构建版本。

开发与打包（仅制作 EXE 的电脑需要）：

```powershell
npm ci
npm run desktop
npm run build:exe
```

构建命令不会发布到 GitHub。`dist/` 和 `node_modules/` 不提交到仓库，网页版仍由根目录的静态文件提供。
