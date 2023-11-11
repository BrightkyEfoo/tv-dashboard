export type Props = {
  children: React.ReactNode;
  name: string;
  handleEdit: handleFn;
  handleDelete: handleFn;
};

type handleFn = (() => void) | (() => Promise<void>);
