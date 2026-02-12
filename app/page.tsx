"use client";
import { RPProvider, RPDefaultLayout, RPPages, RPConfig } from '@pdf-viewer/react';

import { DragAndDrop } from "./components/DragAndDrop";

export default function Home() {
  const handleFiles = async (files: File[]) => {
    console.log("Полученные файлы:", files);
    const file = files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", file);
console.log("FORM DATA: ", formData.get("file"));

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      console.log("Ответ сервера:", result);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <DragAndDrop onFiles={handleFiles} />
    </main>
  );
}
