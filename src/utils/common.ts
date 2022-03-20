export function sortByField(arr: any, fieldName: string) {
  return arr?.sort(
    (prev: any, current: any) => prev[fieldName] - current[fieldName]
  );
}

export function sortReverseByField(arr: any, fieldName: any) {
  return arr
    .sort((prev: any, current: any) => prev[fieldName] - current[fieldName])
    .reverse();
}

export function pass() {
  return 1;
}
