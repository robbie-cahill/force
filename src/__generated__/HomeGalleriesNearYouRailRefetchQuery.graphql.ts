/**
 * @generated SignedSource<<5014556632659ee8ee84301fa0702783>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeGalleriesNearYouRailRefetchQuery$variables = {
  after?: string | null;
  count?: number | null;
  includePartnersNearIpBasedLocation: boolean;
  near?: string | null;
};
export type HomeGalleriesNearYouRailRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HomeGalleriesNearYouRail_query" | "HomeGalleriesNearYouRail_requestLocation">;
};
export type HomeGalleriesNearYouRailRefetchQuery = {
  response: HomeGalleriesNearYouRailRefetchQuery$data;
  variables: HomeGalleriesNearYouRailRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includePartnersNearIpBasedLocation"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "near"
},
v4 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v5 = {
  "kind": "Variable",
  "name": "includePartnersNearIpBasedLocation",
  "variableName": "includePartnersNearIpBasedLocation"
},
v6 = {
  "kind": "Variable",
  "name": "near",
  "variableName": "near"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v13 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v14 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeGalleriesNearYouRailRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "HomeGalleriesNearYouRail_requestLocation"
      },
      {
        "args": [
          (v4/*: any*/),
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "HomeGalleriesNearYouRail_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "HomeGalleriesNearYouRailRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RequestLocation",
        "kind": "LinkedField",
        "name": "requestLocation",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "country",
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          (v4/*: any*/),
          {
            "kind": "Literal",
            "name": "defaultProfilePublic",
            "value": true
          },
          {
            "kind": "Literal",
            "name": "eligibleForListing",
            "value": true
          },
          {
            "kind": "Literal",
            "name": "excludeFollowedPartners",
            "value": true
          },
          {
            "kind": "Variable",
            "name": "first",
            "variableName": "count"
          },
          (v5/*: any*/),
          {
            "kind": "Literal",
            "name": "maxDistance",
            "value": 100
          },
          (v6/*: any*/),
          {
            "kind": "Literal",
            "name": "sort",
            "value": "DISTANCE"
          },
          {
            "kind": "Literal",
            "name": "type",
            "value": "GALLERY"
          }
        ],
        "concreteType": "PartnerConnection",
        "kind": "LinkedField",
        "name": "partnersConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "initials",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 15
                      }
                    ],
                    "concreteType": "LocationConnection",
                    "kind": "LinkedField",
                    "name": "locationsConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LocationEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Location",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "locationsConnection(first:15)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerCategory",
                    "kind": "LinkedField",
                    "name": "categories",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v10/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      {
                        "alias": "avatar",
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              (v12/*: any*/),
                              (v13/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v14/*: any*/),
                            "storageKey": "cropped(height:45,width:45)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              (v12/*: any*/),
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "untouched-png",
                                  "large",
                                  "square"
                                ]
                              },
                              (v13/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v14/*: any*/),
                            "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/),
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
                                "name": "height",
                                "value": 334
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "wide",
                                  "large",
                                  "featured",
                                  "larger"
                                ]
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 445
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v14/*: any*/),
                            "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
    "cacheID": "76810d3992d44c747bec593c2b59c09e",
    "id": null,
    "metadata": {},
    "name": "HomeGalleriesNearYouRailRefetchQuery",
    "operationKind": "query",
    "text": "query HomeGalleriesNearYouRailRefetchQuery(\n  $includePartnersNearIpBasedLocation: Boolean!\n  $near: String\n  $count: Int\n  $after: String\n) {\n  ...HomeGalleriesNearYouRail_requestLocation\n  ...HomeGalleriesNearYouRail_query_1iEdaF\n}\n\nfragment CellPartner_partner on Partner {\n  ...EntityHeaderPartner_partner\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment HomeGalleriesNearYouRail_query_1iEdaF on Query {\n  partnersConnection(first: $count, after: $after, eligibleForListing: true, excludeFollowedPartners: true, includePartnersNearIpBasedLocation: $includePartnersNearIpBasedLocation, defaultProfilePublic: true, sort: DISTANCE, maxDistance: 100, near: $near, type: GALLERY) {\n    totalCount\n    edges {\n      node {\n        internalID\n        ...CellPartner_partner\n        slug\n        id\n      }\n    }\n  }\n}\n\nfragment HomeGalleriesNearYouRail_requestLocation on Query {\n  requestLocation {\n    city\n    country\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "65c608916f522f15400af3213960c111";

export default node;
