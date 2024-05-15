# FaceRecognitionSSTU

## Описание

Этот репозиторий содержит приложение для распознавания лиц входящих в университе, которое включает в себя backend на Python и frontend на React. Backend использует базу данных MS SQL Server для хранения данных. В этом README описаны шаги по установке и запуску проекта.

### Создано командой Унесенные кодом

##### [Щеглов Богдан](https://vk.com/b.sheglov) 

##### [Андреев Роман](https://vk.com/rs_street64) 

##### [Евсеенков Сергей](https://vk.com/deathnlove) 

##### [Свинцов Денис](https://vk.com/deonizx)


## Установка и запуск

### Шаг 1: Установка CMake и Visual Studio

1. Установите последнюю версию [CMake](https://cmake.org/download/).
2. Установите [Visual Studio 2019](https://visualstudio.microsoft.com/vs/older-downloads/) с необходимыми компонентами для разработки на Python:
    - Убедитесь, что вы установили `Desktop development with C++`, так как это требуется для некоторых Python пакетов.

### Шаг 2: Установка Python и зависимостей

1. Установите [Conda](https://docs.conda.io/en/latest/miniconda.html) с Python 3.11.
2. Создайте и активируйте новое окружение с Python 3.11:
    ```bash
    conda create -n myenv python=3.11
    conda activate myenv
    ```
3. Установите все необходимые зависимости, указанные в файле `pythonBackend/requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

### Шаг 3: Установка MS SQL Server и настройка базы данных

1. Установите [MS SQL Server 2019](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
2. Убедитесь, что порт 1433 открыт для входящих соединений.
3. Выполните скрипт из файла `UniversityDB.sql` для создания базы данных:
    1. Откройте SQL Server Management Studio (SSMS).
    2. Подключитесь к вашему серверу.
    3. Откройте файл `UniversityDB.sql` и выполните скрипт.

### Шаг 4: Установка и настройка frontend на React

1. Перейдите в папку с frontend:
    ```bash
    cd reactFrontend
    ```
2. Установите все необходимые зависимости с помощью npm:
    ```bash
    npm install
    ```

## Запуск проекта

1. Убедитесь, что ваше conda окружение активировано.
2. Убедитесь, что MS SQL Server запущен и настроен правильно.
3. Запустите backend:
    ```bash
    cd pythonBackend
    python app.py
    ```
4. Запустите frontend:
    ```bash
    cd reactFrontend
    npm start
    ```

Теперь ваш экземпляр приложения должен быть запущен и доступен для использования.




