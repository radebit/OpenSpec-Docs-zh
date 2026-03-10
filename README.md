# OpenSpec-Docs-zh

> [OpenSpec](https://github.com/Fission-AI/OpenSpec) 官方文档的**中文翻译在线版本**。
> 提供完整的单页可交互文档，并对部分英文专有术语进行了本地化调整，以便中文读者更易理解和上手。

[![官方仓库](https://img.shields.io/badge/upstream-Fission--AI%2FOpenSpec-6366f1?style=flat-square&logo=github)](https://github.com/Fission-AI/OpenSpec)
[![本项目](https://img.shields.io/badge/本项目-radebit%2FOpenSpec--Docs--zh-8b5cf6?style=flat-square&logo=github)](https://github.com/radebit/OpenSpec-Docs-zh)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/Fission-AI/OpenSpec/blob/main/LICENSE)

---

## 在线预览

- **在线文档**：[https://openspec.radebit.com](https://openspec.radebit.com)
- **GitHub Pages**：[https://radebit.github.io/OpenSpec-Docs-zh](https://radebit.github.io/OpenSpec-Docs-zh)
- **本地预览**：克隆仓库后直接打开 `index.html`，或启动静态服务（见下方[本地运行](#本地运行)）

![页面预览](assets/home-page.jpg)

---

## 项目结构

```
OpenSpec-Docs-zh/
├── index.html          # 主文档页面（单页应用）
├── styles.css          # AI 科技风格样式
├── script.js           # 交互脚本（粒子背景、选项卡、锚点高亮等）
├── assets/             # 图片资源
│   ├── openspec_bg.png
│   ├── openspec_dashboard.png
│   ├── openspec_pixel_dark.svg
│   └── openspec_pixel_light.svg
└── README.md           # 本文件
```

---

## 文档内容

涵盖 OpenSpec 官方所有核心文档的中文翻译：

| 章节 | 对应官方原文 |
|------|-------------|
| 项目概览 & 设计哲学 | `README.md` |
| 安装指南 | `docs/installation.md` |
| 快速开始 | `docs/getting-started.md` |
| 核心概念（规范/变更/产物/Delta/Schema） | `docs/concepts.md` |
| OPSX Slash 命令参考 | `docs/commands.md` |
| CLI 终端命令参考 | `docs/cli.md` |
| 工作流模式 | `docs/workflows.md` |
| 自定义配置 | `docs/customization.md` |
| 支持的 AI 工具（24款） | `docs/supported-tools.md` |
| 多语言支持 | `docs/multi-language.md` |

---

## 与官方文档的关系

- 本项目基于官方英文文档翻译整理，**为独立社区项目，非官方出品**
- 部分技术术语进行了本地化处理，例如：
  - `Source of Truth` → 权威基准
  - `Brownfield Development` → 存量项目开发
  - `Artifact` → 产物
- 文档内容会随官方版本迭代**定期更新同步**

官方资源：

- 官方仓库：[github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)
- 官方 Discord：[discord.gg/YctCnvvshC](https://discord.gg/YctCnvvshC)

---

## 本地运行

无需任何构建工具，纯静态文件，启动服务即可：

```bash
# 方式一：Python 3（推荐，无需安装额外依赖）
git clone https://github.com/radebit/OpenSpec-Docs-zh.git
cd OpenSpec-Docs-zh
python3 -m http.server 8080
# 浏览器访问 http://localhost:8080
```

```bash
# 方式二：Node.js
npx serve .
```

```bash
# 方式三：直接打开（部分浏览器支持）
open index.html
```

---

## 部署到 GitHub Pages

1. Fork 本仓库或 push 到你的 GitHub
2. 进入仓库 **Settings → Pages**
3. Source 选择 `main` 分支，目录选择 `/ (root)`
4. 保存后访问 `https://<your-username>.github.io/OpenSpec-Docs-zh`

---

## 参与贡献

欢迎任何形式的贡献，一起让中文文档更完善：

- **文档勘误**：发现翻译错误或表述不准确，欢迎提 [Issue](https://github.com/radebit/OpenSpec-Docs-zh/issues)
- **内容补充**：有实战经验、使用技巧或示例想分享，欢迎提 PR
- **术语建议**：对某个术语的本地化译法有更好建议，欢迎在 Issue 中讨论

---

## 免责声明

本项目为独立社区翻译项目，与 Fission AI 官方团队无任何关联。OpenSpec 的所有权利归属于 [Fission AI](https://github.com/Fission-AI) 及其贡献者，遵循 [MIT 协议](https://github.com/Fission-AI/OpenSpec/blob/main/LICENSE)。

---

## License

本翻译文档同样遵循 [MIT License](https://github.com/Fission-AI/OpenSpec/blob/main/LICENSE)。
