/**
 * @generated SignedSource<<e09f19c563e686ae10af0f699ae2e9ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type layoutAppQuery$variables = {};
export type layoutAppQuery$data = {
  readonly me: {
    readonly createdAt: string | null;
  } | null;
};
export type layoutAppQuery = {
  response: layoutAppQuery$data;
  variables: layoutAppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "layoutAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
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
    "name": "layoutAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    "cacheID": "17796b8622ee07385e4038a2c9115c56",
    "id": null,
    "metadata": {},
    "name": "layoutAppQuery",
    "operationKind": "query",
    "text": "query layoutAppQuery {\n  me {\n    createdAt\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c2ea060be9d2795800d7d13057aaeb8d";

export default node;
