import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import "normalize.css"
import "@wordpress/block-library/build-style/style.css"
import "../styles/layout.css"
import { nowY } from "../../lib/date"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          title
          url
        }
        user(id: "dXNlcjox") {
          nickname
          description
          avatar {
            url
          }
        }
        menu(id: "TWVudTo2") {
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
      }
    }
  `)

  const { title, url } = data.wpgraphql.generalSettings
  const user = data.wpgraphql.user
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  return (
    <>
      <header className="site-header">
        <p className="site-title">
          <img src={user.avatar.url} alt={user.nickname} className="site-avatar" />
          <Link to="/" className="home">
            {title}
          </Link>
        </p>

        {user.description !== null &&
          <p className="site-desc">
            {user.description}
          </p>
        }

        <ul className="site-nav">
          {items.map(item => (
            <li key={"li" + item.url}>
              <Link key={item.url} to={item.url} className="navbar-item">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <main className="site-main">{children}</main>
      <footer className="site-footer">Copyright © {nowY()} {title}. All rights reserved.</footer>
    </>
  )
}

export default Layout
