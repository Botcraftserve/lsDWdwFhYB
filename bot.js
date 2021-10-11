const { Client, Intents } = require('discord.js');
const puppeteer = require('puppeteer');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login("ODk3MTY4MTA5Mzk4NTQwMzQ4.YWRu6Q.W_SgrUJLVp1nB8oT8-eIwYlrdXw");
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
  if (msg.content === '?uruchom') {
    msg.channel.send('Czekaj');
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto('https://craftserve.pl/login');
      await page.type('input[name=email]', 'hojowie@gmail.com', {delay: 20})
      await page.type('input[name=password]', 'Gowno123$', {delay: 20})
      await page.click('button[name=send]')
      await sleep(3000)
      await page.goto('https://craftserve.pl/s/936729');
      await sleep(3000)
      await page.click('button[type=submit]')
      await sleep(3000)
      if (await page.$('#console_message_1') !== null) {
        await browser.close();
        msg.channel.send('Serwer jest już uruchomiony!');
      } else {
        await page.click('#page-wrapper > nav > ul.nawigacja > div > li.panel-obslugi.srv_switches > a')
        await sleep(500)
        await browser.close();
        msg.channel.send('Pomyślnie uruchomiony.');
      }
      })();
  } else {
    if (msg.content === '?zamknij') {
      msg.channel.send('Czekaj');
      (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://craftserve.pl/login');
        await page.type('input[name=email]', 'hojowie@gmail.com', {delay: 20})
        await page.type('input[name=password]', 'Gowno123$', {delay: 20})
        await page.click('button[name=send]')
        await sleep(3000)
        await page.goto('https://craftserve.pl/s/936729');
        await sleep(3000)
        await page.click('button[type=submit]')
        await sleep(5000)
        if (await page.$('#console_message_1') !== null) {
          await page.click('#page-wrapper > nav > ul.nawigacja > div > li.panel-obslugi.srv_switches > a')
          await sleep(500)
          await browser.close();
          msg.channel.send('Pomyślnie zamknięty.');
        } else {
          await browser.close();
          msg.channel.send('Serwer jest już zamknięty!');
        }
        })();
    } else {
      if (msg.content === '?status') {
        msg.channel.send('Czekaj');
        (async () => {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.goto('https://craftserve.pl/login');
          await page.type('input[name=email]', 'hojowie@gmail.com', {delay: 20})
          await page.type('input[name=password]', 'Gowno123$', {delay: 20})
          await page.click('button[name=send]')
          await sleep(3000)
          await page.goto('https://craftserve.pl/s/936729');
          await sleep(3000)
          await page.click('button[type=submit]')
          await sleep(5000)
          if (await page.$('#console_message_1') !== null) {
            await sleep(500)
            await browser.close();
            msg.channel.send('Serwer jest włączony.');
          } else {
            await browser.close();
            msg.channel.send('Serwer jest wyłączony!');
          }
          })();
      }
    }
  }
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
