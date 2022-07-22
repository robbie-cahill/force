import {
  AddCircleIcon,
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Input,
  Join,
  ModalDialog,
  Separator,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { FavoritesApp_viewer } from "__generated__/FavoritesApp_viewer.graphql"
import { ArtworkItem } from "./Components/ArtworkItem"
import { slugify } from "underscore.string"
import { RouterLink } from "System/Router/RouterLink"

interface FavoritesAppProps {
  viewer: FavoritesApp_viewer
}

interface WishlistNavItemProps {
  title: string
  slug: string
}

const WishlistNavItem: React.FC<WishlistNavItemProps> = props => {
  return (
    <Box>
      <Flex
        py={2}
        pr={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <RouterLink
          to={
            props.slug === "all-saved"
              ? "/favorites"
              : `/favorites/${props.slug}`
          }
        >
          <Text variant="md">{props.title}</Text>
        </RouterLink>
        <Text variant="sm">2 works</Text>
      </Flex>
    </Box>
  )
}

const INITIAL_WISHLISTS = [
  "Works by emerging artists",
  "Pretty landscapes",
  "Religiously charged works",
]

const FavoritesApp: React.FC<FavoritesAppProps> = props => {
  const artworks = extractNodes(props.viewer.artworksConnection)
  const [showAddWishlist, setShowAddWishlist] = useState(false)
  const [wishlists, setWishlists] = useState([
    ...INITIAL_WISHLISTS.map(name => {
      return { name, slug: slugify(name) }
    }),
  ])

  const createCollection = name => {
    const slug = slugify(name)
    setWishlists([...wishlists, { name, slug }])
    setShowAddWishlist(false)
  }

  return (
    <>
      <Text mt={2} variant="xl">
        Favorites
      </Text>
      <Separator mt={2} />
      <Box my={2}>
        <GridColumns>
          <Column span={3} borderRight="1px solid #ccc">
            <Flex
              pr={2}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="lg">Wishlists</Text>
              <AddCircleIcon
                width={30}
                height={30}
                onClick={() => setShowAddWishlist(true)}
              />
            </Flex>
            <Separator my={2} />
            <>
              <Join separator={<Separator />}>
                <WishlistNavItem title="All Saved" slug="all-saved" />
                {wishlists.map(wishlist => (
                  <WishlistNavItem title={wishlist.name} slug={wishlist.slug} />
                ))}
              </Join>
            </>
          </Column>
          <Column span={9}>
            <Flex flexWrap="wrap">
              {artworks.map(artwork => {
                return (
                  <ArtworkItem
                    key={artwork.internalID}
                    artwork={artwork}
                    mode="add"
                    onClick={() => {
                      return true
                    }}
                  />
                )
              })}
            </Flex>
          </Column>
        </GridColumns>
        {showAddWishlist && (
          <ModalDialog
            title="Create a new wishlist"
            onClose={() => setShowAddWishlist(false)}
            footer={
              <Button
                width="100%"
                onClick={() => {
                  createCollection("Test")
                }}
              >
                Create Wishlist
              </Button>
            }
          >
            <Input placeholder="Name" />
          </ModalDialog>
        )}
      </Box>
    </>
  )
}

export const FavoritesAppFragmentContainer = createFragmentContainer(
  FavoritesApp,
  {
    viewer: graphql`
      fragment FavoritesApp_viewer on Viewer {
        artworksConnection(first: 50, marketable: true, medium: "painting") {
          edges {
            node {
              internalID
              artistNames
              title
              date
              image {
                cropped(width: 200, height: 200) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)
