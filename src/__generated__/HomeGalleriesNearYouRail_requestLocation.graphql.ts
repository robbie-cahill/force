/**
 * @generated SignedSource<<94fa95d498ea47e92c4f95e87ed0a3e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeGalleriesNearYouRail_requestLocation$data = {
  readonly requestLocation: {
    readonly city: string | null;
    readonly country: string | null;
  } | null;
  readonly " $fragmentType": "HomeGalleriesNearYouRail_requestLocation";
};
export type HomeGalleriesNearYouRail_requestLocation$key = {
  readonly " $data"?: HomeGalleriesNearYouRail_requestLocation$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeGalleriesNearYouRail_requestLocation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeGalleriesNearYouRail_requestLocation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "RequestLocation",
      "kind": "LinkedField",
      "name": "requestLocation",
      "plural": false,
      "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "71189e5bae110105624e1851da43b550";

export default node;
