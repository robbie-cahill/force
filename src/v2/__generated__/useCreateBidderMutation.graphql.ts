/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreateBidderInput = {
    clientMutationId?: string | null | undefined;
    saleID: string;
};
export type useCreateBidderMutationVariables = {
    input: CreateBidderInput;
};
export type useCreateBidderMutationResponse = {
    readonly createBidder: {
        readonly bidder: {
            readonly internalID: string;
            readonly sale: {
                readonly " $fragmentRefs": FragmentRefs<"AuctionApp_sale">;
            } | null;
        } | null;
    } | null;
};
export type useCreateBidderMutation = {
    readonly response: useCreateBidderMutationResponse;
    readonly variables: useCreateBidderMutationVariables;
};



/*
mutation useCreateBidderMutation(
  $input: CreateBidderInput!
) {
  createBidder(input: $input) {
    bidder {
      internalID
      sale {
        ...AuctionApp_sale
        id
      }
      id
    }
  }
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  __isArtworkConnectionInterface: __typename
  edges {
    __typename
    node {
      id
      slug
      href
      internalID
      image {
        aspect_ratio: aspectRatio
      }
      ...GridItem_artwork
      ...FlatGridItem_artwork
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}

fragment AuctionApp_sale on Sale {
  ...AuctionMeta_sale
  ...AuctionAssociatedSale_sale
  ...AuctionBuyNowRail_sale
  ...AuctionDetails_sale
  ...AuctionArtworkGrid_sale
  startAt
  endAt
  internalID
  slug
  isClosed
  isLotsClosing
  eligibleSaleArtworksCount
  coverImage {
    url(version: ["wide", "source", "large_rectangle"])
  }
  showAssociatedSale: associatedSale {
    internalID
    id
  }
  showBuyNowTab: promotedSale {
    internalID
    id
  }
  cascadingEndTimeIntervalMinutes
  extendedBiddingIntervalMinutes
  status
}

fragment AuctionArtworkGrid_sale on Sale {
  internalID
  artworksConnection(first: 15, status: OPEN, cached: false) {
    edges {
      node {
        id
        __typename
      }
      cursor
    }
    ...ArtworkGrid_artworks
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

fragment AuctionAssociatedSale_sale on Sale {
  associatedSale {
    coverImage {
      cropped(width: 445, height: 250) {
        src
        srcSet
      }
    }
    displayTimelyAt
    href
    slug
    name
    id
  }
}

fragment AuctionBuyNowRail_sale on Sale {
  promotedSale {
    href
    internalID
    name
    saleArtworksConnection(first: 99) {
      edges {
        node {
          artwork {
            ...ShelfArtwork_artwork
            id
          }
          id
        }
      }
    }
    id
  }
}

fragment AuctionDetails_sale on Sale {
  ...RegisterButton_sale
  ...AuctionInfoSidebar_sale
  ...SaleDetailTimer_sale
  internalID
  name
  slug
  liveStartAt
  startAt
  endAt
  description(format: HTML)
  href
  isClosed
  cascadingEndTimeIntervalMinutes
}

fragment AuctionInfoSidebar_sale on Sale {
  liveStartAt
}

fragment AuctionMeta_sale on Sale {
  name
  description(format: HTML)
  slug
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    endAt
    cascadingEndTimeIntervalMinutes
    extendedBiddingIntervalMinutes
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotID
    lotLabel
    endAt
    extendedBiddingEndAt
    formattedEndDateTime
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
  ...NewSaveButton_artwork
  ...HoverDetails_artwork
}

fragment FlatGridItem_artwork on Artwork {
  ...Metadata_artwork
  ...SaveButton_artwork
  sale {
    extendedBiddingPeriodMinutes
    extendedBiddingIntervalMinutes
    startAt
    id
  }
  saleArtwork {
    endAt
    extendedBiddingEndAt
    lotID
    id
  }
  internalID
  title
  image_title: imageTitle
  image {
    resized(width: 445, version: ["normalized", "larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
  artistNames
  href
  is_saved: isSaved
}

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  artistNames
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    filterGene {
      name
      id
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  href
}

fragment NewSaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment RegisterButton_sale on Sale {
  bidder {
    qualifiedForBidding
    id
  }
  isAuction
  isClosed
  isLiveOpen
  isPreview
  isRegistrationClosed
  liveURLIfOpen
  requireIdentityVerification
  registrationStatus {
    internalID
    id
  }
  slug
  status
}

fragment SaleDetailTimer_sale on Sale {
  endAt
  endedAt
  startAt
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment ShelfArtwork_artwork on Artwork {
  image {
    resized(width: 200) {
      src
      srcSet
      width
      height
    }
    aspectRatio
    height
  }
  imageTitle
  title
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "width",
  "value": 445
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = [
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": "is_saved",
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v15 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v16 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v17 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v18 = {
  "alias": null,
  "args": (v17/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v9/*: any*/),
    (v8/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v19 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": (v17/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cascadingEndTimeIntervalMinutes",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v25 = {
  "alias": "is_auction",
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v26 = {
  "alias": "is_closed",
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v27 = {
  "alias": "is_preview",
  "args": null,
  "kind": "ScalarField",
  "name": "isPreview",
  "storageKey": null
},
v28 = {
  "alias": "display_timely_at",
  "args": null,
  "kind": "ScalarField",
  "name": "displayTimelyAt",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v31 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v32 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v29/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    (v21/*: any*/),
    (v30/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedEndDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": "bidder_positions",
          "args": null,
          "kind": "ScalarField",
          "name": "bidderPositions",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "highest_bid",
      "args": null,
      "concreteType": "SaleArtworkHighestBid",
      "kind": "LinkedField",
      "name": "highestBid",
      "plural": false,
      "selections": (v31/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v31/*: any*/),
      "storageKey": null
    },
    (v9/*: any*/)
  ],
  "storageKey": null
},
v33 = [
  (v3/*: any*/),
  (v9/*: any*/)
],
v34 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v33/*: any*/),
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkMedium",
  "kind": "LinkedField",
  "name": "mediumType",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "filterGene",
      "plural": false,
      "selections": (v33/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v36 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
},
v37 = [
  (v2/*: any*/),
  (v9/*: any*/)
],
v38 = [
  {
    "kind": "Literal",
    "name": "cached",
    "value": false
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  {
    "kind": "Literal",
    "name": "status",
    "value": "OPEN"
  }
],
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateBidderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "kind": "LinkedField",
        "name": "createBidder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AuctionApp_sale"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateBidderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "kind": "LinkedField",
        "name": "createBidder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "HTML"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": "description(format:\"HTML\")"
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "associatedSale",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 250
                              },
                              (v5/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v7/*: any*/)
                            ],
                            "storageKey": "cropped(height:250,width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayTimelyAt",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "promotedSale",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 99
                          }
                        ],
                        "concreteType": "SaleArtworkConnection",
                        "kind": "LinkedField",
                        "name": "saleArtworksConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "SaleArtwork",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Artwork",
                                    "kind": "LinkedField",
                                    "name": "artwork",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 200
                                              }
                                            ],
                                            "concreteType": "ResizedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "resized",
                                            "plural": false,
                                            "selections": (v11/*: any*/),
                                            "storageKey": "resized(width:200)"
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "aspectRatio",
                                            "storageKey": null
                                          },
                                          (v10/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "imageTitle",
                                        "storageKey": null
                                      },
                                      (v12/*: any*/),
                                      (v8/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v18/*: any*/),
                                      (v19/*: any*/),
                                      (v20/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Sale",
                                        "kind": "LinkedField",
                                        "name": "sale",
                                        "plural": false,
                                        "selections": [
                                          (v21/*: any*/),
                                          (v22/*: any*/),
                                          (v23/*: any*/),
                                          (v24/*: any*/),
                                          (v25/*: any*/),
                                          (v26/*: any*/),
                                          (v9/*: any*/),
                                          (v27/*: any*/),
                                          (v28/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v32/*: any*/),
                                      (v9/*: any*/),
                                      (v2/*: any*/),
                                      (v4/*: any*/),
                                      (v34/*: any*/),
                                      (v35/*: any*/),
                                      (v36/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "saleArtworksConnection(first:99)"
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "bidder",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "qualifiedForBidding",
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLiveOpen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPreview",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRegistrationClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveURLIfOpen",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requireIdentityVerification",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveStartAt",
                    "storageKey": null
                  },
                  (v21/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endedAt",
                    "storageKey": null
                  },
                  (v24/*: any*/),
                  (v2/*: any*/),
                  (v8/*: any*/),
                  (v22/*: any*/),
                  {
                    "alias": null,
                    "args": (v38/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              (v39/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "kind": "LinkedField",
                        "name": "pageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "hasNextPage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endCursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v39/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  (v8/*: any*/),
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": "aspect_ratio",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "aspectRatio",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "placeholder",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": "large"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": "url(version:\"large\")"
                                      },
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "version",
                                            "value": [
                                              "normalized",
                                              "larger",
                                              "large"
                                            ]
                                          },
                                          (v5/*: any*/)
                                        ],
                                        "concreteType": "ResizedImageUrl",
                                        "kind": "LinkedField",
                                        "name": "resized",
                                        "plural": false,
                                        "selections": (v11/*: any*/),
                                        "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:445)"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v12/*: any*/),
                                  {
                                    "alias": "image_title",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "imageTitle",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artistNames",
                                    "storageKey": null
                                  },
                                  (v13/*: any*/),
                                  (v14/*: any*/),
                                  (v15/*: any*/),
                                  (v16/*: any*/),
                                  (v18/*: any*/),
                                  (v19/*: any*/),
                                  (v20/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Sale",
                                    "kind": "LinkedField",
                                    "name": "sale",
                                    "plural": false,
                                    "selections": [
                                      (v21/*: any*/),
                                      (v22/*: any*/),
                                      (v23/*: any*/),
                                      (v24/*: any*/),
                                      (v25/*: any*/),
                                      (v26/*: any*/),
                                      (v9/*: any*/),
                                      (v27/*: any*/),
                                      (v28/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "extendedBiddingPeriodMinutes",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v32/*: any*/),
                                  (v34/*: any*/),
                                  (v35/*: any*/),
                                  (v36/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "SaleArtwork",
                                    "kind": "LinkedField",
                                    "name": "saleArtwork",
                                    "plural": false,
                                    "selections": [
                                      (v21/*: any*/),
                                      (v30/*: any*/),
                                      (v29/*: any*/),
                                      (v9/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v9/*: any*/)
                                ],
                                "type": "Node",
                                "abstractKey": "__isNode"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArtworkConnectionInterface",
                        "abstractKey": "__isArtworkConnectionInterface"
                      }
                    ],
                    "storageKey": "artworksConnection(cached:false,first:15,status:\"OPEN\")"
                  },
                  {
                    "alias": null,
                    "args": (v38/*: any*/),
                    "filters": [
                      "status",
                      "cached"
                    ],
                    "handle": "connection",
                    "key": "AuctionArtworkGrid_artworksConnection",
                    "kind": "LinkedHandle",
                    "name": "artworksConnection"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLotsClosing",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "eligibleSaleArtworksCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "wide",
                              "source",
                              "large_rectangle"
                            ]
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "showAssociatedSale",
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "associatedSale",
                    "plural": false,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": "showBuyNowTab",
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "promotedSale",
                    "plural": false,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2a959258406c7df395c12ab056c286c6",
    "id": null,
    "metadata": {},
    "name": "useCreateBidderMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateBidderMutation(\n  $input: CreateBidderInput!\n) {\n  createBidder(input: $input) {\n    bidder {\n      internalID\n      sale {\n        ...AuctionApp_sale\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment AuctionApp_sale on Sale {\n  ...AuctionMeta_sale\n  ...AuctionAssociatedSale_sale\n  ...AuctionBuyNowRail_sale\n  ...AuctionDetails_sale\n  ...AuctionArtworkGrid_sale\n  startAt\n  endAt\n  internalID\n  slug\n  isClosed\n  isLotsClosing\n  eligibleSaleArtworksCount\n  coverImage {\n    url(version: [\"wide\", \"source\", \"large_rectangle\"])\n  }\n  showAssociatedSale: associatedSale {\n    internalID\n    id\n  }\n  showBuyNowTab: promotedSale {\n    internalID\n    id\n  }\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n  status\n}\n\nfragment AuctionArtworkGrid_sale on Sale {\n  internalID\n  artworksConnection(first: 15, status: OPEN, cached: false) {\n    edges {\n      node {\n        id\n        __typename\n      }\n      cursor\n    }\n    ...ArtworkGrid_artworks\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment AuctionAssociatedSale_sale on Sale {\n  associatedSale {\n    coverImage {\n      cropped(width: 445, height: 250) {\n        src\n        srcSet\n      }\n    }\n    displayTimelyAt\n    href\n    slug\n    name\n    id\n  }\n}\n\nfragment AuctionBuyNowRail_sale on Sale {\n  promotedSale {\n    href\n    internalID\n    name\n    saleArtworksConnection(first: 99) {\n      edges {\n        node {\n          artwork {\n            ...ShelfArtwork_artwork\n            id\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment AuctionDetails_sale on Sale {\n  ...RegisterButton_sale\n  ...AuctionInfoSidebar_sale\n  ...SaleDetailTimer_sale\n  internalID\n  name\n  slug\n  liveStartAt\n  startAt\n  endAt\n  description(format: HTML)\n  href\n  isClosed\n  cascadingEndTimeIntervalMinutes\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  liveStartAt\n}\n\nfragment AuctionMeta_sale on Sale {\n  name\n  description(format: HTML)\n  slug\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    resized(width: 445, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n  is_saved: isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment RegisterButton_sale on Sale {\n  bidder {\n    qualifiedForBidding\n    id\n  }\n  isAuction\n  isClosed\n  isLiveOpen\n  isPreview\n  isRegistrationClosed\n  liveURLIfOpen\n  requireIdentityVerification\n  registrationStatus {\n    internalID\n    id\n  }\n  slug\n  status\n}\n\nfragment SaleDetailTimer_sale on Sale {\n  endAt\n  endedAt\n  startAt\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  image {\n    resized(width: 200) {\n      src\n      srcSet\n      width\n      height\n    }\n    aspectRatio\n    height\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n"
  }
};
})();
(node as any).hash = '114995feec2a443c89bcb818cef2c27f';
export default node;
