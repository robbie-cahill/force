import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const HomeApp = loadable(
  () => import(/* webpackChunkName: "homeBundle" */ "./HomeApp"),
  { resolveComponent: component => component.HomeAppFragmentContainer }
)

export const homeRoutes: AppRouteConfig[] = [
  {
    path: "/homepage",
    getComponent: () => HomeApp,
    onClientSideRender: () => {
      HomeApp.preload()
    },
    query: graphql`
      query homeRoutes_HomeQuery {
        viewer {
          ...HomeApp_viewer
        }
      }
    `,
  },
]
