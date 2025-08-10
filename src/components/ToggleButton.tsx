interface ToggleButtonProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export function ToggleButton({ sortOrder, setSortOrder }: ToggleButtonProps) {
  const nextOrder = sortOrder === "ascending" ? "descending" : "ascending";
  
  return (
    <button onClick={() => setSortOrder(nextOrder)}>
      Sort {nextOrder}
    </button>
  );
}
