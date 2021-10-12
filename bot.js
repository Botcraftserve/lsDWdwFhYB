const puppeteer = require('puppeteer');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment')
const created = moment().format('hh:mm:ss')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!uruchom') {
    msg.channel.send('Podaj id serwera (np. 636729)');
    msg.channel.awaitMessages(m => m.author.id == msg.author.id,
      { max: 1, time: 30000 }).then(collected => {
      let sid = collected.first().content.toString()
      fs.access('./sesje/' + msg.author.id + '.json', (err) => {
      if (err) {
        msg.channel.send("Nie mamy twoich plików cookies!")
      } else {
        (async () => {
          const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
          const page = await browser.newPage();
          await page.goto('https://craftserve.pl/login');
          const cookies = fs.readFileSync('./sesje/' + msg.author.id + '.json', 'utf8')
          const deserializedCookies = JSON.parse(cookies)
          await page.setCookie(...deserializedCookies)
          await page.goto('https://craftserve.pl/s/' + sid);
          await sleep(1000)
          if (await page.$('#register_btn') !== null) {
            await browser.close();
            msg.channel.send('Ten serwer nie należy do ciebie!');
          } else {
            await page.click('button[type=submit]')
            await sleep(500)
            if (await page.$('#console_message_1') !== null) {
              await browser.close();
              msg.channel.send('Serwer jest już online!');
            } else {
              await page.click('#page-wrapper > nav > ul.nawigacja > div > li.panel-obslugi.srv_switches > a')
              await sleep(100)
              await browser.close();
              msg.channel.send('Pomyślnie urchomiony.');
            }
          }
          })();
      }
  });
}).catch(() => {
  msg.channel.send('Nie podałeś serwera, process anulowany.');
});
  } else {
    if (msg.content === '!zamknij') {
      msg.channel.send('Podaj id serwera (np. 636729)');
      msg.channel.awaitMessages(m => m.author.id == msg.author.id,
        { max: 1, time: 30000 }).then(collected => {
        let sid = collected.first().content.toString()
        fs.access('./sesje/' + msg.author.id + '.json', (err) => {
        if (err) {
          msg.channel.send("Nie mamy twoich plików cookies!")
        } else {
          (async () => {
            const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
            const page = await browser.newPage();
            await page.goto('https://craftserve.pl/login');
            const cookies = fs.readFileSync('./sesje/' + msg.author.id + '.json', 'utf8')
            const deserializedCookies = JSON.parse(cookies)
            await page.setCookie(...deserializedCookies)
            await page.goto('https://craftserve.pl/s/' + sid);
            await sleep(1000)
            if (await page.$('#register_btn') !== null) {
              await browser.close();
              msg.channel.send('Ten serwer nie należy do ciebie!');
            } else {
              await page.click('button[type=submit]')
              await sleep(500)
              if (await page.$('#console_message_1') !== null) {
                await page.click('#page-wrapper > nav > ul.nawigacja > div > li.panel-obslugi.srv_switches > a')
                await sleep(100)
                await browser.close();
                msg.channel.send('Pomyślnie zamknięty.');
              } else {
                await browser.close();
                msg.channel.send('Serwer jest już zamknięty!');
              }
            }
            })();
        }
    });
  }).catch(() => {
    msg.channel.send('Nie podałeś serwera, process anulowany.');
});
    } else {
      if (msg.content === '!status') {
        msg.channel.send('Podaj id serwera (np. 636729)');
        msg.channel.awaitMessages(m => m.author.id == msg.author.id,
          { max: 1, time: 30000 }).then(collected => {
            let sid = collected.first().content.toString()
            fs.access('./sesje/' + msg.author.id + '.json', (err) => {
              if (err) {
                msg.channel.send("Nie mamy twoich plików cookies!")
              } else {
                  (async () => {
                    const browser = await puppeteer.launch({
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
                    const page = await browser.newPage();
                    const cookies = fs.readFileSync('./sesje/' + msg.author.id + '.json', 'utf8')
                    const deserializedCookies = JSON.parse(cookies)
                    await page.setCookie(...deserializedCookies)
                    await page.goto('https://craftserve.pl/s/' + sid);
                    await sleep(1000)
                    if (await page.$('#register_btn') !== null) {
                      await browser.close();
                      msg.channel.send('Ten serwer nie należy do ciebie!');
                    } else {
                      if (await page.$('#console_message_1') !== null) {
                        await browser.close();
                        msg.channel.send('Serwer jest włączony.');
                      } else {
                        await browser.close();
                        msg.channel.send('Serwer jest wyłączony!');
                      }
                    }
                    })();
              }
          })
          }).catch(() => {
            msg.channel.send('Nie podałeś serwera, process anulowany.');
        });
      } else {
        if (msg.content === '!zaloguj') {
          msg.channel.send('Podaj maila');
          msg.channel.awaitMessages(m => m.author.id == msg.author.id,
            { max: 1, time: 30000 }).then(collected => {
              let mail = collected.first().content.toLowerCase()
              msg.channel.send('Podaj hasło');
              msg.channel.awaitMessages(m => m.author.id == msg.author.id,
                { max: 1, time: 30000 }).then(collected => {
                  let haslo = collected.first().content.toString()
                  msg.channel.send('Logujemy się na konto...');
                  (async () => {
                    const browser = await puppeteer.launch({
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    });
                    //const browser = await puppeteer.launch({ headless: false });
                    const page = await browser.newPage();
                    await page.goto('https://craftserve.pl/login');
                    await page.type('input[name=email]', mail, {delay: 20})
                    await page.type('input[name=password]', haslo, {delay: 20})
                    await page.click('button[name=send]')
                    await sleep(2000)
                    await page.goto('https://craftserve.pl/account');
                    await sleep(500)
                    if (await page.$('#page-wrapper > nav > ul.nav.navbar-right.top-nav.separator_pionowy > li:nth-child(4) > a') !== null) {
                      const cookies = await page.cookies()
                      const cookieJson = JSON.stringify(cookies)
                      fs.writeFileSync('./sesje/' + msg.author.id + '.json', cookieJson)
                      await sleep(500)
                      await browser.close();
                      msg.channel.send('Pomyślnie zalogowano! (Usuń wiadomość z **hasłem**!)' + '\nSesja wygaśnie za 1 dzień o godzinie ' + created + '!\nPo tym będziesz musiał się zalogować jeszcze raz!');
                    } else {
                      await browser.close();
                      msg.channel.send('Podałeś złe hasło!');
                    }
                    })();
                }).catch(() => {
                    msg.channel.send('Nie podałeś hasła, process anulowany.');
                });
            }).catch(() => {
                msg.channel.send('Nie podałeś maila, process anulowany.');
            });
        }
      }
    }
  }
});

client.login('ODk3MTY4MTA5Mzk4NTQwMzQ4.YWRu6Q.W_SgrUJLVp1nB8oT8-eIwYlrdXw');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 