# guild-tag

# Discord.js Clan Tag (Guild Tag) Sistemi

## Açıklama

Discord.js üzerine getirilmemiş clan tag(guild tag) sistemini discord.js üzerine ekleyip + olarak userUpdate eventinde değişikliğe gidilerek userClanUpdate eklentisi yapılmıştır. Tagını güncelleyen kişiye anlık rol verme işlemlerinde kullanılabilir, tamamen resmi ve doğal.

## Kurulum

### 1. Dosyaları Kopyala
`/node_modules/discord.js/src/structures/` konumuna aşağıdaki dosyaları at:

- `User.js` (güncellendi)
- `Events.js` (güncellendi) 
- `UserUpdate.js` (güncellendi)

### 2. TypeScript Tanımları
`/node_modules/discord.js/typings/` konumuna:

- `index.d.ts` (güncellenmiş)
- `index.d.mts` (güncellenmiş)

## Kullanım

### Clan Bilgilerini Alma
```javascript
const user = await client.users.fetch('953862088185487360');

if (user.clan) {
    console.log(`tag: ${user.clan.tag}`);
    console.log(`sunucu: ${user.clan.identityGuildId}`);
    console.log(`rozet: ${user.clan.badge}`);
}

if (user.primaryGuild) {
    console.log(`prm: ${user.primaryGuild.tag}`);
}
```

### Clan Değişiklikleri
```javascript
// Genel user güncellemeleri
client.on(Events.UserUpdate, (oldUser, newUser) => {
    if (oldUser.clan?.tag !== newUser.clan?.tag) {
        console.log(`Clan tag değişti a ${oldUser.clan?.tag} → ${newUser.clan?.tag}`);
    }
});

// Sadece clan güncellemeleri
client.on(Events.UserClanUpdate, (oldUser, newUser) => {
    console.log(`${newUser.tag} kişisinin clanı güncellendi `);
    
    if (newUser.clan) {
        const mentioned = message.guild.members.cache.get(newUser.id);
        if (mentioned) {
            console.log(`${newUser.clan.tag} rolü verdim `);
        }
    }
});
```

---

**Not**: Aklı olan yapar neyse fazla uzatmaya da gerek yok, iyi günler kolay gelsin! 😊
