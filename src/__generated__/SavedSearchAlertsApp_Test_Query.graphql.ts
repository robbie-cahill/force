/**
 * @generated SignedSource<<0e80a1778b1dd4e7bf6788299a913d3e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertsApp_Test_Query$variables = {};
export type SavedSearchAlertsApp_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsApp_me">;
  } | null;
};
export type SavedSearchAlertsApp_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly savedSearchesConnection: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly __typename: "SearchCriteria";
          readonly artistIDs: ReadonlyArray<string> | null;
          readonly displayName: string;
          readonly href: string;
          readonly internalID: string;
          readonly labels: ReadonlyArray<{
            readonly displayValue: string;
          }>;
        } | null;
      } | null> | null;
      readonly pageInfo: {
        readonly endCursor: string | null;
        readonly hasNextPage: boolean;
      };
    } | null;
  } | null;
};
export type SavedSearchAlertsApp_Test_Query = {
  rawResponse: SavedSearchAlertsApp_Test_Query$rawResponse;
  response: SavedSearchAlertsApp_Test_Query$data;
  variables: SavedSearchAlertsApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "CREATED_AT_DESC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertsApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchAlertsApp_me"
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
    "name": "SavedSearchAlertsApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "SearchCriteriaConnection",
            "kind": "LinkedField",
            "name": "savedSearchesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchCriteriaEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SearchCriteria",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "displayName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistIDs",
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
                        "concreteType": "SearchCriteriaLabel",
                        "kind": "LinkedField",
                        "name": "labels",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayValue",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "savedSearchesConnection(first:10,sort:\"CREATED_AT_DESC\")"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": [
              "sort"
            ],
            "handle": "connection",
            "key": "SavedSearchAlertsApp_savedSearchesConnection",
            "kind": "LinkedHandle",
            "name": "savedSearchesConnection"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9b76975b301978a09b1a71a525e1fbdb",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertsApp_Test_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertsApp_Test_Query {\n  me {\n    ...SavedSearchAlertsApp_me\n    id\n  }\n}\n\nfragment SavedSearchAlertListItem_item on SearchCriteria {\n  internalID\n  displayName\n  artistIDs\n  href\n  labels {\n    displayValue\n  }\n}\n\nfragment SavedSearchAlertsApp_me on Me {\n  savedSearchesConnection(first: 10, sort: CREATED_AT_DESC) {\n    edges {\n      node {\n        internalID\n        ...SavedSearchAlertListItem_item\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f8933a25cbb3db33c342ca5274a84a2b";

export default node;
