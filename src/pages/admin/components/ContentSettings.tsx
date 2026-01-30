import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { FileText, Home, Users, Phone, TrendingUp, HelpCircle } from "lucide-react";

// Content structure for each page
interface PageContent {
  [sectionKey: string]: {
    [fieldKey: string]: {
      en: string;
      id: string;
      zh: string;
      ru: string;
      fr: string;
      es: string;
    };
  };
}

// Default content values from translations
const defaultContent: Record<string, PageContent> = {
  home: {
    hero: {
      headline: {
        en: "Invest in Bali's Best-Performing Property Market",
        id: "Investasi di Pasar Properti Terbaik di Bali",
        zh: "投资巴厘岛表现最佳的房地产市场",
        ru: "Инвестируйте в самый эффективный рынок недвижимости Бали",
        fr: "Investissez dans le marché immobilier le plus performant de Bali",
        es: "Invierta en el mercado inmobiliario de mejor rendimiento de Bali",
      },
      subtitle: {
        en: "Wahi offers international investors access to high-yield, professionally managed real estate in Southeast Asia's most dynamic tourism destination.",
        id: "Wahi menawarkan akses bagi investor internasional ke properti dengan hasil tinggi dan dikelola secara profesional di destinasi wisata paling dinamis di Asia Tenggara.",
        zh: "Wahi为国际投资者提供进入东南亚最具活力旅游目的地的高收益、专业管理房地产的机会。",
        ru: "Wahi предлагает международным инвесторам доступ к высокодоходной, профессионально управляемой недвижимости в самом динамичном туристическом направлении Юго-Восточной Азии.",
        fr: "Wahi offre aux investisseurs internationaux un accès à l'immobilier à haut rendement et géré professionnellement dans la destination touristique la plus dynamique d'Asie du Sud-Est.",
        es: "Wahi ofrece a los inversores internacionales acceso a bienes raíces de alto rendimiento y gestión profesional en el destino turístico más dinámico del sudeste asiático.",
      },
      buttonPrimary: {
        en: "Book a Consultation",
        id: "Jadwalkan Konsultasi",
        zh: "预约咨询",
        ru: "Записаться на консультацию",
        fr: "Réserver une consultation",
        es: "Reservar una consulta",
      },
      buttonSecondary: {
        en: "Explore Projects",
        id: "Jelajahi Proyek",
        zh: "探索项目",
        ru: "Изучить проекты",
        fr: "Explorer les projets",
        es: "Explorar proyectos",
      },
    },
    invest: {
      title: {
        en: "Invest Beyond Low-Yield Markets",
        id: "Investasi Melampaui Pasar dengan Hasil Rendah",
        zh: "超越低收益市场的投资",
        ru: "Инвестируйте за пределами низкодоходных рынков",
        fr: "Investissez au-delà des marchés à faible rendement",
        es: "Invierta más allá de los mercados de bajo rendimiento",
      },
      paragraph1: {
        en: "Many international investors find that property at home no longer delivers meaningful income. With high prices and net yields often below 3%, residential real estate has become a store of capital rather than a source of growth.",
        id: "Banyak investor internasional menemukan bahwa properti di negara asal tidak lagi memberikan pendapatan yang berarti. Dengan harga tinggi dan hasil bersih sering di bawah 3%, properti residensial telah menjadi penyimpan modal daripada sumber pertumbuhan.",
        zh: "许多国际投资者发现，本国房产不再带来有意义的收入。由于价格高昂，净收益率通常低于3%，住宅房地产已成为资本储存而非增长来源。",
        ru: "Многие международные инвесторы обнаруживают, что недвижимость на родине больше не приносит значимого дохода. При высоких ценах и чистой доходности часто ниже 3% жилая недвижимость стала средством хранения капитала, а не источником роста.",
        fr: "De nombreux investisseurs internationaux constatent que l'immobilier dans leur pays ne génère plus de revenus significatifs. Avec des prix élevés et des rendements nets souvent inférieurs à 3%, l'immobilier résidentiel est devenu un stockage de capital plutôt qu'une source de croissance.",
        es: "Muchos inversores internacionales descubren que las propiedades en su país ya no generan ingresos significativos. Con precios altos y rendimientos netos a menudo por debajo del 3%, los bienes raíces residenciales se han convertido en un almacén de capital en lugar de una fuente de crecimiento.",
      },
      paragraph2: {
        en: "Indonesia — and Bali in particular — offers an alternative. A combination of strong tourism demand, limited quality supply, and significantly lower entry prices creates an opportunity for yields of 8–12% or more.",
        id: "Indonesia — dan Bali khususnya — menawarkan alternatif. Kombinasi permintaan pariwisata yang kuat, pasokan berkualitas yang terbatas, dan harga masuk yang jauh lebih rendah menciptakan peluang untuk hasil 8–12% atau lebih.",
        zh: "印度尼西亚——尤其是巴厘岛——提供了另一种选择。强劲的旅游需求、有限的优质供应和明显较低的入门价格相结合，创造了8-12%或更高收益的机会。",
        ru: "Индонезия — и особенно Бали — предлагает альтернативу. Сочетание высокого туристического спроса, ограниченного качественного предложения и значительно более низких входных цен создает возможности для доходности 8–12% и более.",
        fr: "L'Indonésie — et Bali en particulier — offre une alternative. Une combinaison de forte demande touristique, d'offre de qualité limitée et de prix d'entrée nettement inférieurs crée des opportunités de rendements de 8 à 12% ou plus.",
        es: "Indonesia — y Bali en particular — ofrece una alternativa. Una combinación de fuerte demanda turística, oferta de calidad limitada y precios de entrada significativamente más bajos crea oportunidades de rendimientos del 8-12% o más.",
      },
      paragraph3: {
        en: "Wahi identifies and develops lifestyle properties in locations with year-round occupancy and long-term appreciation potential. Our projects are designed for investors who want income, not just ownership.",
        id: "Wahi mengidentifikasi dan mengembangkan properti gaya hidup di lokasi dengan tingkat hunian sepanjang tahun dan potensi apresiasi jangka panjang. Proyek kami dirancang untuk investor yang menginginkan pendapatan, bukan hanya kepemilikan.",
        zh: "Wahi在全年入住率高且具有长期升值潜力的地点识别和开发生活方式物业。我们的项目专为希望获得收入而非仅仅拥有的投资者设计。",
        ru: "Wahi находит и развивает объекты недвижимости для образа жизни в местах с круглогодичной заполняемостью и потенциалом долгосрочного роста стоимости. Наши проекты созданы для инвесторов, которые хотят получать доход, а не просто владеть.",
        fr: "Wahi identifie et développe des propriétés lifestyle dans des emplacements avec une occupation toute l'année et un potentiel d'appréciation à long terme. Nos projets sont conçus pour les investisseurs qui veulent des revenus, pas seulement la propriété.",
        es: "Wahi identifica y desarrolla propiedades de estilo de vida en ubicaciones con ocupación durante todo el año y potencial de apreciación a largo plazo. Nuestros proyectos están diseñados para inversores que quieren ingresos, no solo propiedad.",
      },
    },
    pillars: {
      pillar1Title: {
        en: "Location",
        id: "Lokasi",
        zh: "位置",
        ru: "Локация",
        fr: "Emplacement",
        es: "Ubicación",
      },
      pillar1Desc: {
        en: "Bali leads Southeast Asia in tourism recovery and lifestyle demand.",
        id: "Bali memimpin Asia Tenggara dalam pemulihan pariwisata dan permintaan gaya hidup.",
        zh: "巴厘岛在旅游业复苏和生活方式需求方面领先东南亚。",
        ru: "Бали лидирует в Юго-Восточной Азии по восстановлению туризма и спросу на образ жизни.",
        fr: "Bali mène l'Asie du Sud-Est en matière de reprise touristique et de demande lifestyle.",
        es: "Bali lidera el sudeste asiático en recuperación turística y demanda de estilo de vida.",
      },
      pillar2Title: {
        en: "Design",
        id: "Desain",
        zh: "设计",
        ru: "Дизайн",
        fr: "Design",
        es: "Diseño",
      },
      pillar2Desc: {
        en: "Thoughtful architecture that commands premium rental rates.",
        id: "Arsitektur yang dipikirkan dengan matang yang dapat memperoleh tarif sewa premium.",
        zh: "精心设计的建筑，可获得高端租金。",
        ru: "Продуманная архитектура, обеспечивающая премиальные арендные ставки.",
        fr: "Une architecture réfléchie qui commande des tarifs de location premium.",
        es: "Arquitectura cuidadosa que obtiene tarifas de alquiler premium.",
      },
      pillar3Title: {
        en: "Structure",
        id: "Struktur",
        zh: "结构",
        ru: "Структура",
        fr: "Structure",
        es: "Estructura",
      },
      pillar3Desc: {
        en: "Clear, legal, and professionally managed investments.",
        id: "Investasi yang jelas, legal, dan dikelola secara profesional.",
        zh: "清晰、合法、专业管理的投资。",
        ru: "Прозрачные, легальные и профессионально управляемые инвестиции.",
        fr: "Des investissements clairs, légaux et gérés professionnellement.",
        es: "Inversiones claras, legales y gestionadas profesionalmente.",
      },
      quote: {
        en: '"We help investors access the returns that their own markets no longer provide."',
        id: '"Kami membantu investor mengakses pengembalian yang pasar mereka sendiri tidak lagi menyediakan."',
        zh: '"我们帮助投资者获得其本国市场不再提供的回报。"',
        ru: '"Мы помогаем инвесторам получить доходность, которую их собственные рынки больше не обеспечивают."',
        fr: '"Nous aidons les investisseurs à accéder aux rendements que leurs propres marchés ne fournissent plus."',
        es: '"Ayudamos a los inversores a acceder a los rendimientos que sus propios mercados ya no proporcionan."',
      },
    },
    whyBali: {
      title: {
        en: "Why Bali?",
        id: "Mengapa Bali?",
        zh: "为什么选择巴厘岛？",
        ru: "Почему Бали?",
        fr: "Pourquoi Bali ?",
        es: "¿Por qué Bali?",
      },
      point1Title: {
        en: "Demand",
        id: "Permintaan",
        zh: "需求",
        ru: "Спрос",
        fr: "Demande",
        es: "Demanda",
      },
      point1Desc: {
        en: "Over 6.3 million international visitors in 2024, with strong growth projected.",
        id: "Lebih dari 6,3 juta pengunjung internasional pada 2024, dengan pertumbuhan kuat yang diproyeksikan.",
        zh: "2024年超过630万国际游客，预计将强劲增长。",
        ru: "Более 6,3 миллиона международных посетителей в 2024 году с прогнозируемым сильным ростом.",
        fr: "Plus de 6,3 millions de visiteurs internationaux en 2024, avec une forte croissance prévue.",
        es: "Más de 6,3 millones de visitantes internacionales en 2024, con un fuerte crecimiento proyectado.",
      },
      point2Title: {
        en: "Supply",
        id: "Pasokan",
        zh: "供应",
        ru: "Предложение",
        fr: "Offre",
        es: "Oferta",
      },
      point2Desc: {
        en: "Limited land and strict building codes protect property values.",
        id: "Lahan terbatas dan kode bangunan yang ketat melindungi nilai properti.",
        zh: "有限的土地和严格的建筑规范保护房产价值。",
        ru: "Ограниченность земли и строгие строительные нормы защищают стоимость недвижимости.",
        fr: "Terrain limité et codes de construction stricts protègent les valeurs immobilières.",
        es: "Terreno limitado y códigos de construcción estrictos protegen los valores inmobiliarios.",
      },
      point3Title: {
        en: "Returns",
        id: "Pengembalian",
        zh: "回报",
        ru: "Доходность",
        fr: "Rendements",
        es: "Rendimientos",
      },
      point3Desc: {
        en: "Net rental yields of 8–12% are achievable in prime locations.",
        id: "Hasil sewa bersih 8–12% dapat dicapai di lokasi utama.",
        zh: "在优质地段可实现8-12%的净租金收益。",
        ru: "Чистая арендная доходность 8–12% достижима в премиальных локациях.",
        fr: "Des rendements locatifs nets de 8 à 12% sont réalisables dans les emplacements premium.",
        es: "Rendimientos de alquiler neto del 8-12% son alcanzables en ubicaciones premium.",
      },
    },
    cta: {
      title: {
        en: "Ready to Start?",
        id: "Siap Memulai?",
        zh: "准备开始了吗？",
        ru: "Готовы начать?",
        fr: "Prêt à commencer ?",
        es: "¿Listo para empezar?",
      },
      description: {
        en: "Book a no-obligation consultation with a local Wahi representative.",
        id: "Jadwalkan konsultasi tanpa kewajiban dengan perwakilan Wahi lokal.",
        zh: "预约与当地Wahi代表的免费咨询。",
        ru: "Запишитесь на бесплатную консультацию с местным представителем Wahi.",
        fr: "Réservez une consultation sans engagement avec un représentant local Wahi.",
        es: "Reserve una consulta sin compromiso con un representante local de Wahi.",
      },
      buttonText: {
        en: "Book a Consultation",
        id: "Jadwalkan Konsultasi",
        zh: "预约咨询",
        ru: "Записаться на консультацию",
        fr: "Réserver une consultation",
        es: "Reservar una consulta",
      },
    },
  },
  about: {
    hero: {
      title: {
        en: "Property Development with Clarity, Not Complexity",
        id: "Pengembangan Properti dengan Kejelasan, Bukan Kerumitan",
        zh: "清晰而非复杂的房产开发",
        ru: "Девелопмент недвижимости с ясностью, а не сложностью",
        fr: "Développement immobilier avec clarté, pas complexité",
        es: "Desarrollo inmobiliario con claridad, no complejidad",
      },
      description: {
        en: "Wahi is a boutique property development and investment firm based in Bali, Indonesia. We work with international investors who want clear, transparent access to Southeast Asian real estate — without hidden structures, unclear contracts, or language barriers.",
        id: "Wahi adalah perusahaan pengembangan dan investasi properti butik yang berbasis di Bali, Indonesia. Kami bekerja dengan investor internasional yang menginginkan akses yang jelas dan transparan ke properti Asia Tenggara — tanpa struktur tersembunyi, kontrak yang tidak jelas, atau hambatan bahasa.",
        zh: "Wahi是一家总部位于印度尼西亚巴厘岛的精品房地产开发和投资公司。我们与希望清晰透明地进入东南亚房地产市场的国际投资者合作——没有隐藏结构、不明确的合同或语言障碍。",
        ru: "Wahi — это бутик-компания по девелопменту и инвестициям в недвижимость, базирующаяся на Бали, Индонезия. Мы работаем с международными инвесторами, которые хотят получить прозрачный доступ к недвижимости Юго-Восточной Азии — без скрытых структур, неясных контрактов или языковых барьеров.",
        fr: "Wahi est une société boutique de développement et d'investissement immobilier basée à Bali, Indonésie. Nous travaillons avec des investisseurs internationaux qui veulent un accès clair et transparent à l'immobilier d'Asie du Sud-Est — sans structures cachées, contrats peu clairs ou barrières linguistiques.",
        es: "Wahi es una empresa boutique de desarrollo e inversión inmobiliaria con sede en Bali, Indonesia. Trabajamos con inversores internacionales que desean un acceso claro y transparente a los bienes raíces del sudeste asiático, sin estructuras ocultas, contratos poco claros o barreras idiomáticas.",
      },
    },
    story: {
      title: {
        en: "Who We Are",
        id: "Siapa Kami",
        zh: "我们是谁",
        ru: "Кто мы",
        fr: "Qui sommes-nous",
        es: "Quiénes somos",
      },
      content: {
        en: "Wahi was founded with a single goal: to make Indonesian property investment accessible, understandable, and rewarding for international investors. Our team combines deep local expertise with a global perspective.",
        id: "Wahi didirikan dengan satu tujuan: membuat investasi properti Indonesia dapat diakses, dipahami, dan menguntungkan bagi investor internasional. Tim kami menggabungkan keahlian lokal yang mendalam dengan perspektif global.",
        zh: "Wahi成立的唯一目标是：让国际投资者能够接触、理解并从印度尼西亚房产投资中获益。我们的团队将深厚的本地专业知识与全球视野相结合。",
        ru: "Wahi была основана с одной целью: сделать инвестиции в индонезийскую недвижимость доступными, понятными и выгодными для международных инвесторов. Наша команда сочетает глубокую местную экспертизу с глобальной перспективой.",
        fr: "Wahi a été fondée avec un seul objectif : rendre l'investissement immobilier indonésien accessible, compréhensible et rentable pour les investisseurs internationaux. Notre équipe combine une expertise locale approfondie avec une perspective mondiale.",
        es: "Wahi fue fundada con un solo objetivo: hacer que la inversión inmobiliaria indonesia sea accesible, comprensible y rentable para los inversores internacionales. Nuestro equipo combina una profunda experiencia local con una perspectiva global.",
      },
    },
    mission: {
      title: {
        en: "What We Do",
        id: "Apa yang Kami Lakukan",
        zh: "我们的业务",
        ru: "Что мы делаем",
        fr: "Ce que nous faisons",
        es: "Lo que hacemos",
      },
      content: {
        en: "Wahi develops and curates real estate projects in Bali and selected Indonesian locations. We focus on lifestyle properties in high-demand areas, hospitality-grade design, clear ownership structures for foreign buyers, and professional rental management.",
        id: "Wahi mengembangkan dan mengkurasi proyek properti di Bali dan lokasi terpilih di Indonesia. Kami fokus pada properti gaya hidup di area permintaan tinggi, desain kelas perhotelan, struktur kepemilikan yang jelas untuk pembeli asing, dan manajemen sewa profesional.",
        zh: "Wahi在巴厘岛和印度尼西亚精选地点开发和策划房地产项目。我们专注于高需求地区的生活方式物业、酒店级设计、为外国买家提供清晰的所有权结构以及专业的租赁管理。",
        ru: "Wahi разрабатывает и курирует проекты недвижимости на Бали и в отдельных регионах Индонезии. Мы фокусируемся на недвижимости для образа жизни в востребованных районах, дизайне гостиничного уровня, четких структурах собственности для иностранных покупателей и профессиональном управлении арендой.",
        fr: "Wahi développe et sélectionne des projets immobiliers à Bali et dans des emplacements indonésiens choisis. Nous nous concentrons sur les propriétés lifestyle dans les zones à forte demande, le design de qualité hôtelière, les structures de propriété claires pour les acheteurs étrangers et la gestion locative professionnelle.",
        es: "Wahi desarrolla y selecciona proyectos inmobiliarios en Bali y ubicaciones indonesias seleccionadas. Nos enfocamos en propiedades de estilo de vida en áreas de alta demanda, diseño de grado hotelero, estructuras de propiedad claras para compradores extranjeros y gestión de alquiler profesional.",
      },
    },
  },
  projects: {
    hero: {
      title: {
        en: "Real Projects. Real Demand. Real Returns.",
        id: "Proyek Nyata. Permintaan Nyata. Pengembalian Nyata.",
        zh: "真实项目。真实需求。真实回报。",
        ru: "Реальные проекты. Реальный спрос. Реальная доходность.",
        fr: "Projets réels. Demande réelle. Rendements réels.",
        es: "Proyectos reales. Demanda real. Rendimientos reales.",
      },
      description: {
        en: "Wahi develops high-quality properties in locations with strong tourism fundamentals and year-round occupancy potential. Each project is designed, built, and structured to perform as a long-term investment.",
        id: "Wahi mengembangkan properti berkualitas tinggi di lokasi dengan fundamental pariwisata yang kuat dan potensi hunian sepanjang tahun. Setiap proyek dirancang, dibangun, dan distruktur untuk berkinerja sebagai investasi jangka panjang.",
        zh: "Wahi在旅游基础强劲、全年入住率高的地点开发优质物业。每个项目都经过设计、建造和结构化，以作为长期投资发挥作用。",
        ru: "Wahi развивает высококачественную недвижимость в местах с сильными туристическими фундаментальными показателями и потенциалом круглогодичной заполняемости. Каждый проект спроектирован, построен и структурирован для работы в качестве долгосрочной инвестиции.",
        fr: "Wahi développe des propriétés de haute qualité dans des emplacements avec de solides fondamentaux touristiques et un potentiel d'occupation toute l'année. Chaque projet est conçu, construit et structuré pour performer comme un investissement à long terme.",
        es: "Wahi desarrolla propiedades de alta calidad en ubicaciones con sólidos fundamentos turísticos y potencial de ocupación durante todo el año. Cada proyecto está diseñado, construido y estructurado para funcionar como una inversión a largo plazo.",
      },
    },
    cta: {
      title: {
        en: "Not Sure Which Project Fits You Best?",
        id: "Tidak Yakin Proyek Mana yang Paling Cocok?",
        zh: "不确定哪个项目最适合您？",
        ru: "Не уверены, какой проект подходит вам лучше всего?",
        fr: "Vous ne savez pas quel projet vous convient le mieux ?",
        es: "¿No está seguro de qué proyecto le conviene más?",
      },
      description: {
        en: "Speak with a Wahi advisor to compare options and opportunities.",
        id: "Bicaralah dengan penasihat Wahi untuk membandingkan opsi dan peluang.",
        zh: "与Wahi顾问交流，比较各种选择和机会。",
        ru: "Поговорите с консультантом Wahi, чтобы сравнить варианты и возможности.",
        fr: "Parlez avec un conseiller Wahi pour comparer les options et opportunités.",
        es: "Hable con un asesor de Wahi para comparar opciones y oportunidades.",
      },
      buttonText: {
        en: "Schedule a Consultation",
        id: "Jadwalkan Konsultasi",
        zh: "预约咨询",
        ru: "Записаться на консультацию",
        fr: "Planifier une consultation",
        es: "Programar una consulta",
      },
    },
  },
  whyInvest: {
    hero: {
      title: {
        en: "Why Invest in Indonesia?",
        id: "Mengapa Berinvestasi di Indonesia?",
        zh: "为什么投资印度尼西亚？",
        ru: "Почему инвестировать в Индонезию?",
        fr: "Pourquoi investir en Indonésie ?",
        es: "¿Por qué invertir en Indonesia?",
      },
      description: {
        en: "For investors from [COUNTRY], property markets at home often deliver modest returns. Indonesia offers a different profile: a fast-growing economy, globally recognized destinations, and year-round tourism demand that supports significantly higher rental yields.",
        id: "Bagi investor dari [NEGARA], pasar properti di negara asal sering memberikan pengembalian yang sederhana. Indonesia menawarkan profil yang berbeda: ekonomi yang berkembang pesat, destinasi yang diakui secara global, dan permintaan pariwisata sepanjang tahun yang mendukung hasil sewa yang jauh lebih tinggi.",
        zh: "对于来自[国家]的投资者，本国房地产市场通常回报平平。印度尼西亚提供了不同的格局：快速增长的经济、全球知名的目的地，以及支持更高租金收益的全年旅游需求。",
        ru: "Для инвесторов из [COUNTRY] рынки недвижимости на родине часто приносят скромную доходность. Индонезия предлагает другой профиль: быстрорастущую экономику, всемирно известные направления и круглогодичный туристический спрос, который обеспечивает значительно более высокую арендную доходность.",
        fr: "Pour les investisseurs de [PAYS], les marchés immobiliers nationaux offrent souvent des rendements modestes. L'Indonésie offre un profil différent : une économie en croissance rapide, des destinations reconnues mondialement et une demande touristique toute l'année qui soutient des rendements locatifs nettement plus élevés.",
        es: "Para inversores de [PAÍS], los mercados inmobiliarios nacionales a menudo ofrecen rendimientos modestos. Indonesia ofrece un perfil diferente: una economía de rápido crecimiento, destinos reconocidos mundialmente y demanda turística durante todo el año que respalda rendimientos de alquiler significativamente más altos.",
      },
    },
    stats: {
      stat1Value: {
        en: "6.3M+",
        id: "6,3 Juta+",
        zh: "630万+",
        ru: "6,3 млн+",
        fr: "6,3M+",
        es: "6,3M+",
      },
      stat1Label: {
        en: "International visitors to Bali in 2024",
        id: "Pengunjung internasional ke Bali pada 2024",
        zh: "2024年巴厘岛国际游客",
        ru: "Международных посетителей Бали в 2024",
        fr: "Visiteurs internationaux à Bali en 2024",
        es: "Visitantes internacionales a Bali en 2024",
      },
      stat2Value: {
        en: "8-12%",
        id: "8-12%",
        zh: "8-12%",
        ru: "8-12%",
        fr: "8-12%",
        es: "8-12%",
      },
      stat2Label: {
        en: "Net rental yields achievable",
        id: "Hasil sewa bersih yang dapat dicapai",
        zh: "可实现的净租金收益",
        ru: "Достижимая чистая арендная доходность",
        fr: "Rendements locatifs nets réalisables",
        es: "Rendimientos de alquiler neto alcanzables",
      },
      stat3Value: {
        en: "5%+",
        id: "5%+",
        zh: "5%+",
        ru: "5%+",
        fr: "5%+",
        es: "5%+",
      },
      stat3Label: {
        en: "Annual GDP growth",
        id: "Pertumbuhan PDB tahunan",
        zh: "年度GDP增长",
        ru: "Ежегодный рост ВВП",
        fr: "Croissance annuelle du PIB",
        es: "Crecimiento anual del PIB",
      },
    },
  },
  howItWorks: {
    hero: {
      title: {
        en: "Buying Property in Bali – Clear, Legal, and Structured",
        id: "Membeli Properti di Bali – Jelas, Legal, dan Terstruktur",
        zh: "在巴厘岛购买房产——清晰、合法、结构化",
        ru: "Покупка недвижимости на Бали — ясно, легально, структурированно",
        fr: "Acheter une propriété à Bali — Clair, légal et structuré",
        es: "Comprar propiedad en Bali — Claro, legal y estructurado",
      },
      description: {
        en: "Investing in Indonesian real estate is straightforward when it is approached with the right structure and professional guidance. This page explains how foreign investors purchase, own, and earn income from property developed by Wahi.",
        id: "Berinvestasi di properti Indonesia adalah hal yang mudah jika didekati dengan struktur yang tepat dan bimbingan profesional. Halaman ini menjelaskan bagaimana investor asing membeli, memiliki, dan mendapatkan penghasilan dari properti yang dikembangkan oleh Wahi.",
        zh: "在正确的结构和专业指导下，投资印度尼西亚房地产是简单明了的。本页解释外国投资者如何购买、拥有Wahi开发的房产并从中获得收入。",
        ru: "Инвестирование в индонезийскую недвижимость просто, когда к нему подходят с правильной структурой и профессиональным руководством. Эта страница объясняет, как иностранные инвесторы покупают, владеют и получают доход от недвижимости, разработанной Wahi.",
        fr: "Investir dans l'immobilier indonésien est simple lorsqu'il est abordé avec la bonne structure et des conseils professionnels. Cette page explique comment les investisseurs étrangers achètent, possèdent et tirent des revenus des propriétés développées par Wahi.",
        es: "Invertir en bienes raíces indonesios es sencillo cuando se aborda con la estructura correcta y orientación profesional. Esta página explica cómo los inversores extranjeros compran, poseen y obtienen ingresos de propiedades desarrolladas por Wahi.",
      },
    },
    steps: {
      step1Title: {
        en: "Initial Consultation",
        id: "Konsultasi Awal",
        zh: "初步咨询",
        ru: "Первичная консультация",
        fr: "Consultation initiale",
        es: "Consulta inicial",
      },
      step1Desc: {
        en: "Discussion of your objectives, budget, and preferred project.",
        id: "Diskusi tentang tujuan, anggaran, dan proyek pilihan Anda.",
        zh: "讨论您的目标、预算和首选项目。",
        ru: "Обсуждение ваших целей, бюджета и предпочтительного проекта.",
        fr: "Discussion de vos objectifs, budget et projet préféré.",
        es: "Discusión de sus objetivos, presupuesto y proyecto preferido.",
      },
      step2Title: {
        en: "Project Selection",
        id: "Pemilihan Proyek",
        zh: "项目选择",
        ru: "Выбор проекта",
        fr: "Sélection du projet",
        es: "Selección del proyecto",
      },
      step2Desc: {
        en: "Review available units, pricing, and expected timelines.",
        id: "Tinjau unit yang tersedia, harga, dan jadwal yang diharapkan.",
        zh: "审查可用单位、定价和预期时间表。",
        ru: "Обзор доступных юнитов, ценообразования и ожидаемых сроков.",
        fr: "Examen des unités disponibles, prix et calendriers prévus.",
        es: "Revisión de unidades disponibles, precios y cronogramas esperados.",
      },
      step3Title: {
        en: "Reservation & Documentation",
        id: "Reservasi & Dokumentasi",
        zh: "预订和文档",
        ru: "Бронирование и документация",
        fr: "Réservation et documentation",
        es: "Reserva y documentación",
      },
      step3Desc: {
        en: "A small booking deposit secures the chosen unit. Formal sales agreement and leasehold contract prepared.",
        id: "Deposit pemesanan kecil mengamankan unit yang dipilih. Perjanjian penjualan formal dan kontrak sewa guna usaha disiapkan.",
        zh: "少量预订押金可确保所选单位。准备正式销售协议和租赁合同。",
        ru: "Небольшой бронировочный депозит закрепляет выбранный юнит. Подготавливается официальный договор купли-продажи и арендный контракт.",
        fr: "Un petit acompte de réservation sécurise l'unité choisie. Contrat de vente formel et contrat de bail préparés.",
        es: "Un pequeño depósito de reserva asegura la unidad elegida. Se prepara contrato de venta formal y contrato de arrendamiento.",
      },
      step4Title: {
        en: "Handover & Rental",
        id: "Serah Terima & Sewa",
        zh: "交接和租赁",
        ru: "Передача и аренда",
        fr: "Remise et location",
        es: "Entrega y alquiler",
      },
      step4Desc: {
        en: "Unit completion, furnishing, final documentation, and property management setup.",
        id: "Penyelesaian unit, perabotan, dokumentasi akhir, dan pengaturan manajemen properti.",
        zh: "单位完工、装修、最终文件和物业管理设置。",
        ru: "Завершение юнита, меблировка, финальная документация и настройка управления недвижимостью.",
        fr: "Achèvement de l'unité, ameublement, documentation finale et configuration de la gestion immobilière.",
        es: "Finalización de la unidad, amueblamiento, documentación final y configuración de gestión de propiedad.",
      },
    },
  },
  contact: {
    hero: {
      title: {
        en: "Let's Talk",
        id: "Mari Bicara",
        zh: "联系我们",
        ru: "Давайте поговорим",
        fr: "Parlons-en",
        es: "Hablemos",
      },
      description: {
        en: "Whether you're ready to explore specific projects or simply want to understand how Wahi works, we're happy to speak with you. There's no obligation — just a straightforward conversation about your goals and what's possible.",
        id: "Baik Anda siap untuk menjelajahi proyek tertentu atau hanya ingin memahami cara kerja Wahi, kami senang berbicara dengan Anda. Tidak ada kewajiban — hanya percakapan langsung tentang tujuan Anda dan apa yang mungkin.",
        zh: "无论您是准备探索具体项目还是只想了解Wahi的运作方式，我们都很乐意与您交流。没有任何义务——只是关于您的目标和可能性的直接对话。",
        ru: "Готовы ли вы изучать конкретные проекты или просто хотите понять, как работает Wahi, мы рады поговорить с вами. Никаких обязательств — просто прямой разговор о ваших целях и возможностях.",
        fr: "Que vous soyez prêt à explorer des projets spécifiques ou que vous vouliez simplement comprendre comment fonctionne Wahi, nous sommes heureux de parler avec vous. Aucune obligation — juste une conversation directe sur vos objectifs et ce qui est possible.",
        es: "Ya sea que esté listo para explorar proyectos específicos o simplemente quiera entender cómo funciona Wahi, estaremos encantados de hablar con usted. Sin compromiso — solo una conversación directa sobre sus objetivos y lo que es posible.",
      },
    },
    form: {
      formTitle: {
        en: "Send Us a Message",
        id: "Kirim Pesan kepada Kami",
        zh: "给我们留言",
        ru: "Отправьте нам сообщение",
        fr: "Envoyez-nous un message",
        es: "Envíenos un mensaje",
      },
      formDescription: {
        en: "Fill out the form below and a Wahi representative will be in touch within 24 hours.",
        id: "Isi formulir di bawah ini dan perwakilan Wahi akan menghubungi Anda dalam 24 jam.",
        zh: "填写以下表格，Wahi代表将在24小时内与您联系。",
        ru: "Заполните форму ниже, и представитель Wahi свяжется с вами в течение 24 часов.",
        fr: "Remplissez le formulaire ci-dessous et un représentant Wahi vous contactera dans les 24 heures.",
        es: "Complete el formulario a continuación y un representante de Wahi se pondrá en contacto dentro de 24 horas.",
      },
    },
  },
};

// Define page sections structure
const pageStructure: Record<string, { 
  icon: React.ReactNode; 
  label: string; 
  sections: { 
    key: string; 
    label: string; 
    fields: { key: string; label: string; type: "input" | "textarea" }[] 
  }[] 
}> = {
  home: {
    icon: <Home className="h-4 w-4" />,
    label: "Homepage",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "headline", label: "Headline", type: "input" },
          { key: "subtitle", label: "Subtitle/Description", type: "textarea" },
          { key: "buttonPrimary", label: "Primary Button Text", type: "input" },
          { key: "buttonSecondary", label: "Secondary Button Text", type: "input" },
        ],
      },
      {
        key: "invest",
        label: "Invest Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
          { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
          { key: "paragraph3", label: "Paragraph 3", type: "textarea" },
        ],
      },
      {
        key: "pillars",
        label: "Three Pillars Section",
        fields: [
          { key: "pillar1Title", label: "Pillar 1 Title", type: "input" },
          { key: "pillar1Desc", label: "Pillar 1 Description", type: "textarea" },
          { key: "pillar2Title", label: "Pillar 2 Title", type: "input" },
          { key: "pillar2Desc", label: "Pillar 2 Description", type: "textarea" },
          { key: "pillar3Title", label: "Pillar 3 Title", type: "input" },
          { key: "pillar3Desc", label: "Pillar 3 Description", type: "textarea" },
          { key: "quote", label: "Bottom Quote", type: "textarea" },
        ],
      },
      {
        key: "whyBali",
        label: "Why Bali Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "point1Title", label: "Point 1 Title", type: "input" },
          { key: "point1Desc", label: "Point 1 Description", type: "textarea" },
          { key: "point2Title", label: "Point 2 Title", type: "input" },
          { key: "point2Desc", label: "Point 2 Description", type: "textarea" },
          { key: "point3Title", label: "Point 3 Title", type: "input" },
          { key: "point3Desc", label: "Point 3 Description", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "CTA Section",
        fields: [
          { key: "title", label: "Title", type: "input" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "buttonText", label: "Button Text", type: "input" },
        ],
      },
    ],
  },
  about: {
    icon: <Users className="h-4 w-4" />,
    label: "About",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "story",
        label: "Our Story Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "content", label: "Content", type: "textarea" },
        ],
      },
      {
        key: "mission",
        label: "Mission Section",
        fields: [
          { key: "title", label: "Section Title", type: "input" },
          { key: "content", label: "Content", type: "textarea" },
        ],
      },
    ],
  },
  projects: {
    icon: <FileText className="h-4 w-4" />,
    label: "Projects",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "CTA Section",
        fields: [
          { key: "title", label: "Title", type: "input" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "buttonText", label: "Button Text", type: "input" },
        ],
      },
    ],
  },
  whyInvest: {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "Why Invest",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "stats",
        label: "Statistics Section",
        fields: [
          { key: "stat1Value", label: "Stat 1 Value", type: "input" },
          { key: "stat1Label", label: "Stat 1 Label", type: "input" },
          { key: "stat2Value", label: "Stat 2 Value", type: "input" },
          { key: "stat2Label", label: "Stat 2 Label", type: "input" },
          { key: "stat3Value", label: "Stat 3 Value", type: "input" },
          { key: "stat3Label", label: "Stat 3 Label", type: "input" },
        ],
      },
    ],
  },
  howItWorks: {
    icon: <HelpCircle className="h-4 w-4" />,
    label: "How It Works",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "steps",
        label: "Steps Section",
        fields: [
          { key: "step1Title", label: "Step 1 Title", type: "input" },
          { key: "step1Desc", label: "Step 1 Description", type: "textarea" },
          { key: "step2Title", label: "Step 2 Title", type: "input" },
          { key: "step2Desc", label: "Step 2 Description", type: "textarea" },
          { key: "step3Title", label: "Step 3 Title", type: "input" },
          { key: "step3Desc", label: "Step 3 Description", type: "textarea" },
          { key: "step4Title", label: "Step 4 Title", type: "input" },
          { key: "step4Desc", label: "Step 4 Description", type: "textarea" },
        ],
      },
    ],
  },
  contact: {
    icon: <Phone className="h-4 w-4" />,
    label: "Contact",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "title", label: "Page Title", type: "input" },
          { key: "description", label: "Page Description", type: "textarea" },
        ],
      },
      {
        key: "form",
        label: "Form Section",
        fields: [
          { key: "formTitle", label: "Form Title", type: "input" },
          { key: "formDescription", label: "Form Description", type: "textarea" },
        ],
      },
    ],
  },
};

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "zh", label: "Chinese" },
  { code: "ru", label: "Russian" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
] as const;

// Deep merge function to merge saved content with defaults
const mergeWithDefaults = (saved: Record<string, PageContent>, defaults: Record<string, PageContent>): Record<string, PageContent> => {
  const result: Record<string, PageContent> = JSON.parse(JSON.stringify(defaults));
  
  for (const pageKey of Object.keys(saved)) {
    if (!result[pageKey]) {
      result[pageKey] = saved[pageKey];
      continue;
    }
    
    for (const sectionKey of Object.keys(saved[pageKey])) {
      if (!result[pageKey][sectionKey]) {
        result[pageKey][sectionKey] = saved[pageKey][sectionKey];
        continue;
      }
      
      for (const fieldKey of Object.keys(saved[pageKey][sectionKey])) {
        if (!result[pageKey][sectionKey][fieldKey]) {
          result[pageKey][sectionKey][fieldKey] = saved[pageKey][sectionKey][fieldKey];
        } else {
          // Merge languages
          result[pageKey][sectionKey][fieldKey] = {
            ...result[pageKey][sectionKey][fieldKey],
            ...saved[pageKey][sectionKey][fieldKey],
          };
        }
      }
    }
  }
  
  return result;
};

const ContentSettings = () => {
  const [content, setContent] = useState<Record<string, PageContent>>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [activeLang, setActiveLang] = useState<"en" | "id" | "zh" | "ru" | "fr" | "es">("en");

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get-page-section", pageName: "all_content", sectionKey: "pages" }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch content");

      const data = await response.json();
      if (data.content && Object.keys(data.content).length > 0) {
        // Merge saved content with defaults
        setContent(mergeWithDefaults(data.content, defaultContent));
      } else {
        // Use defaults if no saved content
        setContent(defaultContent);
      }
    } catch (error: any) {
      console.error("Error fetching content:", error);
      // Use defaults on error
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (
    page: string,
    section: string,
    field: string,
    lang: "en" | "id" | "zh" | "ru" | "fr" | "es",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [section]: {
          ...prev[page]?.[section],
          [field]: {
            ...prev[page]?.[section]?.[field],
            [lang]: value,
          },
        },
      },
    }));
  };

  const getFieldValue = (page: string, section: string, field: string, lang: "en" | "id" | "zh" | "ru" | "fr" | "es"): string => {
    return content[page]?.[section]?.[field]?.[lang] || "";
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update-page-section",
            token,
            pageName: "all_content",
            sectionKey: "pages",
            content,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save content");
      }

      toast.success("Content settings saved!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading content settings...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Content Settings</CardTitle>
          <CardDescription>
            Edit text content for all pages in multiple languages. Changes will reflect on the website after saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Language Selector */}
          <div className="mb-6">
            <Label className="mb-2 block">Language</Label>
            <Tabs value={activeLang} onValueChange={(v) => setActiveLang(v as "en" | "id" | "zh" | "ru" | "fr" | "es")}>
              <TabsList>
                {languages.map((lang) => (
                  <TabsTrigger key={lang.code} value={lang.code}>
                    {lang.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Page Selector */}
          <Tabs value={activePage} onValueChange={setActivePage} className="space-y-4">
            <TabsList className="flex-wrap h-auto">
              {Object.entries(pageStructure).map(([key, page]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  {page.icon}
                  {page.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(pageStructure).map(([pageKey, page]) => (
              <TabsContent key={pageKey} value={pageKey} className="space-y-4">
                <Accordion type="multiple" defaultValue={page.sections.map((s) => s.key)} className="space-y-2">
                  {page.sections.map((section) => (
                    <AccordionItem key={section.key} value={section.key} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-medium">{section.label}</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2 pb-4">
                        {section.fields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <Label htmlFor={`${pageKey}-${section.key}-${field.key}-${activeLang}`}>
                              {field.label}
                            </Label>
                            {field.type === "input" ? (
                              <Input
                                id={`${pageKey}-${section.key}-${field.key}-${activeLang}`}
                                value={getFieldValue(pageKey, section.key, field.key, activeLang)}
                                onChange={(e) =>
                                  updateField(pageKey, section.key, field.key, activeLang, e.target.value)
                                }
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            ) : (
                              <Textarea
                                id={`${pageKey}-${section.key}-${field.key}-${activeLang}`}
                                value={getFieldValue(pageKey, section.key, field.key, activeLang)}
                                onChange={(e) =>
                                  updateField(pageKey, section.key, field.key, activeLang, e.target.value)
                                }
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                rows={3}
                              />
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} disabled={saving} size="lg">
              {saving ? "Saving..." : "Save All Content"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentSettings;
