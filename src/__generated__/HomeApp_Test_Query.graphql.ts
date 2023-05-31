/**
 * @generated SignedSource<<a104c14d090636182fcc1d1e90b628e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_Test_Query$variables = {};
export type HomeApp_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeApp_viewer">;
  } | null;
};
export type HomeApp_Test_Query = {
  response: HomeApp_Test_Query$data;
  variables: HomeApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide",
    "large_rectangle"
  ]
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeApp_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "featuredEventsOrderedSet",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "529939e2275b245e290004a0"
              }
            ],
            "concreteType": "OrderedSet",
            "kind": "LinkedField",
            "name": "orderedSet",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "subtitle",
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
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "small",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 63
                              },
                              (v1/*: any*/),
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 95
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "height",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "cropped(height:63,version:[\"main\",\"wide\",\"large_rectangle\"],width:95)"
                          },
                          {
                            "alias": "large",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 297
                              },
                              (v1/*: any*/),
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
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": "cropped(height:297,version:[\"main\",\"wide\",\"large_rectangle\"],width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "type": "FeaturedLink",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v5/*: any*/),
                    "type": "Node",
                    "abstractKey": "__isNode"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v5/*: any*/),
                    "type": "Profile",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "orderedSet(id:\"529939e2275b245e290004a0\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              }
            ],
            "concreteType": "HeroUnitConnection",
            "kind": "LinkedField",
            "name": "heroUnitsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "HeroUnitEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "HeroUnit",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "body",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "credit",
                        "storageKey": null
                      },
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
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageURL",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "label",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "HeroUnitLink",
                        "kind": "LinkedField",
                        "name": "link",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "text",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "heroUnitsConnection(first:10)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "24d7374c2066e2cccf985d089d248d80",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.featuredEventsOrderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "viewer.featuredEventsOrderedSet.id": (v6/*: any*/),
        "viewer.featuredEventsOrderedSet.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItem"
        },
        "viewer.featuredEventsOrderedSet.items.__isNode": (v7/*: any*/),
        "viewer.featuredEventsOrderedSet.items.__typename": (v7/*: any*/),
        "viewer.featuredEventsOrderedSet.items.href": (v8/*: any*/),
        "viewer.featuredEventsOrderedSet.items.id": (v6/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image": (v9/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.large": (v10/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.large.src": (v7/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.large.srcSet": (v7/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.small": (v10/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.small.height": (v11/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.small.src": (v7/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.small.srcSet": (v7/*: any*/),
        "viewer.featuredEventsOrderedSet.items.image.small.width": (v11/*: any*/),
        "viewer.featuredEventsOrderedSet.items.internalID": (v6/*: any*/),
        "viewer.featuredEventsOrderedSet.items.subtitle": (v8/*: any*/),
        "viewer.featuredEventsOrderedSet.items.title": (v8/*: any*/),
        "viewer.heroUnitsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HeroUnitConnection"
        },
        "viewer.heroUnitsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "HeroUnitEdge"
        },
        "viewer.heroUnitsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "HeroUnit"
        },
        "viewer.heroUnitsConnection.edges.node.body": (v7/*: any*/),
        "viewer.heroUnitsConnection.edges.node.credit": (v8/*: any*/),
        "viewer.heroUnitsConnection.edges.node.id": (v6/*: any*/),
        "viewer.heroUnitsConnection.edges.node.image": (v9/*: any*/),
        "viewer.heroUnitsConnection.edges.node.image.imageURL": (v8/*: any*/),
        "viewer.heroUnitsConnection.edges.node.label": (v8/*: any*/),
        "viewer.heroUnitsConnection.edges.node.link": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "HeroUnitLink"
        },
        "viewer.heroUnitsConnection.edges.node.link.text": (v7/*: any*/),
        "viewer.heroUnitsConnection.edges.node.link.url": (v7/*: any*/),
        "viewer.heroUnitsConnection.edges.node.title": (v7/*: any*/)
      }
    },
    "name": "HomeApp_Test_Query",
    "operationKind": "query",
    "text": "query HomeApp_Test_Query {\n  viewer {\n    ...HomeApp_viewer\n  }\n}\n\nfragment HomeApp_viewer on Viewer {\n  featuredEventsOrderedSet: orderedSet(id: \"529939e2275b245e290004a0\") {\n    ...HomeFeaturedEventsRail_orderedSet\n    id\n  }\n  heroUnitsConnection(first: 10) {\n    ...HomeHeroUnits_heroUnits\n  }\n}\n\nfragment HomeFeaturedEventsRail_orderedSet on OrderedSet {\n  items {\n    __typename\n    ... on FeaturedLink {\n      internalID\n      title\n      subtitle\n      href\n      image {\n        small: cropped(width: 95, height: 63, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n          width\n          height\n        }\n        large: cropped(width: 445, height: 297, version: [\"main\", \"wide\", \"large_rectangle\"]) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on Profile {\n      id\n    }\n  }\n}\n\nfragment HomeHeroUnit_heroUnit on HeroUnit {\n  body\n  credit\n  image {\n    imageURL\n  }\n  label\n  link {\n    text\n    url\n  }\n  title\n}\n\nfragment HomeHeroUnits_heroUnits on HeroUnitConnection {\n  edges {\n    node {\n      ...HomeHeroUnit_heroUnit\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0ba2641f293a8d7baf0189342d87b2c2";

export default node;
