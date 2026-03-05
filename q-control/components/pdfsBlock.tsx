"use client"

import { usePDF } from "@/hooks/usePDF";

export const PdfsBlock = () => {
    const { sentPDFs } = usePDF();

    const handleClick = async () => {
        const data = { title: "Test PDF", id: 123 };
        const res = await sentPDFs(data);
        console.log(res);
        alert("Запрос отправлен! Проверь консоль.");
    };

    return (
        <div>
            <button onClick={handleClick}>
                Отправить тестовый запрос
            </button>
        </div>
    );
};
