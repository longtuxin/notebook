/*
 * @Author: longtuxin
 * @Date: 2023-10-11 21:57:48
 * @LastEditors: longtuxin
 * @LastEditTime: 2023-10-14 19:00:37
 * @FilePath: /notebook/docs/.vitepress/_sidebarGenerater.ts
 * @Description: 根据docs目录下的文件，自动生成侧边目录
 */
import * as fs from 'fs'
import * as path from 'path'
import type { DefaultTheme } from 'vitepress'

/** 生成侧边栏配置 */
export function generateSidebar(
  prefix: string = '/',
  rootRelativeDir: string = '../../docs'
): DefaultTheme.SidebarGroup[] {
  const rootDir = path.resolve(__dirname, rootRelativeDir, prefix)
  const files = fs.readdirSync(rootDir)
  const sidebars = files.reduce((fileList, file) => {
    if (file.includes('.')) {
      if (!file.startsWith('.')) {
        const fileName = file.replace('.md', '')
        fileList.push({
          text: fileName,
          items: [
            {
              text: fileName,
              link: `/${prefix}/${fileName}`,
            },
          ],
        })
      }
    } else {
      fileList.push({
        text: file,
        collapsible: true,
        items: generateSidebarItems(rootRelativeDir, `${prefix}/${file}`),
      })
    }

    return fileList
  }, [] as DefaultTheme.SidebarGroup[])
  return sidebars
}

function generateSidebarItems(rootRelativeDir: string, prefix: string) {
  const subPath = path.resolve(__dirname, rootRelativeDir, prefix)
  const subFiles = fs.readdirSync(subPath)
  const items: DefaultTheme.SidebarItem[] = []
  subFiles.forEach((subFile) => {
    if (subFile.endsWith('.md')) {
      // 处理 md 文件
      items.push({
        text: subFile.replace('.md', ''),
        link: `/${prefix}/${subFile}`,
      })
    } else if (!subFile.includes('.')) {
      // 处理文件夹
      items.push({
        text: subFile,
        items: generateSidebarItems(rootRelativeDir, `${prefix}/${subFile}`),
      })
    }
  })
  return items
}

/** 生成导航配置 */
export function generateNav(
  text: string,
  sidebars: DefaultTheme.SidebarGroup[]
): DefaultTheme.NavItem {
  const items: DefaultTheme.NavItemWithLink[] = []
  sidebars.forEach((firstLevel) => {
    const subText = firstLevel.text || ''
    if (firstLevel.items?.length) {
      // 有多个子菜单（即文件夹），用第一个子菜单当作导航二级菜单
      const subItem = firstLevel.items[0]
      let link = '/'
      if (subItem.link) {
        link = subItem.link
        // @ts-ignore
      } else if (subItem.items?.length) {
        // @ts-ignore
        link = subItem.items[0].link
      }
      items.push({ text: subText, link })
    }
  })
  return { text, items }
}
