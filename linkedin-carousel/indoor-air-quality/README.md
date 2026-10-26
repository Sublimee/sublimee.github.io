# Тихий убийца вашей продуктивности

Карусель из 10 PNG-картинок, каждая 1080 × 1350 пикселей.

Готовые изображения находятся в `slides/`, порядок публикации — от `01.png` до `10.png`.
Те же изображения собраны в `indoor-air-quality-png.zip`.
`preview.html` открывает обзор всех слайдов, `preview.png` — общий лист для просмотра.

Текст адаптирован из поста: длинные абзацы сокращены для чтения с телефона.
На третьем слайде использована приложенная фотография монитора Qingping.

Ссылки из поста для описания публикации:

- Обзор первого поколения Qingping: https://breathesafeair.com/qingping-air-monitor-review/
- Обзор второго поколения Qingping: https://breathesafeair.com/qingping-air-quality-monitor-generation-2-review/
- Статья на сайте: https://magusev.ru/posts/indoor-air-quality.html

Источник для описания притока, фильтрации и подогрева воздуха бризером:

- [Описание бризеров на сайте производителя TION](https://tion.ru/product/breezer/)

Источник для дополнения о температуре, влажности и сухости слизистых:

- [Руководство EPA о качестве воздуха в офисах](https://www.epa.gov/indoor-air-quality-iaq/office-building-occupants-guide-indoor-air-quality)

Макет сохранён в `source/carousel.html` (фото встроено в файл).
Для повторного экспорта из корня проекта:

```powershell
node linkedin-carousel/indoor-air-quality/render.mjs
```
