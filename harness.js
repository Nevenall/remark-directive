(async () => {

   const unified = require('unified')
   const parse = require('remark-parse')
   const remark2rehype = require('remark-rehype')
   const stringify = require('rehype-stringify')
   const format = require('rehype-format')
   const visit = require('unist-util-visit')
   const h = require('hastscript')
   const directive = require('./index.js')


   let text = `
:::main{#readme}

# Header One

Outer contents.
More outer contents.

::: 
`

   let mdast = unified()
      .use(parse)
      .use(directive)
      .parse(text)

   console.log(mdast)


   let hast = await unified()
      .use(directive)
      .use(htmlDirectives)
      .use(remark2rehype)
      .use(format)
      .run(mdast)

   console.log(hast)

   let html = unified()
      .use(stringify)
      .stringify(hast)

   console.log(html)

   debugger



   function htmlDirectives() {
      return transform

      function transform(tree) {
         visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective)
      }

      function ondirective(node) {
         var data = node.data || (node.data = {})
         var hast = h(node.name, node.attributes)

         data.hName = hast.tagName
         data.hProperties = hast.properties
      }
   }


})()