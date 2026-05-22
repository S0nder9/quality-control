@echo off
REM Батник для запуска фронтенда и бэкенда с установкой зависимостей
REM Нороконтроль - Система контроля качества PDF документов

setlocal enabledelayedexpansion

REM Получаем путь к директории скрипта
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo.
echo ================================
echo   Нороконтроль - Полная подготовка
echo ================================
echo.

REM Проверяем наличие необходимых компонентов
echo Проверка предварительных требований...

REM Проверяем Node.js и npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ОШИБКА] npm не установлен. Пожалуйста, установите Node.js
    pause
    exit /b 1
)
echo [OK] npm найден

REM Проверяем .NET CLI
where dotnet >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ОШИБКА] dotnet CLI не установлен. Пожалуйста, установите .NET SDK
    pause
    exit /b 1
)
echo [OK] dotnet найден

echo.
echo ================================
echo   Подготовка фронтенда
echo ================================
echo.

REM Установка зависимостей фронтенда
if not exist "Frontend\node_modules" (
    echo Установка зависимостей npm...
    cd /d "%SCRIPT_DIR%Frontend"
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ОШИБКА] Ошибка при установке npm зависимостей
        pause
        exit /b 1
    )
    cd /d "%SCRIPT_DIR%"
    echo [OK] Зависимости npm установлены
) else (
    echo [OK] Frontend\node_modules уже существует
)

echo.
echo ================================
echo   Освобождение портов
echo ================================
echo.

REM Освобождаем порт 5079 (Backend)
echo Проверка и освобождение порта 5079...
for /f "tokens=5" %%a in ('netstat -ano ^| find ":5079"') do (
    echo Завершение процесса %%a на порту 5079...
    taskkill /PID %%a /F >nul 2>&1
)

REM Освобождаем порт 3000 (Frontend)
echo Проверка и освобождение порта 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| find ":3000"') do (
    echo Завершение процесса %%a на порту 3000...
    taskkill /PID %%a /F >nul 2>&1
)

REM Небольшая задержка для освобождения портов
timeout /t 2 /nobreak >nul

echo.
echo ================================
echo   Запуск компонентов системы
echo ================================
echo.

REM Запускаем бэкенд в новом окне
echo [1] Запуск бэкенда (Backend) на порту 5079...
start "Нороконтроль - Backend" cmd /k "cd /d "%SCRIPT_DIR%Backend" && dotnet run"

REM Задержка для инициализации бэкенда
timeout /t 4 /nobreak

REM Запускаем фронтенд в новом окне
echo [2] Запуск фронтенда (Frontend) на порту 3000...
start "Нороконтроль - Frontend" cmd /k "cd /d "%SCRIPT_DIR%Frontend" && npm run dev"

REM Задержка для инициализации фронтенда
timeout /t 3 /nobreak

REM Открываем браузер
echo [3] Открытие браузера...
start http://localhost:3000

echo.
echo ================================
echo   Запуск завершён!
echo ================================
echo.
echo Компоненты системы запускаются в отдельных окнах:
echo - Backend (C# .NET) - порт 5079
echo - Frontend (Next.js) - порт 3000
echo.
echo Браузер откроется автоматически на http://localhost:3000
echo.
echo Закройте оба окна для остановки системы
echo.
pause
