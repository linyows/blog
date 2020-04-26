import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { nowY } from "../../lib/date"
import "normalize.css"
import "@wordpress/block-library/build-style/style.css"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          title
          url
          description
        }
        users {
          nodes {
            slug
            avatar {
              url
            }
          }
        }
        menu(id: "TWVudTo2") {
          menuItems {
            nodes {
              label
              url
            }
          }
        }
      }
    }
  `)

  const { title, url, description } = data.wpgraphql.generalSettings
  const user = data.wpgraphql.users.nodes[0]
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  return (
    <>
      <header className="site-header">
        <p className="site-title">
          <Link to="/" className="home">
            <img src={user.avatar.url} alt={user.slug} className="site-avatar" />
            {title}
          </Link>
        </p>

        {description !== '' &&
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
      <footer className="site-footer">
        Copyright &copy; {nowY()} {title}. All rights reserved.<br/>
        Designed by <a href="https://github.com/linyows/gatsby-starter-wpgraphql">linyows.</a>
      </footer>
    </>
  )
}

export default Layout
