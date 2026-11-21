# Мастер-промпт для Beşiktaş Bafra Pide

Создай премиальный сайт на турецком для пидейной Beşiktaş Bafra Pide в районе Türkali, Стамбул. Адаптируй драматургию Stride с одним продуктом, который движется между разделами. Выстрой визуальный язык вокруг тонкой золотистой корочки, дерева и тепла печи.

## Первый экран

- Покажи в центре внимания закрытое пиде с говядиной на доске. Возьми реальную фотографию блюда из меню ресторана как референс для ImageGen. Пересними блюдо в одном стиле с остальными позициями. Сохрани естественные пропорции, тип подачи и фактуру корочки.
- Название заведения остаётся в шапке. На первом экране напиши «Fırından sıcacık.» и покажи название активного пиде, короткое описание и кнопку «Pide çeşitlerini keşfet».
- Под фотографией размести шесть вариантов. Сделай переключение касанием, кликом, свайпом и стрелками клавиатуры. Меняй фотографию, подпись и оттенок фона одновременно. Поддержи `prefers-reduced-motion`. У блюд нет автоматического переключения.
- Сделай тёмный фон и тонкие линии вокруг блюда. В качестве шрифтов используй Gloock и DM Sans с турецкими символами.

## Шесть блюд

| Пиде | Что показать |
| --- | --- |
| Kıymalı Bafra | Закрытое, с обжаренной говядиной и луком |
| Sucuklu kaşarlı | Закрытое, с суджуком и сыром кашар |
| Ispanaklı Bafra | Закрытое, со шпинатом |
| Patatesli kaşarlı | Закрытое, с картофелем и сыром кашар |
| Ustanın pidesi | Открытое, с мясом, грибами, кашаром и тимьяном |
| Trabzon peynirlisi | Открытое, с трабзонским сыром |

## Движение и структура

1. При прокрутке перенеси фотографию активного пиде в раздел «Kabuğundan iç harcına.». Покажи ингредиенты именно этого блюда.
2. Продолжи движение до его карточки. Подсвети активную карточку среди шести и добавь ссылку к позиции полного меню.
3. Оставь весь каталог из 26 позиций с навигацией по категориям. Публикуй названия и подтверждённые описания без цен.
4. Добавь часы 10:00–22:00, телефон, карту и кнопку маршрута к Mısırlı Sokak 19/A. Ссылку на заказ веди на страницу ресторана.

Для сцены и переходов используй GSAP, для прокрутки Lenis, для отклика кнопок React Bits Magnet. При отключённом движении все блюда, каталог и ссылки должны оставаться доступными. Проверь турецкие буквы, сенсорный ввод, навигацию с клавиатуры и ширину от 320 px.

## Фотографии

Подготовь шесть вырезанных изображений на прозрачном фоне. Один источник мягкого тёплого света сверху слева, ракурс в три четверти сверху, сухая выпеченная корочка и полная доска в кадре. Блюда должны сохранять длину, толщину теста и визуальные признаки начинки с фото меню. Подпиши, что визуализации подготовлены по фотографиям меню.

[Фотографии и меню Yemeksepeti](https://www.yemeksepeti.com/restaurant/urly/besiktas-bafra-pide) · [Фотографии и меню Migros Yemek](https://www.migros.com.tr/yemek/besiktas-bafra-pide-besiktas-turkali-mah-st-1e391) · [MekanRadar](https://mekanradar.com/mekan/istanbul/besiktas/besiktas-bafra-pide)


### Промпты для ImageGen

**Общая часть**

> Use case: photorealistic-natural. Create one isolated hero asset for a premium Istanbul pide restaurant, using the attached restaurant menu photograph as the reference for actual food identity, scale, recipe and shape. Reshoot it like a real editorial food photograph with a 50 mm lens, overhead three-quarter camera about 60 degrees above the table. Soft warm side window light from upper left. Genuine irregular thin blistered baked crust, lightly browned, realistic dry crumbs, natural color and subtle butter sheen. Horizontal presentation centered, rising slightly left to right. Leave 8% padding on every side, the whole board or plate inside frame. Use a genuinely transparent alpha background outside the single board or plate so the site can show it over a dark gradient. Keep the food and board opaque. No table, backdrop, haze, text, logos, graphic elements, hands, garnish or extra bowls. No cheese pulls or synthetic looking highlights.

**Промпты для шести кадров**

- Kıymalı Bafra pidesi. Hero shot. A very long narrow closed Bafra pide sliced crosswise into 8 to 10 slim pieces, arranged in a single row close together on the same simple dark warm oak serving board, as in the menu reference. At the front of two or three cuts the viewer sees a modest amount of crumbly browned minced beef and finely chopped onion under flaky crisp golden dough. Thin and elongated like the real regional recipe, no thick bread and no toppings. Make the crust and two visible cut faces especially appetizing and crisp.
- Sucuklu kaşarlı Bafra pidesi. One very long narrow CLOSED warm golden pide sliced crosswise in a row on a simple warm oak serving board. Tiny glimpses of real Turkish sucuk and melted kaşar inside a few cut faces. It must stay closed and read as a baking specialty, not an open pizza, no external topping.
- Ispanaklı Bafra pidesi. Two slim folded closed pieces of spinach pide with lightly browned uneven baked blisters and a thin crisp seam. One short cut shows a modest amount of dark green cooked spinach, with no cheese. Keep the two long pieces and simple round ivory ceramic plate from the reference.
- Patatesli kaşarlı Bafra pidesi. An authentic closed thin elongated Bafra pide cut crosswise on a slender simple warm oak board. Show only a little soft potato and melted pale kaşar cheese in a couple of cut ends. Golden crisp crust, no external toppings, no wedges or herbs scattered around.
- Ustanın pidesi. One long narrow OPEN Turkish boat-shaped pide on a clean narrow warm oak serving board. Reference proportions, visible chopped browned beef cubes, diced mushrooms, lightly bubbled kaşar and tiny flecks of thyme on the filling; well baked thin rim curled to two pointed ends. Keep it recognizably a Turkish pide.
- Trabzon peynirlisi. Match the restaurant menu reference. One long narrow OPEN boat-shaped pide with plain melted Trabzon cheese, naturally blistered and gently browned, no eggs, herbs, meat or vegetables. Serve on a simple ivory ceramic rectangular plate. Real thin baked crust and pointed ends. Keep exact single-item composition.