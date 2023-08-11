/**
 * @generated SignedSource<<e122403e61456c1c2272093675069b67>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddressInput = {
  addressLine1: string;
  addressLine2?: string | null;
  city?: string | null;
  country: string;
  postalCode: string;
  region?: string | null;
};
export type AddressVerificationFlowQuery$variables = {
  address: AddressInput;
};
export type AddressVerificationFlowQuery$data = {
  readonly verifyAddress: {
    readonly " $fragmentSpreads": FragmentRefs<"AddressVerificationFlow_verifyAddress">;
  } | null;
};
export type AddressVerificationFlowQuery = {
  response: AddressVerificationFlowQuery$data;
  variables: AddressVerificationFlowQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "address"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "address",
    "variableName": "address"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lines",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "city",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "country",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "postalCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddressVerificationFlowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAddressType",
        "kind": "LinkedField",
        "name": "verifyAddress",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddressVerificationFlow_verifyAddress"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddressVerificationFlowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAddressType",
        "kind": "LinkedField",
        "name": "verifyAddress",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "InputAddressFields",
            "kind": "LinkedField",
            "name": "inputAddress",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "InputAddress",
                "kind": "LinkedField",
                "name": "address",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SuggestedAddressFields",
            "kind": "LinkedField",
            "name": "suggestedAddresses",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SuggestedAddress",
                "kind": "LinkedField",
                "name": "address",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "verificationStatus",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "01f44d47aa39b335ffa23007d00cd289",
    "id": null,
    "metadata": {},
    "name": "AddressVerificationFlowQuery",
    "operationKind": "query",
    "text": "query AddressVerificationFlowQuery(\n  $address: AddressInput!\n) {\n  verifyAddress(address: $address) {\n    ...AddressVerificationFlow_verifyAddress\n  }\n}\n\nfragment AddressVerificationFlow_verifyAddress on VerifyAddressType {\n  inputAddress {\n    lines\n    address {\n      addressLine1\n      addressLine2\n      city\n      country\n      postalCode\n      region\n    }\n  }\n  suggestedAddresses {\n    lines\n    address {\n      addressLine1\n      addressLine2\n      city\n      country\n      postalCode\n      region\n    }\n  }\n  verificationStatus\n}\n"
  }
};
})();

(node as any).hash = "2cc68455d9f5588f2331a3dc8bdc6942";

export default node;
