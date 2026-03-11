import React, { useCallback } from 'react';
import { Upload, File as FileIcon, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, onClear }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf') {
          onFileSelect(file);
        } else {
          alert('Por favor, selecione um arquivo PDF.');
        }
      }
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Por favor, selecione um arquivo PDF.');
      }
    }
  };

  if (selectedFile) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-camerite-main/20 rounded-lg flex items-center justify-center">
            <FileIcon className="text-camerite-main w-6 h-6" />
          </div>
          <div>
            <p className="text-white font-medium">{selectedFile.name}</p>
            <p className="text-gray-400 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          title="Remover arquivo"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-600 hover:border-camerite-main bg-gray-800/50 hover:bg-gray-800 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
    >
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        id="pdf-upload"
        onChange={handleChange}
      />
      <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-700 group-hover:bg-camerite-main/20 rounded-full flex items-center justify-center mb-4 transition-colors">
          <Upload className="text-gray-400 group-hover:text-camerite-main w-8 h-8 transition-colors" />
        </div>
        <p className="text-white font-medium text-lg mb-1">Clique para selecionar ou arraste o PDF aqui</p>
        <p className="text-gray-500 text-sm">Apenas arquivos .pdf são suportados</p>
      </label>
    </div>
  );
};

export default FileUpload;
