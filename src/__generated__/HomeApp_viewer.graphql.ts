/**
 * @generated SignedSource<<f81b4d20e3e310366ccdbdb6a027c428>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeApp_viewer$data = {
  readonly featuredEventsOrderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeaturedEventsRail_orderedSet">;
  } | null;
  readonly heroUnitsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeHeroUnits_heroUnits">;
  } | null;
  readonly " $fragmentType": "HomeApp_viewer";
};
export type HomeApp_viewer$key = {
  readonly " $data"?: HomeApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeApp_viewer",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "HomeFeaturedEventsRail_orderedSet"
        }
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "HomeHeroUnits_heroUnits"
        }
      ],
      "storageKey": "heroUnitsConnection(first:10)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "cb0b4ea243bbf68347e5774e1f681655";

export default node;
