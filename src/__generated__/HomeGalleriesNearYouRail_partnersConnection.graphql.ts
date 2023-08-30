/**
 * @generated SignedSource<<8eb5797a7d739ab2a4ce45dc3499fe7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeGalleriesNearYouRail_partnersConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"CellPartner_partner">;
    } | null;
  } | null> | null;
  readonly totalCount: number | null;
  readonly " $fragmentType": "HomeGalleriesNearYouRail_partnersConnection";
};
export type HomeGalleriesNearYouRail_partnersConnection$key = {
  readonly " $data"?: HomeGalleriesNearYouRail_partnersConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeGalleriesNearYouRail_partnersConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeGalleriesNearYouRail_partnersConnection",
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
  "type": "PartnerConnection",
  "abstractKey": null
};

(node as any).hash = "a035af03686d1813edc02a2af30d058e";

export default node;
