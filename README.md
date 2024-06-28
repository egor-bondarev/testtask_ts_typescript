# Тестовое на вакансию QA Automation Engineer
## Описание: 
- тест находится в папке */src/tests*, в файле *donate.spec.ts*;
- в папке */src/pages* лежит класс стартовый страницы **ClickMePage**;
- в папке */src/pages/pageFragments* лежат отдельно классы экранов диалогового окна доната;
- в папке */src/testHelpers* находится хелпер для тестов: генератор строковых тестовых данных;

## Настройки: 
- адрес ссайта находится в файле конфигурации *playwright.config.ts* в use.baseURL

## Запуск тестов (в командной строке):
- перейти в папку *./src/tests*;
- скомпилировать код 
`tsc donate.spec.ts`
- запустить тесты 
`npx playwright test donate.spec.ts`

