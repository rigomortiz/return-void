import React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown";

function PostTemplate({ content, data }) {
  // This holds the data between `---` from the .md file
  const frontmatter = data
  console.log(content)
  console.log(data)
  console.log("hello")

  return (
    <>
      <section className='section'>
        <div className='container'>
          <h1 className='title'>{frontmatter.title}</h1>
          <ReactMarkdown source={content}  children={content}/>
       </div>
      </section>
      
    </>
  )
}

PostTemplate.getInitialProps = async (context) => {
  const { slug } = context.query

  // Import our .md file using the `slug` from the URL
  const content = await import(`../../book/${slug}.md`)

  // Parse .md data through `matter`
  const data = matter(content.default)

  // Pass data to our component props
  return { ...data }
}

export default PostTemplate