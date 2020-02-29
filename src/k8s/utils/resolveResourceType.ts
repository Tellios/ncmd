import { selectItem } from '../../common';
import { ResourceType } from './ResourceType';

export type IResolveResourceTypeParams = Record<
  ResourceType,
  boolean | undefined
>;

const autoResolveableTypes: Record<ResourceType, boolean> = {
  deployment: true,
  pod: true,
  service: true,
  ingress: true
};

const selectableTypes = Object.entries(autoResolveableTypes)
  .filter(([_, value]) => value === true)
  .map(([key]) => key) as ResourceType[];

const getTypeToUse = (
  params: IResolveResourceTypeParams
): ResourceType | undefined => {
  return Object.entries(params)
    .filter(([_, value]) => value === true)
    .map(([key]) => key)[0] as ResourceType | undefined;
};

export async function resolveResourceType(
  params: IResolveResourceTypeParams
): Promise<ResourceType> {
  const type = getTypeToUse(params);

  if (type === undefined) {
    const index = await selectItem(selectableTypes, 'Select resource type');
    return selectableTypes[index];
  }

  return type;
}
