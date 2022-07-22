import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const FavoritesApp = loadable(
  () => import(/* webpackChunkName: "exampleBundle" */ "./FavoritesApp"),
  {
    resolveComponent: component => component.FavoritesAppFragmentContainer,
  }
)

export const favoritesRoutes: AppRouteConfig[] = [
  {
    path: "/favorites",
    getComponent: () => FavoritesApp,
    onClientSideRender: () => {
      FavoritesApp.preload()
    },
    query: graphql`
      query favoritesRoutes_FavoritesAppQuery {
        viewer {
          ...FavoritesApp_viewer
        }
      }
    `,
  },
]
