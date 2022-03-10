export type addText = (note: {
  text: string;
  timeOut?: number;
  id?: string;
  isError?: boolean;
}) => void;

export type removeText = (id: string) => void;

export type note = {
  text: string;
  id: string;
  isError: boolean;
  timeOut: number;
};
