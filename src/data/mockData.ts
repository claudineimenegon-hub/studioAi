import { TemplateItem, CampaignItem, GalleryItem } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UmJZpUG9fhEDBowyZDjk-w68-a0kD1jClzxKhI9P5BrpsNBRgeKWDzzRX3zYgqNC7o71Pb8bMNtiA5v5zFmFeYr4oMSbUN7fdNL6MQpwx4IZIICjjlKcVn9mXGRnvxelwGvuFW1glubzdxk_Tu7QEFo6KK7p8fgVX6On9-02O39w6tjw5YV_gKPVLkk4WfJmr1SpeHHg60tKo9s0zbe0Fjy--G-W0Gf1J6K4xEuJq0XEIkDY81-zvxeTM',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj1uEJbMvEFB1nzYveop3UMfredCMeOmtWbr0FN293blQgi1Cp8dryH5hESzFJG_qPQUdG1IacabfxI2SU93HtHi7dnOQtCN9uAAjs9x6iyDTT2iBlX4sagRlzKysc6YJBIEyaoVBabV1BYSYoRz1FBUnLlg3Fd5bxz_7w0e7UiY4EE8V3Lon-FKnhuSRwzFqkECg5_RQx2CK0NmPQjiph9_-POFrsTSoapnujT2Yd3rBoAm6dubEW',
  productCutout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy9Zt1R-MUrLY5yVrG6PFCST8UZubsUBagPmQSPhy4j6ByslIRlRKmUyI5iXFevnV6DZ9veKX3P0eWUAkLv4yqh4GIaRbxr6L-afryzOgb2J6EfvdDXHUX98vkbBVjlY3uJ4Fx760okFyNW5byThX9RsBcWSIwlnrZxzbGTvNwm1l-2bkltbIaI-Vc8yyg7k4Sj45OjNOs4KXxD-CoPEKEVSZvAbmg4wNrZRAhnnoGEA7tYrOEhZyN',
  variationA: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBv7-DBc6nK-S77G5IHJgGmTtE0Rs_voTXA9ncuMvQXR9z86ZbMDGYVoN_lj0CcM8JxWWOSZDgjkP_bhgSggXWHlkHnmaqJI_BAq9vark-vKWQwCWuWpJtcYBTbk4RRoMSbeSfITy6fJpmQ_jRK6KcnEhqazquc8IEILMJzDrgJUw6Ksle9AitTg3M0vXBVz7SKxBA9ICsoOyvtZXVRlsHdaHefIJHglilrbVoBmgUUS0cb-y41H3D',
  variationB: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSOv4EYTFGCbcsiOVPJbK38iKoIA5FD8kCNvRXUdM1NSK4QjfCnFsvynNHnbvPUXypmZ61GkYljg3SOs64hdJGVgdfLYCVyczEjOVbcCbF--6uLTa_kTCwVTSDlK8GR1b_-BwjY6d6CfUYJPA7Wn7CLKtitAaUQ3XAwPln16gwewonsaoNMCTZGO7MIHfNrLBRAOpAY6Koe54a4DEzt4cPr2XSIPG-9iwqS3N_maxsq_KpvcBOZPSn',
  videoPreviewCanvas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLU3QcrbWP5Ye0LzYOJ0TP7GiKmpdFJZjrcZAQz2Uuv7ycVNCRhYCiwLml7kyb8U4RADTmFOIIAoSlLHjX85SUIwWeD4vBUf0QSp0Xx2u3sIXHSlKogDZoEIgE97n11C3Bih2T1nOojuqbT0sBnUkdPKVoMs0MAFw6xv0oHqXINL4zIyeId9GhF9m-gTJEIeoVifJnVc34iPQswSgcnu96I9L7sMJTvM0qA9UayTKC4CguXFQJ2aLd',
  galleryFeatured: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeBdgw-NijS5FK_3SLeX3ikw8EyjaSXEXOTAwK1_YAUdwM56jgFyJxLZFTNkrVUjDLkG5LptnosJdVy8z75uhdiBI9g3bW4Ul0yz-sQCM9NC4vPGCqo0lPDiX4N36rHApPqjgkex3XXB-wLgAEwwdYg62xd31DEzESu60GYRF4xx7lR_qs6W3xtXBvucCojYEtaik6rBRETUBMbdHVv04CLb4bbIKCfjAZCBxiMACB7mU_y-CdEuFb',
  galleryVarA: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLw4t6LW7jH4ndzIHTX8alP9FzfPYzAFZxU_p2mf2VHDzrUSt8hCnwbi-3BQqJXlwCmcRukASw1FeVDLfqH1UyPyAC_bgp3zKrbj8GmM_tsZ7aCP4a1tE0mPX1vp-TQqVSEuVJ6nvao5N9DK2kx8oLb_nnlhw9e8_rgYxo69LMhYG0oK5PN2mWd6wCRs7VddbdpCC-FakhkEp00zp_hI8Q27_cCIFNnvI16UOUtBMd-CqfcoUZBJz2',
  galleryVarB: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJj_7zAnMXQ0moqduC-8b9-__h1OQtTNN3v3j5hP3Vb8KF4rSz4JRwyuoE93abForP9E5ygKc53PBTlclWpgx_r-xZ5TXge3LR8WwntpqDx9fKGUyC4AgxnaLWQMhC-mCj7CrL5UV7PQZdZiijiFUPECDweThfPVemVIRPxndqYh1tC4Ll29XQWdaygsZm_cIggfTsEPgSwU5WQGHIB6cmucXG17UOBcFtSxau0dW7zUof4EAmjCIJ',
  mockupPackaging: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAZEu4aMXzyx1ojkSwln9tL3Nf01CusJGxk1eWK_IBzpB1zrH7ynZMXXnBMAfgY7Htn0g5KfN88QDSh2Rtu5JsxvPxU1iWrVOwr2onDdkW21caLaHS0TVd2aUCGnUp05bPsZkczmhgug2FpZzQEH4Aa-Rw7IzeFOC4bczXyS79qk5D038Y_DVWkOQAjsr5u4_3uFEy_LTyh1oWC_F_QBCjH9Q_fynMChtZFXFEv7toz1SYMuHsKroK',
  mockupCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-J7Q9FJL-9I8OmEqtXrLGIIZRpTU6BGejnstFvt3Yih62FVR237AQXlqlDR56hp_-ed58DJRud4z9gkPZKl_Cuiu9WQCVTxAL4d9imFRp1SSAyaU14i4PUFDo1-WwFyDweaLTa_0T92GXza_B1nCPPbhGD2aFOpM4_0UbcaBeJNHruoGFX4KoAu0rbUcxUS64bUdoPIYdORJcDi9RI7DbFD_7oQlKqbTuILOijZPmulXhxn4E-MfY',
  mockupFacade: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh0BH-lvg0Dgc9F0vfxdBJ_JN7unEzceINIDqtPlxYZtGTfppLd2rWFnIIFjdsZKRxNEErA_MlpLPMnbTfYz0A3QtG3BvlD2ikzOkttPkCJV_Z9bqEGVymFdIe1QoIPsdALeaKZqVEM0a0QAYG9trEIi4KpJOfVTEbs6ajqE2uaAYA8X0qHju9SncHnMpyS-X6hSkhYCp9v-eASE4Y5ZGXlvD9_mZRTxPfhB5RKjnIJUBNVVpTM-sL',
};

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'tmpl-1',
    title: 'Perfumaria & Luxo',
    description: 'Reflexos de água, profundidade de campo rasa e caustics cinemáticos.',
    badge: 'Dark Noir',
    tag: 'Macro 85mm',
    uses: '2.4k usos esta semana',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuqmp0aliET-EleI6fME_7SjFax7kplJ0o0bBEDFm7mpFxO4l1Bzsjw-zWGwUuFaLF3iGKQbRVI48_la9JQv4s1rlwCH9oA1M7NN4BdQvf_W8-oM9qfuwjUEE4KLzI1--Gy3wgVaEXGV0_-v1aJbBPgZERtIHzsrUbB9IpR9uybJklbxJgImnICTibnW4M9-Hdb6CTd5xP5WKma2_denN6XjGA4E8tR3dLW54PVS5QB4uYwTgd1Cui',
    category: 'luxury',
    aspectRatio: '9:16',
    prompt: 'Fotografia publicitária comercial de um frasco de perfume de luxo facetado em cristal sobre pedra vulcânica preta molhada, iluminação rim light em magenta e ciano, reflexos dourados cáusticos, profundidade de campo cinematográfica, 8k octanerender.'
  },
  {
    id: 'tmpl-2',
    title: 'Sneakers & Streetwear',
    description: 'Iluminação volumétrica neon, fumaça densa e materiais táteis.',
    badge: 'Cyberpunk',
    tag: 'Volumetric Smoke',
    uses: '3.8k usos esta semana',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXfTUK-unrsy6gWDfU0rZP-IngewaRhioRtVo6s1-6o_m4Urvvh72lLebT8e3Siy8abwdhIdymOtcebVJ7EweNuXaa9MPKjVByHN4qwh56Tgxnp8-cdEp3OixZ44cB6DXK8aT5vb5cWrsz1cTR3BTiKAUYQovMIM4zkPWBp4dbjXrR6lwTJi8kxtK3cPnk4iKR2YH-ZwyfUiCSZNn13RSFuvN2ZZHMl_zzCjMZgjykFj9KD7IkX57O',
    category: 'streetwear',
    aspectRatio: '9:16',
    prompt: 'Futuristic neon cyberpunk high-top sneaker floating in dark volumetric smoke atmosphere, vibrant ultraviolet and electric magenta backlight neon glow, harsh HDR contrast, high-speed shutter luxury streetwear editorial.'
  },
  {
    id: 'tmpl-3',
    title: 'Tech & Gadgets Pro',
    description: 'Composição geométrica elegante, superfícies de vidro fosco e iluminação suave.',
    badge: 'Clean Tech',
    tag: 'Glassmorphism',
    uses: '1.9k usos esta semana',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpWb5WW5Onh22vk2jY0lO1P3VSJXN2QycNnrAHuChx2OEkrwAfA12W2QuYDAmqi5uNrrZI0WW_GZHBvgIgB9hdIr1wtq_hSCQNcxoP5cF-IyjmWgtQz2M6OVV-eZOTklVlkumxOCjr_31fFe1d0VWdwCHlyHFsfC6cSc7xAl1Md9v1RrPqnZYsJe97tyc8jLnekIpvPwmWpqXaA2--pJD3wnfaIeYpYo2RfqNZ08pvRxyUcO6G49XN',
    category: 'tech',
    aspectRatio: '1:1',
    prompt: 'Futuristic smart watch wearable suspended against translucent frosted architectural glass pedestals, studio minimal lighting, slate dark background with subtle lavender gradient glow, clean industrial design luxury commercial 8k render.'
  },
  {
    id: 'tmpl-4',
    title: 'Bebidas & Alimentos',
    description: 'Gotículas hiper-realistas, respingos fluidos congelados em 1/8000s.',
    badge: 'Ultra Macro',
    tag: 'Fluid Splash',
    uses: '4.1k usos esta semana',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuCDSPU96iiicX6g9l3-5I15BQmI9zeLdQ2rtav1hNhKsANAqXOza9teqtn5dO56BW1av4NpXhqiqLHGE-6zKSyBQPVQHjuXGXmPSWcoufOr4Z2j7RgBpKK0TxJL2GtIQFs6MDOx_BR1zQxQlbo5sF5jYBCVZM50FrCzG4chacaJ2GqKbwg-gv4H9srOs3FAcuCWVxLO8XZePVxr_aQKFQSntYsj02VuchsCgdxRqqW9yX1nnsD-t',
    category: 'beverages',
    aspectRatio: '1:1',
    prompt: 'Ultra detailed macro shot of an artisanal dark cocktail glass with condensation drops, explosive liquid splash frozen in mid-air, dynamic ice cubes, dramatic backlighting with deep ruby and amber neon tones, high-speed photography.'
  }
];

export const CAMPAIGNS: CampaignItem[] = [
  {
    id: 'camp-1',
    title: 'Campanha Outono Nike Concept',
    meta: 'Seed #849204 • Aspect 9:16 • Raw DNG',
    tag: 'Renderizado em 4K',
    timeAgo: 'Há 12 min',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqKZHwcCHaav8J_4sgOnNpnvubAsxjkciDNz4q6Ru5xre4tBITzQ5_yKO6N_xtIBR7NjbtRK0QE2IbrCMlp499YAfCaBr6z9VaGZ9m5oCIiORknI0yCVX2f1TK-DxT7Err2m0jaxDavx5efdLqQB3IjCgvblw98IsXMkkGyGdlgaB5ukjjO-b61c6cfXbzsV8MeveY0K6ZrRq8avnlxI4wNqxL1EjEYgf5nPAFiwVtVHDRoUKvhj2g',
    type: 'image',
    seed: '849204',
    aspect: '9:16',
    format: 'Raw DNG'
  },
  {
    id: 'camp-2',
    title: 'Lançamento Smartwatch Aura',
    meta: '15s Reel • ProRes 422 • Audio sync',
    tag: 'Vídeo 60fps',
    timeAgo: 'Há 1h atrás',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB36B31ogANeWwKuh0_1ESOwazsmuH7euYEvCtizGOHHcBD-_muM5VUNlCNQ0pVK2IgeYU2hlpQtp-fMDdngah2lFC5iINf0c_CQaZ6RwFKjOt-Ccb5JvxKg7UwdmDmR0zUO-zkZffNt7d1nsvOuDgEQYTNB50BEIHynFRoCOC4U5CAb295jMFHZohVTJT1iFmwMWPASJgZxQW4po9E4eytSXwaNTjJxQnxqUGLuuo34LG6oRJy4R92',
    type: 'video',
    seed: '194723',
    aspect: '9:16',
    format: 'ProRes 422'
  },
  {
    id: 'camp-3',
    title: 'Vogue Summer Botanicals Spirits',
    meta: 'Print Ad Series • 4 Variações • 300 DPI',
    tag: 'Master 8K HDR',
    timeAgo: 'Ontem',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWRJODU_1jrjl9isr-ISDapNo1LZhuK33wO4MdG2M1DTsragR_W-jN-ULdPhlfnOzskhjpXcza3-F38hU0EPQtbktxzL4-uXQ8eTXxJwp5Cv1FK-ysO9rOe1AohOicfZB52m9VA-74qcutrJ-vwp10XN0_f3gbUQxh0nr95cXtdosmbtLxw5WDcEcz566zJCNLH-Q0ogPfJxT3s2OEYQuYvPIx3bYLSli_5dMzH_mTyX-z-KQFPuda',
    type: 'image',
    seed: '752910',
    aspect: '4:5',
    format: 'TIFF 300 DPI'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Motion Luxe Parfums',
    timeAgo: 'Há 12 min',
    aspectRatio: '9:16',
    duration: '0:10',
    badge: '4K 60fps',
    badgeColor: 'secondary',
    type: 'video',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoJW55U8XEN1KCdl2xr3rlH-xgkNfjvLJKHSs2NP0C8e1fH9bz8aOX6wy4frQGiyaQUnj3hV6zjaZTS23IMF5J3l8MuXvaf7p2uuGXpmK1hpGrTMeAa0IgiN0Z1Iwdg3k9aM1I9z60VfEZlQ3IOg1GDxjg72-keANwVT1ptfBfLTh5LbES1XGli1JaMgANLxsxg4_-c6DYBEOU9aEFAT9tMx3Ynu1xgkMfHn7SN2MRffYq7-d96go1',
    isFavorite: true
  },
  {
    id: 'gal-2',
    title: 'Cyber Optics Feed',
    timeAgo: 'Há 45 min',
    aspectRatio: '1:1',
    badge: 'UHD HDR',
    badgeColor: 'tertiary',
    type: 'image',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAymyxxr3bTV-E6K_0NuW0mVkFw-KAo-C25adD812JdA1zycDYGuok48LUlk_E8RUBlQq-bqhR4QFZTDg9excclqnQIxCX4KZ0_r8YzOIncUZBG97jm9tihFJtlInvstM066xlwqctnTm_BbfWHzDNYEvZppyy_v-6UGPH1_pEIx47Un6FEZnMx38vbJP3kI5Z2VQ9yaO154eJHzrzI1NI3VXF3-AmHjtnT3EGkLUTZ8AD_YMs2dGE',
    isFavorite: true
  },
  {
    id: 'gal-3',
    title: 'Velocity Concept Ad',
    timeAgo: 'Ontem',
    aspectRatio: '16:9',
    duration: '0:30',
    badge: 'ProRes',
    badgeColor: 'secondary',
    type: 'video',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa48Qbp1M_ELu3t4yili7KphSOqa36l27MarfDysXyqNhUDbw7qkZjy6ByithvoWSUiXV7A2ziCjxLQ9najq3ThNqedYJWJeizoF0YB3TVJHgAi6CyOgC3wl2s4IQJe8VR7FDHqFvUswF0yL_-NyT3yHX6uKZxLEl6Nyc1vFgCttrDGDjteb6cvgXIj2SnYNzxl-7Q9s_fQi8xVbzeBJtWuNUQrh0f1ES6y4z_yNtNwvTsBH3uhrKY',
    isFavorite: false
  },
  {
    id: 'gal-4',
    title: 'Prism Glaze Cosmetics',
    timeAgo: 'Há 2 dias',
    aspectRatio: '9:16',
    duration: '0:15',
    badge: '8K Master',
    badgeColor: 'primary',
    type: 'image',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDochcOPsllmJoLEOy0YGP1zM5gwdXTQ-SpR-0wAoGKXGBqABFhbX_u52JGVDp-9XDs3OKzbQDy6sMkhV4bMSmk-TXcfeEubvqnhPN41zLS5ylDaANw_4U7l4wp4rK_JrUO6agv_YRe7R1LTF29sevwZLcvC0oAqrgpify8fUeBAtXUfKqm75F0YizBBBwPk1EIXjn1DXwcFBkZ1OF7fw-2JA4RClr7YFTesnfma16gbe-9MpDkTZ80',
    isFavorite: true
  }
];
