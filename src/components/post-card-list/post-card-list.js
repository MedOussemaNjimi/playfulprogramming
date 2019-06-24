import React, { useState } from "react"
import listStyle from "./post-card-list.module.scss"
import { PostCard } from "../post-card"
import { FilterSearchBar } from "../filter-search-bar"

/**
 * overwriteAuthorInfo is a needed evil for now:
 * @see https://github.com/gatsbyjs/gatsby/issues/14827
 */
export const PostList = ({ posts = [], showWordCount = false, overwriteAuthorInfo, numberOfArticles, wordCount, tags }) => {
  // FIXME: This will not suffice with pagination added
  const [filtered, setFiltered] = useState(null);

  return (
    <div>
      <FilterSearchBar tags={tags}
                       showWordCount={showWordCount}
                       wordCount={wordCount}
                       numberOfArticles={numberOfArticles}
                       onFilter={val => val && setFiltered(val.map(v => v.slug))}/>
      <div className={listStyle.postsListContainer}>
        {posts.map(({ node }) => {
          if (filtered && !filtered.includes(node.fields.slug)) return null;

          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostCard
              slug={node.fields.slug}
              className={listStyle.postListItem}
              key={node.fields.slug}
              excerpt={node.excerpt}
              title={title}
              author={overwriteAuthorInfo || node.frontmatter.author}
              date={node.frontmatter.date}
              tags={node.frontmatter.tags}
              description={node.frontmatter.description}
            />
          )
        })}
      </div>
    </div>
  )
}

