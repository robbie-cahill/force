/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SaleSorts = "CREATED_AT_ASC" | "CREATED_AT_DESC" | "ELIGIBLE_SALE_ARTWORKS_COUNT_ASC" | "ELIGIBLE_SALE_ARTWORKS_COUNT_DESC" | "END_AT_ASC" | "END_AT_DESC" | "NAME_ASC" | "NAME_DESC" | "START_AT_ASC" | "START_AT_DESC" | "TIMELY_AT_NAME_ASC" | "TIMELY_AT_NAME_DESC" | "_ID_ASC" | "_ID_DESC" | "%future added value";
export type OtherAuctionsQueryVariables = {
    first?: number | null;
    sort?: SaleSorts | null;
};
export type OtherAuctionsQueryResponse = {
    readonly salesConnection: {
        readonly " $fragmentRefs": FragmentRefs<"OtherAuctions_salesConnection">;
    } | null;
};
export type OtherAuctionsQuery = {
    readonly response: OtherAuctionsQueryResponse;
    readonly variables: OtherAuctionsQueryVariables;
};



/*
query OtherAuctionsQuery(
  $first: Int
  $sort: SaleSorts
) {
  salesConnection(first: $first, sort: $sort) {
    ...OtherAuctions_salesConnection
  }
}

fragment AuctionCard_sale on Sale {
  cover_image: coverImage {
    cropped(width: 200, height: 180) {
      url
    }
  }
  isBenefit
  isGalleryAuction
  end_at: endAt
  href
  slug
  is_live_open: isLiveOpen
  is_preview: isPreview
  live_start_at: liveStartAt
  registrationStatus {
    internalID
    id
  }
  is_registration_closed: isRegistrationClosed
  name
  start_at: startAt
  is_closed: isClosed
  partner {
    name
    id
  }
}

fragment OtherAuctions_salesConnection on SaleConnection {
  edges {
    node {
      ...AuctionCard_sale
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort",
    "type": "SaleSorts"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "sort",
    "variableName": "sort"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OtherAuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OtherAuctions_salesConnection"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OtherAuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SaleConnection",
        "kind": "LinkedField",
        "name": "salesConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": "cover_image",
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
                            "value": 180
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 200
                          }
                        ],
                        "concreteType": "CroppedImageUrl",
                        "kind": "LinkedField",
                        "name": "cropped",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          }
                        ],
                        "storageKey": "cropped(height:180,width:200)"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isBenefit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isGalleryAuction",
                    "storageKey": null
                  },
                  {
                    "alias": "end_at",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": "is_live_open",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLiveOpen",
                    "storageKey": null
                  },
                  {
                    "alias": "is_preview",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPreview",
                    "storageKey": null
                  },
                  {
                    "alias": "live_start_at",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "liveStartAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "is_registration_closed",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRegistrationClosed",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "alias": "start_at",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": null
                  },
                  {
                    "alias": "is_closed",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OtherAuctionsQuery",
    "operationKind": "query",
    "text": "query OtherAuctionsQuery(\n  $first: Int\n  $sort: SaleSorts\n) {\n  salesConnection(first: $first, sort: $sort) {\n    ...OtherAuctions_salesConnection\n  }\n}\n\nfragment AuctionCard_sale on Sale {\n  cover_image: coverImage {\n    cropped(width: 200, height: 180) {\n      url\n    }\n  }\n  isBenefit\n  isGalleryAuction\n  end_at: endAt\n  href\n  slug\n  is_live_open: isLiveOpen\n  is_preview: isPreview\n  live_start_at: liveStartAt\n  registrationStatus {\n    internalID\n    id\n  }\n  is_registration_closed: isRegistrationClosed\n  name\n  start_at: startAt\n  is_closed: isClosed\n  partner {\n    name\n    id\n  }\n}\n\nfragment OtherAuctions_salesConnection on SaleConnection {\n  edges {\n    node {\n      ...AuctionCard_sale\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e49b60e9fc1f386bd115695786f8b97d';
export default node;
