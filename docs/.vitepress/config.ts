/*
 * @Author: longTuxin
 * @Date: 2023-10-11 21:57:48
 * @LastEditors: longtuxin
 * @LastEditTime: 2023-10-15 12:00:51
 * @FilePath: /notebook/docs/.vitepress/config.ts
 * @Description: 头部注释
 */
import { defineConfig } from 'vitepress'
import { generateNav, generateSidebar } from './_sidebarGenerater'

const baseSidebar = generateSidebar('base')
const engineeringSidebar = generateSidebar('engineering')
const solutionSidebar = generateSidebar('solution')
const projectSidebar = generateSidebar('project')
const otherSidebar = generateSidebar('other')

export default defineConfig({
  base: '/notes/',
  title: '前端笔记',
  description: '前端学习笔记',
  // appearance: false,
  lastUpdated: true,

  markdown: {
    // TODO
    anchor: {},
    toc: { level: [1, 2, 3] },
    theme: {
      light: 'min-dark',
      dark: 'one-dark-pro',
    },
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.png',
    outline: [1, 3],
    sidebar: {
      '/base': baseSidebar,
      '/engineering': engineeringSidebar,
      '/solution': solutionSidebar,
      '/project': projectSidebar,
      '/other': otherSidebar,
    },
    nav: [
      generateNav('语言基础', baseSidebar),
      generateNav('工程化', engineeringSidebar),
      generateNav('解决方案', solutionSidebar),
      generateNav('项目管理', projectSidebar),
      generateNav('其他', otherSidebar),
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/longtuxin/notebook.git' },
    ],
    footer: {
      copyright: 'Copyright © 2023-present longtuxin',
    },
    // 文章尾部显示编辑文章链接
    // editLink: {
    //   pattern: 'https://github.com/longtuxin/notebook.git',
    //   text: 'Edit this page on Gitlab',
    // },
    lastUpdatedText: 'Last Updated',
    // 切换中英文按钮
    // localeLinks: {
    //   text: 'English',
    //   items: [{ text: '简体中文', link: 'https://netlify.app' }],
    // },
  },
})
