/**
 * @generated SignedSource<<5ee370fc8d74ce25b2f3a9f241979583>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeGalleriesNearYouRail_query$data = {
  readonly partnersConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellPartner_partner">;
      } | null;
    } | null> | null;
    readonly totalCount: number | null;
  } | null;
  readonly " $fragmentType": "HomeGalleriesNearYouRail_query";
};
export type HomeGalleriesNearYouRail_query$key = {
  readonly " $data"?: HomeGalleriesNearYouRail_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeGalleriesNearYouRail_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includePartnersNearIpBasedLocation"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "near"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeGalleriesNearYouRail_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
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
        {
          "kind": "Variable",
          "name": "includePartnersNearIpBasedLocation",
          "variableName": "includePartnersNearIpBasedLocation"
        },
        {
          "kind": "Literal",
          "name": "maxDistance",
          "value": 100
        },
        {
          "kind": "Variable",
          "name": "near",
          "variableName": "near"
        },
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellPartner_partner"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
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
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a61be846f2f6b8e81dad7bf2a3afa634";

export default node;
