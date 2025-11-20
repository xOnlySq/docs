---
prev: false
next: false
lastUpdated: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const membersOne = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/77785684?v=4',
    name: '~$ sudo++',
    title: 'Owner, Services Developer',
    links: [
      { icon: 'github', link: 'https://github.com/imsudoer' },
      { icon: 'telegram', link: 'https://t.me/subashev' },
      { icon: 'readdotcv', link: 'https://t.me/bashmd' },
      // { icon: 'telegram', link: 'https://t.me/ddr4_48gb' },
      // { icon: 'telegram', link: 'https://t.me/imsudoer' },
      // { icon: 'telegram', link: 'https://t.me/netcatx' },
      { icon: 'steam', link: 'https://steamcommunity.com/id/NoBanOnlyZXC' },
      // { icon: 'steam', link: 'https://steamcommunity.com/id/imsudoer' },
      { icon: 'tiktok', link: 'https://www.tiktok.com/@xnobanonlyzxc' },
    ],
    sponsor: "https://www.donationalerts.com/r/iamsudo",
    actionText: "Donate me",
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/141219716?v=4',
    name: 'Chepuxcat',
    title: 'Co-owner, Main Developer',
    links: [
      { icon: 'github', link: 'https://github.com/chepuxcat' },
      { icon: 'telegram', link: 'https://t.me/chepuxcat' },
      { icon: 'steam', link: 'https://steamcommunity.com/id/chepuxcat/' },
      { icon: 'vk', link: 'https://vk.com/chepuxcat' },
      { icon: 'x', link: 'https://x.com/chepuxcat' },
      // { icon: 'facebook', link: 'https://www.facebook.com/e.volkov20102018/' },
      // { icon: 'roblox', link: 'https://www.roblox.com/users/7349359959/profile' },
      { icon: 'readdotcv', link: 'https://chepuxcat.ru/' }
    ],
    sponsor: "https://chepuxcat.ru/donate",
    actionText: "Donate me",
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/93833106?v=4',
    name: 'ImSkaiden',
    title: 'Main Developer',
    links: [
      { icon: 'github', link: 'https://github.com/ImSkaiden' },
      { icon: 'telegram', link: 'https://t.me/ImSkaiden' },
      { icon: 'steam', link: 'https://steamcommunity.com/id/imskaiden' },
      { icon: 'tiktok', link: 'https://www.tiktok.com/@ImSkaiden' },
      // { icon: 'readdotcv', link: 'https://imskaiden.ru' },
    ]
  },
]

const membersTwo = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/203390819?v=4',
    name: 'MrFaDev',
    title: 'Community Developer, Moderator',
    desc: "Creator of \"OnlySq AI\" Android app",
    links: [
      { icon: 'github', link: 'https://github.com/mrfadev' },
      { icon: 'telegram', link: 'https://t.me/MrFaDev' },
      // { icon: 'vk', link: 'https://vk.com/loginor4ik' },
      // { icon: 'readdotcv', link: 'https://loginor4ik.space' },
      // { icon: 'tiktok', link: 'https://www.tiktok.com/@xnobanonlyzxc' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/88246443?v=4',
    name: 'loginor4ik',
    title: 'Community Developer',
    desc: "Creator of Luna - a voice assistant powered by an ESP32, Gemini from OnlySQ, and a Node.js API. It can play music, provide weather data, write stories, and much more",
    links: [
      { icon: 'github', link: 'https://github.com/loginor4ik' },
      { icon: 'telegram', link: 'https://t.me/loginor4ik' },
      { icon: 'vk', link: 'https://vk.com/loginor4ik' },
      { icon: 'readdotcv', link: 'https://loginor4ik.space' },
      // { icon: 'tiktok', link: 'https://www.tiktok.com/@xnobanonlyzxc' }
    ],
    sponsor: "https://donationalerts.com/r/loginor4ik",
    actionText: "Donate me",
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/98474160?v=4',
    name: 'Vaweirr',
    title: 'Community Developer',
    desc: "Developer of \"Zetta AI\" Telegram bot",
    links: [
      { icon: 'github', link: 'https://github.com/Chaek1403' },
      { icon: 'telegram', link: 'https://t.me/procot1' },
      // { icon: 'vk', link: 'https://vk.com/loginor4ik' },
      // { icon: 'readdotcv', link: 'https://loginor4ik.space' },
      // { icon: 'tiktok', link: 'https://www.tiktok.com/@xnobanonlyzxc' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/139066428?v=4',
    name: 'Илон Маск 𝕏',
    title: 'Community Developer',
    links: [
      { icon: 'github', link: 'https://github.com/ElonKuska' },
      { icon: 'telegram', link: 'https://t.me/y9ElonKuska' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/186278110?v=4',
    name: 'мистер деп',
    title: 'Community Developer',
    desc: "Creator of \"DaunAI\" Telegram chatbot with self-learning",
    links: [
      { icon: 'github', link: 'https://github.com/mlwre-off' },
      { icon: 'telegram', link: 'https://t.me/mrdepnul' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/170461512?v=4',
    name: 'Fleydi',
    title: 'Community Developer',
    // desc: "Creator of \"DaunAI\" Telegram chatbot with self-learning",
    links: [
      { icon: 'github', link: 'https://github.com/Fleydi888' },
      { icon: 'telegram', link: 'https://t.me/Fleydii' },
    ]
  },
]
</script>
# Team

Say hello to our awesome team!

## First line

Owners of OnlySq, developers of the team's main projects

<VPTeamMembers size="small" :members="membersOne" />

## Second line

Our active community developers who are always in touch with us

<VPTeamMembers size="small" :members="membersTwo" />

---

> [!IMPORTANT] How I can get here?
> **Basic requirements**
> 1. You have a Telegram and GitHub account.
> 2. You have a project that uses OnlySq services.
> 3. Your project has a client base of more than 20 people or has an interesting idea with good implementation.
> 4. You have been using the services for more than 3 months.

> [!IMPORTANT] My project(s) meet all the requirements, what should I do?
> 
> You can write to one of us (First Line) in Telegram using one of the templates:
> > [!NOTE] Russian
> > Я, `[имя]`, хочу попасть в OnlySq Second Line<br>
> > Мои IP адреса с которых приходили запросы (<a href="https://onlysq.ru/myip">Узнать IP</a>): `0.0.0.0`, `127.0.0.1`, и т.д.<br>
> > Мои проекты:<br>
> > Проект1, используется там то; IP проекта<br>
> > Мой GitHub: `https://github.com/username`
>
> > [!NOTE] English
> > I, `[name]`, want to get into OnlySq Second Line<br>
> > My IP addresses from which requests came (<a href="https://onlysq.ru/myip">Find IP</a>):  `0.0.0.0`, `127.0.0.1`, etc.<br>
> > My projects:<br>
> > Project1, used for .. ; Project IP<br>
> > My GitHub: `https://github.com/username`