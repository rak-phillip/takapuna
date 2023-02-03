import uniqueId from 'lodash.uniqueid';

export interface Snippet {
  id: ReturnType<typeof uniqueId>,
  fileName: string;
  relativePath: string;
  text: string;
  anchor: number;
  active: number;
}
