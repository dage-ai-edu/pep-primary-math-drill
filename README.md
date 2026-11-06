# 人教计算闯关

面向中国大陆小学一至六年级的浏览器计算游戏。课程顺序依据本项目建立时用户提供的 12 册人教版小学数学教材（根据 2022 年版课程标准修订）重新编排。

这不是把日文换成中文的简单汉化版：58 个计算技能的年级归属、前置关系和出题范围均按人教版教材重新审核。例如，二年级不再出现分数；分数从三年级上册“分数的初步认识”开始。

## 在线体验

[打开人教计算闯关](https://dage-ai-edu.github.io/pep-primary-math-drill/)

## 运行方法

### 最简单：双击启动

在 macOS 中双击项目根目录的 `启动游戏.command`，浏览器会自动打开：

`http://localhost:8000/`

终端窗口需要在游戏期间保持打开。关闭终端窗口即可停止本地服务。

### 命令行启动

```bash
python3 -m http.server 8000 -d app
```

然后访问 `http://localhost:8000/`。本项目使用 ES Modules，不能直接双击 `app/index.html` 以 `file://` 方式运行。

## 功能

- 一至六年级共 58 个计算技能
- 年级练习、自适应练习、技能树、错题复习
- 竖式中间步骤输入、小数、分数、百分数和比例
- 奖杯、收藏、签到、每日任务、成长星级
- 手机竖屏和电脑键盘操作
- 学习记录保存在当前浏览器的 `localStorage` 中，不上传服务器

本游戏是计算专项工具，不覆盖图形、测量、统计、实践活动和完整应用题教学。详细对应关系见 [docs/curriculum.md](docs/curriculum.md)。

## 测试

```bash
node --test tests/*.test.mjs
```

## 来源与授权说明

本项目基于 [grmchn/dopa-drill](https://github.com/grmchn/dopa-drill) 非官方改编，并参考了 [forumdata-collab/dopa-drill-zh-hant](https://github.com/forumdata-collab/dopa-drill-zh-hant) 的繁体中文界面实现。

- 原项目代码：MIT License
- 原项目角色、名称和 Logo：不属于 MIT 授权范围；本地版本仅供个人学习与非商业教学使用
- 字体：各自采用随文件附带的 SIL Open Font License
- 本项目不是人民教育出版社官方产品，也不是原开源项目的官方中文版

如需商业发布、收费服务或使用原角色做品牌，需要另行取得相应授权。
