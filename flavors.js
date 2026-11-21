export const languageCodes = ['tr', 'en', 'ar'];

const dishes = [
  {
    "id": "ustanin",
    "theme": "#734020",
    "light": "#f0b77c",
    "group": "meat",
    "name": [
      "Ustanın pidesi",
      "The baker’s pide",
      "بيدا الخبّاز"
    ],
    "short": [
      "Ustanın",
      "Baker’s pide",
      "بيدا الخبّاز"
    ],
    "feature": [
      "Kuşbaşı et ve mantar",
      "Diced beef and mushrooms",
      "لحم بقري مقطّع وفطر"
    ],
    "description": [
      "Kuşbaşı dana eti, mantar ve eriyen kaşar. Fırında kızaran açık pidenin üzerine kekik.",
      "Diced beef, mushrooms and melted kaşar cheese, finished with thyme.",
      "قطع لحم بقري وفطر وجبن كاشار ذائب، مع لمسة من الزعتر."
    ],
    "ingredients": [
      [
        "Dana kuşbaşı",
        "Mantar",
        "Kaşar",
        "Kekik"
      ],
      [
        "Diced beef",
        "Mushrooms",
        "Kaşar cheese",
        "Thyme"
      ],
      [
        "لحم بقري",
        "فطر",
        "جبن كاشار",
        "زعتر"
      ]
    ]
  },
  {
    "id": "besiktas",
    "theme": "#78322b",
    "light": "#f0a78d",
    "group": "meat",
    "name": [
      "Beşiktaş’ın kıymalısı",
      "Beşiktaş minced beef pide",
      "بيدا بشكتاش باللحم المفروم"
    ],
    "short": [
      "Beşiktaş kıymalı",
      "Beşiktaş beef",
      "لحم بشكتاش"
    ],
    "feature": [
      "Kıymalı ve baharatlı",
      "Rich and spiced",
      "نكهة غنية ومتبلّة"
    ],
    "description": [
      "Dana kıymaya pastırma, sucuk ve kaşar eşlik eder. Et sevenler için doyurucu bir seçim.",
      "Minced beef with pastırma, Turkish sucuk and kaşar cheese. A hearty option for meat lovers.",
      "لحم بقري مفروم مع البسطرمة والسجق التركي وجبن كاشار. خيار مشبع لمحبي اللحوم."
    ],
    "ingredients": [
      [
        "Dana kıyma",
        "Pastırma",
        "Sucuk",
        "Kaşar"
      ],
      [
        "Minced beef",
        "Pastırma",
        "Sucuk",
        "Kaşar cheese"
      ],
      [
        "لحم بقري مفروم",
        "بسطرمة",
        "سجق تركي",
        "جبن كاشار"
      ]
    ]
  },
  {
    "id": "chicken",
    "theme": "#6b4327",
    "light": "#f5b977",
    "group": "chicken",
    "name": [
      "Tavuklu pide",
      "Chicken and pepper pide",
      "بيدا بالدجاج والفلفل"
    ],
    "short": [
      "Tavuklu",
      "Chicken",
      "دجاج"
    ],
    "feature": [
      "Tavuk ve köy biberi",
      "Chicken and peppers",
      "دجاج وفلفل"
    ],
    "description": [
      "Tavuk göğsü, domates, biber ve kaşar. Üzerinde kekik, kenarlarında fırın çıtırlığı.",
      "Chicken breast, tomatoes, peppers and kaşar cheese with thyme and a crisp baked crust.",
      "صدر دجاج وطماطم وفلفل وجبن كاشار مع الزعتر، على عجينة مقرمشة."
    ],
    "ingredients": [
      [
        "Tavuk göğsü",
        "Domates",
        "Biber",
        "Kaşar",
        "Kekik"
      ],
      [
        "Chicken breast",
        "Tomato",
        "Pepper",
        "Kaşar cheese",
        "Thyme"
      ],
      [
        "صدر دجاج",
        "طماطم",
        "فلفل",
        "جبن كاشار",
        "زعتر"
      ]
    ]
  },
  {
    "id": "spinach",
    "theme": "#3d4b34",
    "light": "#cad594",
    "group": "veg",
    "name": [
      "Ispanaklı kaşarlı pide",
      "Spinach and kaşar pide",
      "بيدا بالسبانخ والكاشار"
    ],
    "short": [
      "Ispanaklı",
      "Spinach",
      "سبانخ"
    ],
    "feature": [
      "Ispanak ve kızarmış kaşar",
      "Spinach and golden kaşar",
      "سبانخ وكاشار محمّر"
    ],
    "description": [
      "Ispanağın üzerine kaşar peyniri. Fırında peynir kızarırken kenarları çıtırlaşır.",
      "Spinach topped with kaşar cheese, baked until the cheese is golden and the edges crisp.",
      "سبانخ يعلوها جبن كاشار، تُخبز حتى يتحمّر الجبن وتقرمش الأطراف."
    ],
    "ingredients": [
      [
        "Ispanak",
        "Kaşar"
      ],
      [
        "Spinach",
        "Kaşar cheese"
      ],
      [
        "سبانخ",
        "جبن كاشار"
      ]
    ]
  },
  {
    "id": "potato",
    "theme": "#685124",
    "light": "#efd288",
    "group": "veg",
    "name": [
      "Patatesli kaşarlı pide",
      "Potato and kaşar pide",
      "بيدا بالبطاطس والكاشار"
    ],
    "short": [
      "Patatesli",
      "Potato",
      "بطاطس"
    ],
    "feature": [
      "Yumuşak patates ve eriyen kaşar",
      "Soft potato and melted kaşar",
      "بطاطس طرية وكاشار ذائب"
    ],
    "description": [
      "Yumuşak patates ve eriyen kaşar, açık hamurun çıtır kenarlarıyla buluşur.",
      "Soft potato and melted kaşar in an open pide with crisp edges.",
      "بطاطس طرية وجبن كاشار ذائب فوق بيدا مفتوحة بأطراف مقرمشة."
    ],
    "ingredients": [
      [
        "Patates",
        "Kaşar"
      ],
      [
        "Potato",
        "Kaşar cheese"
      ],
      [
        "بطاطس",
        "جبن كاشار"
      ]
    ]
  },
  {
    "id": "trabzon",
    "theme": "#664222",
    "light": "#f3d18c",
    "group": "cheese",
    "name": [
      "Trabzon peynirlisi",
      "Trabzon cheese pide",
      "بيدا بجبن طرابزون"
    ],
    "short": [
      "Trabzon peynirli",
      "Trabzon cheese",
      "جبن طرابزون"
    ],
    "feature": [
      "Trabzon peynirinin tadı",
      "The flavour of Trabzon cheese",
      "نكهة جبن طرابزون"
    ],
    "description": [
      "Trabzon peynirinin fırında kızardığı, kenarları gevrek bir açık pide.",
      "Trabzon cheese baked until golden in a crisp-edged open pide.",
      "جبن طرابزون محمّر في الفرن فوق بيدا مفتوحة بأطراف مقرمشة."
    ],
    "ingredients": [
      [
        "Trabzon peyniri"
      ],
      [
        "Trabzon cheese"
      ],
      [
        "جبن طرابزون"
      ]
    ]
  }
];

export function getFlavors(language) {
  const index = Math.max(0, languageCodes.indexOf(language));
  return dishes.map(dish => ({
    id: dish.id,
    photo: 'studio/' + dish.id + '.webp',
    theme: dish.theme,
    light: dish.light,
    group: dish.group,
    name: dish.short[index],
    title: dish.name[index],
    feature: dish.feature[index],
    description: dish.description[index],
    ingredients: dish.ingredients[index],
    alt: dish.name[index]
  }));
}
