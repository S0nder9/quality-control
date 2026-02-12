"use client";

import React from "react";

interface DragAndDropProps {
  onFiles: (files: File[]) => void;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({ onFiles }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      style={{
        border: "2px dashed #888",
        borderRadius: 6,
        padding: 24,
        textAlign: "center",
        cursor: "pointer",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      Перетащите файлы сюда или выберите через диалог
    </div>
  );
};
