import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const FavoritesApp = loadable(
  () => import(/* webpackChunkName: "exampleBundle" */ "./FavoritesApp"),
  {
    resolveComponent: component => component.FavoritesApp,
  }
)

export const favoritesRoutes: AppRouteConfig[] = [
  {
    path: "/favorites",
    getComponent: () => FavoritesApp,
    onClientSideRender: () => {
      FavoritesApp.preload()
    },
  },
]
