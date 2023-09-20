import MarkdownIt from 'markdown-it';
import markdownLink from 'markdown-it-link-attributes'; // 添加链接属性
import hljs from 'highlight.js'; // 代码高亮
import CopyDocument from '../assets/copy-document.svg?raw';

const md = new MarkdownIt({
  linkify: true, // 启用链接自动识别
  breaks: true, // 允许在文本中使用换行符表示新行
  highlight: (str: string, lang: string): string => {
    let content = str;
    if (lang && hljs.getLanguage(lang)) { // 如果指定了语言
      try { // 使用hljs库对代码进行高亮
        content = hljs.highlight(str, { 
          language: lang,
          ignoreIllegals: true,
        }).value;
      } catch (e) {
        console.log('语法高亮错误', e);
        return str;
      }
    } else { // 否则将文本进行HTML转义以防止XSS攻击
      content = md.utils.escapeHtml(str);
    }

    lang = (lang || 'txt');

    return [
      '<pre class="code-prefix"><div class="code-wrapper ps-r"><pre>',
      `<code class="language-${lang}">${content}</code></pre>`,
      `<div class="code-label ps-a">${lang.toUpperCase()}</div>`,
      `<div class="code-helper ps-a"><span class="copy-action">${CopyDocument}</span></div>`,
      '</div></pre>',
    ].join('');
  },
});

// 渲染链接时，自动添加'_blank''noopener'，使链接在新窗口中打开，并提高安全性
md.use(markdownLink, { attrs: { target: '_blank', rel: 'noopener' } });


export const renderMarkDown = (content: string): string => {
  return md.render(content);
};
