/**
 * @generated SignedSource<<2239c3cef6b18e5f7eb31d0e4f52c223>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertListItem_item$data = {
  readonly artistIDs: ReadonlyArray<string> | null;
  readonly displayName: string;
  readonly href: string;
  readonly internalID: string;
  readonly labels: ReadonlyArray<{
    readonly displayValue: string;
  }>;
  readonly " $fragmentType": "SavedSearchAlertListItem_item";
};
export type SavedSearchAlertListItem_item$key = {
  readonly " $data"?: SavedSearchAlertListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertListItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertListItem_item",
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
    }
  ],
  "type": "SearchCriteria",
  "abstractKey": null
};

(node as any).hash = "384cadb8a434cadcb7bce33148e04dfa";

export default node;
