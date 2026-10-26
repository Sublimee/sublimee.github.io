import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const folder = dirname(fileURLToPath(import.meta.url));
const slidesFolder = join(folder, 'slides');
const sourceFolder = join(folder, 'source');
await mkdir(slidesFolder, { recursive: true });
await mkdir(sourceFolder, { recursive: true });
const photo = await readFile(resolve(folder, '../../photos/5f8d4427-fbc1-4d80-a0e0-b90cf70c1c3b.png'));

const slides = [
  {
    label: 'Продуктивность / рабочая среда', theme: 'dark cover',
    html: `<h1>Тихий убийца<br>вашей<br><span>продуктивности</span></h1>
      <div class="hook"><p>Перестань смотреть TikTok,<br>рилсы и шортсы! 🤔</p>
      <p class="muted">Да, да, это чистая правда.<br>Но сегодня — не об этом.</p></div>`,
  },
  {
    label: '01 / Невидимый фактор', theme: '',
    html: `<h2>Духота — это<br>не просто жара</h2>
      <p>Вы чувствовали в помещении духоту?<br>Особенно на контрасте с улицей.</p>
      <div class="gas"><span>CO₂</span><p>Углекислый газ<br>не имеет ни цвета, ни запаха.</p></div>
      <p>Рост его концентрации можно заметить по своим ощущениям — когда она уже высока — или с помощью специальных датчиков.</p>`,
  },
  {
    label: '02 / Личный опыт', theme: 'photo-slide',
    html: `<h2>Пять лет<br>на рабочем столе</h2>
      <div class="photo-row"><div class="photo-copy">
      <p>Чтобы следить за качеством воздуха дома на удалёнке, лет 5 назад я купил монитор Qingping за 8–10 т.р.</p>
      <p>Служит верой и правдой всё это время.</p></div>
      <img src="data:image/png;base64,${photo.toString('base64')}" alt="Монитор Qingping на рабочем столе: CO2 469 ppm" /></div>`,
  },
  {
    label: '03 / Выбор устройства', theme: 'purchase',
    html: `<h2>Что учесть<br>при покупке?</h2>
      <div class="callout"><p>В первую очередь —<br>точность измерений.</p></div>
      <p>Обращайте внимание на тесты,<br>отзывы и сертификацию устройства.</p>
      <p>Если нужна автоматизация, проверьте интеграцию с умным домом: открывание окна или включение кондиционера.</p>
      <div class="note"><strong>У Qingping уже есть вторая версия.</strong><br>Обзоры обоих поколений — на breathesafeair.com.<br>Полные ссылки приложены к карусели.</div>`,
  },
  {
    label: '04 / Что измеряем', theme: '',
    html: `<h2>Что измеряет<br>монитор воздуха?</h2>
      <div class="metric"><span class="metric-number">01</span><div><h3>CO₂</h3><p>Концентрация углекислого газа<br>в ppm — parts per million.</p></div></div>
      <div class="metric"><span class="metric-number">02</span><div><h3>PM2.5</h3><p>Частицы меньше 2,5 мкм.<br>Они могут проходить через<br>наши защитные барьеры.</p></div></div>
      <div class="callout compact"><p>Вы перестанете встряхивать<br>постельное бельё, увидев,<br>как растёт этот показатель.</p></div>`,
  },
  {
    label: '05 / Что измеряем', theme: 'climate-metrics',
    html: `<h2>Что ещё<br>измеряет монитор?</h2>
      <div class="metric"><span class="metric-number">03</span><div><h3>tVOC</h3><p>Летучие органические соединения:<br>их могут выделять мебель, фанера и краски.<br>Стабильно высокий уровень — ищите причину.</p></div></div>
      <div class="metric"><span class="metric-number">04</span><div><h3>Температура</h3><p>Высокая температура может усиливать<br>ощущение духоты.</p></div></div>
      <div class="metric"><span class="metric-number">05</span><div><h3>Влажность</h3><p>Высокая влажность может усиливать духоту.<br>Когда сухо, следите за состоянием слизистых:<br>нет ли сухости в носу и горле, раздражения глаз.</p></div></div>`,
  },
  {
    label: '06 / Качество воздуха', theme: 'dark ranges',
    html: `<h2>Уровень CO₂ в ppm<br>и самочувствие</h2>
      <div class="range"><strong>&lt; 800</strong><p>Наслаждаемся жизнью</p></div>
      <div class="range"><strong>800–2000</strong><p>Усталость, потеря сосредоточенности,<br>неприятное ощущение духоты.</p></div>
      <div class="range"><strong>2000–5000</strong><p>Головная боль, сонливость,<br>хочется покинуть помещение.</p></div>
      <div class="range danger"><strong>&gt; 5000</strong><p>Бегите, глупцы! ⚰️</p></div>`,
  },
  {
    label: '07 / Что делать дальше', theme: 'ventilation',
    html: `<h2>Вентиляция —<br>ключ к успеху</h2>
      <p>Лучший способ снизить CO₂ —<br>разбавлять воздух в помещении<br>воздухом с улицы.</p>
      <div class="season"><strong>Летом</strong><p>Чистый воздух — открыть окно.<br>Грязный — фильтровать, например бризером.</p></div>
      <div class="season"><strong>Зимой</strong><p>Подогревать воздух с улицы —<br>или подавать его в малых объёмах<br>через клапаны с фильтрами.</p></div>
      <div class="note">В идеале каждое помещение подключено<br>к HVAC: Heating, Ventilation, and Air Conditioning.<br>Такие системы можно встретить в отелях и офисах.</div>`,
  },
  {
    label: '08 / Климатическая техника', theme: 'devices',
    html: `<h2>Три устройства —<br>разные задачи</h2>
      <div class="fact"><span>01</span><div><h3>Кондиционер</h3><p>Подавляющее большинство охлаждает<br>воздух в комнате, не обеспечивая приток.</p></div></div>
      <div class="fact"><span>02</span><div><h3>Воздухоочиститель</h3><p>Отфильтровывает загрязняющие частицы,<br>но не поглощает углекислый газ.</p></div></div>
      <div class="fact"><span>03</span><div><h3>Бризер</h3><p>Подаёт воздух с улицы, фильтрует<br>и при необходимости подогревает его.</p></div></div>`,
  },
  {
    label: 'Рабочая среда / качество воздуха', theme: 'dark closing',
    html: `<span class="closing-symbol">CO₂</span>
      <h2>Дышите<br>полной<br><span>грудью!</span></h2>
      <div class="closing-line"></div>
      `,
  },
];

const css = `
*{box-sizing:border-box}html,body{margin:0}body{background:#ddd;font-family:'Segoe UI',sans-serif;color:#172925}
.slide{width:1080px;height:1350px;background:#f5f3ed;position:relative;overflow:hidden;margin:0 0 32px}
.top{position:absolute;top:58px;left:76px;right:76px;display:flex;justify-content:space-between;align-items:center;font-size:23px;font-weight:600;letter-spacing:2px;text-transform:uppercase}
.top .dot{width:16px;height:16px;background:#6b895b;border-radius:50%}
.content{position:absolute;top:150px;left:76px;right:76px;bottom:145px}
footer{position:absolute;bottom:56px;left:76px;right:76px;border-top:1px solid #cbd2c4;padding-top:22px;display:flex;justify-content:space-between;font-size:24px;color:#4c5e52}
h1,h2,h3,p{margin:0}h1{font-size:100px;line-height:1.06;font-weight:700;letter-spacing:-4px}h2{font-size:82px;line-height:1.1;font-weight:700;letter-spacing:-2.6px;margin-bottom:46px}h3{font-size:66px;line-height:1.1;letter-spacing:-1.5px;margin-bottom:22px}p{font-size:42px;line-height:1.4;margin-bottom:30px}.dark{background:#172925;color:#f5f3ed}.dark .top{color:#d3dacb}.dark .top .dot{background:#dce97a}.dark footer{border-color:#4e6154;color:#d3dacb}.dark h1 span,.dark h2 span{color:#dce97a}
.cover .content{top:173px}.cover h1{font-size:99px}.hook{border-top:2px solid #4e6154;margin-top:83px;padding-top:35px}.hook p{font-size:42px}.hook .muted{color:#bcc8b5;font-size:38px}
.gas{display:flex;gap:44px;align-items:center;background:#e5ebd9;padding:38px 40px;margin:48px 0}.gas>span{font-size:136px;font-weight:650;letter-spacing:-5px;line-height:1}.gas p{font-size:38px;margin:0}
.photo-slide h2{margin-bottom:60px}.photo-row{display:flex;align-items:center;gap:40px}.photo-copy{flex:1}.photo-copy p{font-size:40px;line-height:1.4;margin-bottom:36px}.photo-copy p:last-child{margin-bottom:0}.photo-row img{width:480px;height:auto;border-radius:24px}
.callout{background:#dce97a;padding:38px 40px;margin:38px 0}.callout p{margin:0;font-size:46px;font-weight:600;line-height:1.3}.note{border-top:1px solid #cbd2c4;padding-top:30px;font-size:31px;line-height:1.45;color:#4c5e52;margin-top:40px}.note strong{font-weight:600}.metric{display:flex;gap:36px;margin:52px 0}.metric-number{font-size:28px;line-height:64px;width:64px;flex:0 0 64px;text-align:center;height:64px;border:1px solid #aab9a1;border-radius:50%}.metric p{font-size:38px;margin:0}.compact p{font-size:41px}.smaller{font-size:58px}.last{margin-top:50px}
.climate-metrics h2{margin-bottom:36px}.climate-metrics .metric{margin:30px 0}.climate-metrics h3{font-size:48px;margin-bottom:14px}.climate-metrics .metric p{font-size:35px;line-height:1.4}.climate-metrics .metric-number{width:58px;height:58px;flex-basis:58px;line-height:58px}
.purchase .callout{margin-top:0}.purchase .note{margin-top:32px}
.ranges .content{top:150px}.ranges h2{font-size:74px;margin-bottom:50px}.range{padding:29px 0 29px 30px;border-left:6px solid #dce97a;border-bottom:1px solid #425849;display:flex;flex-direction:column;gap:10px}.range strong{font-size:56px;line-height:1.15;letter-spacing:-1px;color:#dce97a}.range p{font-size:36px;line-height:1.3;margin:0}.danger{border-left-color:#f0ab8b}.danger strong{color:#f0ab8b}
.ventilation h2{margin-bottom:34px}.ventilation .content>p{font-size:41px}.season{display:flex;gap:35px;border-top:1px solid #cbd2c4;padding-top:28px;margin-top:28px}.season strong{font-size:33px;min-width:138px;line-height:1.4;color:#516e44}.season p{font-size:36px;line-height:1.4;margin:0}.ventilation .note{font-size:29px;margin-top:34px}
.fact{display:flex;gap:33px;margin-top:54px}.fact>span{font-size:28px;color:#516e44;padding-top:6px}.fact h3{font-size:48px}.fact p{font-size:40px;line-height:1.4;margin:0}
.devices .fact{margin-top:36px;padding-top:28px;border-top:1px solid #cbd2c4}.devices .fact h3{font-size:48px;margin-bottom:18px}.devices .fact p{font-size:36px}
.closing-symbol{display:block;font-size:54px;letter-spacing:-2px;color:#dce97a;margin-bottom:60px}.closing h2{font-size:144px;line-height:1.02;margin:0;letter-spacing:-5px}.closing-line{width:130px;height:8px;background:#dce97a;margin:54px 0 38px}.closing p{font-size:38px;color:#d3dacb}.signature{margin-top:44px;font-size:31px!important}.signature span{color:#dce97a}
`;

const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Карусель: качество воздуха</title><style>${css}</style></head><body>${slides.map((slide, i) => `<section class="slide ${slide.theme}" id="slide-${i + 1}"><div class="top"><span>${slide.label.replace(/^\d{2} \/ /, '')}</span><span class="dot"></span></div><div class="content">${slide.html}</div><footer><span>Максим Гусев · magusev.ru</span><span>${String(i + 1).padStart(2, '0')} / ${slides.length}</span></footer></section>`).join('')}</body></html>`;
const htmlPath = join(sourceFolder, 'carousel.html');
await writeFile(htmlPath, html, 'utf8');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  const problems = await page.locator('.slide').evaluateAll(elements => elements.flatMap((slide, index) => {
    const box = slide.getBoundingClientRect();
    const content = slide.querySelector('.content');
    const footer = slide.querySelector('footer').getBoundingClientRect();
    const children = [...content.children];
    const issues = children.filter(child => {
      const rect = child.getBoundingClientRect();
      return rect.bottom > footer.top - 18 || rect.right > box.right - 50 || rect.left < box.left + 50;
    });
    return issues.map(child => ({ slide: index + 1, tag: child.tagName, text: child.textContent.slice(0, 80) }));
  }));
  if (problems.length) throw new Error(`Layout overflow: ${JSON.stringify(problems)}`);
  for (let i = 0; i < slides.length; i++) {
    await page.locator('.slide').nth(i).screenshot({ path: join(slidesFolder, `${String(i + 1).padStart(2, '0')}.png`) });
  }
  const previewPath = join(folder, 'preview.html');
  await writeFile(previewPath, `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Карусель LinkedIn — качество воздуха</title><style>*{box-sizing:border-box}body{margin:0;background:#dce2d7;color:#172925;font-family:'Segoe UI',sans-serif;padding:36px}h1{font-size:32px;margin:0 0 10px}p{font-size:18px;margin:0 0 28px}.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:20px}a{color:inherit;text-decoration:none}img{width:100%;display:block;box-shadow:0 6px 18px #17292518}span{display:block;margin-top:8px;font-size:16px}@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}</style></head><body><h1>Тихий убийца вашей продуктивности</h1><p>10 слайдов · 1080 × 1350 px · нажмите на картинку, чтобы открыть оригинал</p><div class="grid">${slides.map((s,i)=>{const name=String(i+1).padStart(2,'0');return `<a href="slides/${name}.png"><img src="slides/${name}.png" alt="Слайд ${i+1}"><span>${name} / 10</span></a>`;}).join('')}</div></body></html>`, 'utf8');
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto(pathToFileURL(previewPath).href);
  await page.screenshot({ path: join(folder, 'preview.png'), fullPage: true });
  console.log(`Rendered ${slides.length} slides, 1080 × 1350 px; no layout overflow.`);
} finally {
  await browser.close();
}
