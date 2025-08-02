import { useSelectionStore } from '../store/selectionStore';
import { downloadCSV } from '../utils/downloadCsv';

export const Flyout = () => {
  const { selectedItems, clearSelection } = useSelectionStore();

  if (selectedItems.length === 0) return null;

  const handleDownload = () => {
    downloadCSV(selectedItems);
  };

  return (
    <div className="fixed bottom-0 left-0 p-4 shadow w-100">
      <div className="flex justify-between items-center dark:text-white transition-all">
        <span>{selectedItems.length} items selected</span>
        <button
          onClick={clearSelection}
          className="bg-orange-100 hover:bg-orange-300 focus:outline-2 focus:outline-offset-2 focus:outline-orange-100 active:bg-orange-400 rounded-lg cursor-pointer p-1 transition-all dark:bg-black dark:hover:bg-blue-900"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="bg-orange-100 hover:bg-orange-300 focus:outline-2 focus:outline-offset-2 focus:outline-orange-100 active:bg-orange-400 rounded-lg cursor-pointer p-1 transition-all dark:bg-black dark:hover:bg-blue-900"
        >
          Download
        </button>
      </div>
    </div>
  );
};
