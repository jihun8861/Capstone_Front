const plantsData = [
  {
    name: "알로카시아 프라이덱",
    scientificName: "Alocasia micholitziana 'Frydek'",
    attributes: [
      "빛이 적어도 되는",
      "둥근모양",
      "하트모양",
      "길쭉한",
      "무늬가 있는",
    ],
    description: `알로카시아 프라이덱은 벨벳 같은 질감의 짙은 녹색 잎과 흰색 잎맥이 돋보이는 매력적인 아열대 식물입니다. 
    밝은 간접광, 따뜻한 온도, 촉촉한 습도를 좋아하며 실내에서 포인트가 되는 존재감을 가집니다. 환경 조건이 맞지 않으면 관리가 까다롭지만, 독특한 아름다움으로 인테리어에 생기를 더합니다.`,
    waterFrequency: ["평균 주 1~2회", "흙 표면부터 3cm까지 마르면듬뿍 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반양지", "하루 2~3시간 정도의 은은한 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["70%이상", "주변 공기를 촉촉하게 관리해주세요"], // 습도 [최소, 최대]
    temperature: [18, 29], // 온도 [최소, 최대]
  },
  {
    name: "산세베리아 슈퍼바",
    scientificName: "Sansevieria Trifasciata ‘Futura Superba’",
    attributes: ["공기정화", "실내식물", "강한 식물", "낮은 물 요구량"],
    description: `산세베리아 슈퍼바는 잎 테두리의 노란 무늬가 예쁜 식물이에요. 
        산세베리아는 밤에 산소를 내어주고 이산화탄소를 
        흡수해 밤에 공기정화 능력이 아주 뛰어난 식물이랍니다. 
        산세베리아는 빛이 적은 곳에서도 잘 자라고 물을 자주 주지 않아도 
        되어 초보가드너도 어려움 없이 키울 수 있는 식물이에요. 
        식물에게 독성이 있으니 반려동물과 어린아이가 있는 경우에는 섭취하지 않도록 주의해 주세요.`,
    waterFrequency: ["평균 월 1회 이하", "단단한 잎이 말랑말랑해지면 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반음지", "하루 2~3시간 정도의 은은한 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["40~70%", "주변 공기가 너무 건조해지지 않도록 관리해주세요"], // 습도 [최소, 최대]
    temperature: [18, 30], // 온도 [최소, 최대]
  },
  {
    name: "목 마가렛",
    scientificName: "Argyranthemum frutescens",
    attributes: ["꽃을 감상하는", "실외식물", "햇빛을 좋아하는"],
    description: `목 마가렛은 밝고 화사한 꽃을 피우는 식물로, 
        정원이나 베란다에서 키우기 좋습니다. 
        햇빛을 좋아하며 물을 자주 주어야 건강하게 자랍니다.`,
    waterFrequency: ["평균 주 2~3회", "흙이 마르면 듬뿍 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["양지", "하루 4~6시간 이상의 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["50~70%", "주변 공기를 촉촉하게 관리해주세요"], // 습도 [최소, 최대]
    temperature: [15, 25], // 온도 [최소, 최대]
  },
  {
    name: "보라 사랑초",
    scientificName: "Oxalis triangularis",
    attributes: ["꽃을 감상하는", "실내식물", "빛이 적어도 되는"],
    description: `보라 사랑초는 보라색 잎과 작은 꽃이 매력적인 식물로, 
        실내에서 키우기 좋습니다. 
        빛이 적은 곳에서도 잘 자라며, 물을 자주 주어야 합니다.`,
    waterFrequency: ["평균 주 1~2회", "흙이 마르면 듬뿍 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반양지", "하루 2~3시간 정도의 은은한 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["50~70%", "주변 공기를 촉촉하게 관리해주세요"], // 습도 [최소, 최대]
    temperature: [15, 25], // 온도 [최소, 최대]
  },
  {
    name: "애니시다",
    scientificName: "Genista",
    attributes: ["꽃을 감상하는", "실외식물", "햇빛을 좋아하는"],
    description: `애니시다는 노란 꽃이 아름다운 식물로, 
        정원이나 베란다에서 키우기 좋습니다. 
        햇빛을 좋아하며 물을 자주 주어야 건강하게 자랍니다.`,
    waterFrequency: ["평균 주 2~3회", "흙이 마르면 듬뿍 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["양지", "하루 4~6시간 이상의 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["50~70%", "주변 공기를 촉촉하게 관리해주세요"], // 습도 [최소, 최대]
    temperature: [15, 25], // 온도 [최소, 최대]
  },
  {
    name: "드라세나 드라코",
    scientificName: "Dracaena draco",
    attributes: ["공기정화", "실내식물", "강한 식물"],
    description: `드라세나 드라코는 공기정화 능력이 뛰어나고 관리가 쉬운 실내식물입니다. 
        이 식물은 낮은 물 요구량과 강한 생명력으로 유명하며, 
        다양한 환경에서도 잘 자랍니다.`,
    waterFrequency: ["평균 월 1회 이하", "흙이 완전히 마른 후에 물을 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반양지", "낮은 빛 조건에서도 잘 자랍니다"], // 햇빛 [최소, 최대]
    humidity: ["40~60%", "일반적인 실내 습도에서 잘 자랍니다"], // 습도 [최소, 최대]
    temperature: [15, 30], // 온도 [최소, 최대]
  },
  {
    name: "알로카시아 블랙벨벳",
    scientificName: "Alocasia reginula 'Black Velvet'",
    attributes: ["잎을 감상하는", "빛이 적어도 되는", "실내식물"],
    description: `알로카시아 블랙벨벳은 벨벳 같은 질감의 검은 잎이 매력적인 식물입니다. 
        빛이 적은 곳에서도 잘 자라며, 물을 자주 주어야 합니다.`,
    waterFrequency: ["평균 주 1~2회", "흙이 마르면 듬뿍 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반양지", "하루 2~3시간 정도의 은은한 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["50~70%", "주변 공기를 촉촉하게 관리해주세요"], // 습도 [최소, 최대]
    temperature: [18, 25], // 온도 [최소, 최대]
  },
  {
    name: "피쉬본 선인장",
    scientificName: "Epiphyllum anguliger",
    attributes: ["꽃을 감상하는", "실내식물", "강한 식물"],
    description: `피쉬본 선인장은 물고기 뼈 모양의 독특한 잎을 가진 식물로, 
        실내에서 키우기 좋습니다. 
        강한 생명력을 가지고 있으며, 물을 자주 주지 않아도 잘 자랍니다.`,
    waterFrequency: ["평균 월 1회 이하", "흙이 완전히 마른 후에 물을 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반양지", "낮은 빛 조건에서도 잘 자랍니다"], // 햇빛 [최소, 최대]
    humidity: ["40~60%", "일반적인 실내 습도에서 잘 자랍니다"], // 습도 [최소, 최대]
    temperature: [15, 30], // 온도 [최소, 최대]
  },
  {
    name: "상록 넉줄 고사리",
    scientificName: "Polystichum tsus-simense",
    attributes: ["잎을 감상하는", "실내식물", "습도를 좋아하는"],
    description: `상록 넉줄 고사리는 상록성 고사리로, 
        실내에서 키우기 좋습니다. 
        습도를 좋아하며, 물을 자주 주어야 건강하게 자랍니다.`,
    waterFrequency: ["평균 주 1~2회", "흙이 마르면 듬뿍 주세요"], // 물주기 횟수 [최소, 최대]
    sunlight: ["반양지", "하루 2~3시간 정도의 은은한 햇빛이 필요해요"], // 햇빛 [최소, 최대]
    humidity: ["60~80%", "주변 공기를 촉촉하게 관리해주세요"], // 습도 [최소, 최대]
    temperature: [15, 25], // 온도 [최소, 최대]
  },
];

// 예제 사용법
// plantsData.forEach(plant => {
//   console.log(`이름: ${plant.name}`);
//   console.log(`학명: ${plant.scientificName}`);
//   console.log(`속성: ${plant.attributes.join(', ')}`);
//   console.log(`설명: ${plant.description}`);
//   console.log(`물 주기: ${plant.waterFrequency[0]}-${plant.waterFrequency[1]}일`);
//   console.log(`햇빛: ${plant.sunlight[0]}-${plant.sunlight[1]}`);
//   console.log(`습도: ${plant.humidity[0]}-${plant.humidity[1]}`);
//   console.log(`온도: ${plant.temperature[0]}-${plant.temperature[1]}`);
//   console.log('---------------------------');
// });
export default plantsData;
