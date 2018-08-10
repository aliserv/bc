const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "+";
const agree = '✅';
const disagree = '❌';
var failed = 0;
client.on('message',async message => {
  if(message.content.startsWith(prefix + "bc")) {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(':eight_pointed_black_star: » **أنت لا تملك الخصائص اللازمة ..**__يجب توفر خاصية__ `التحكم بالسيرفر`');
    var args = message.content.split(' ').slice(1).join(' ');
    if(!args) return message.channel.send(':eight_pointed_black_star: » **انت لم تقم بكتابة الرسالة**');

    let msg = await message.channel.send(`\`• الرسالة :\`${args}\n\n**هل انت متأكد؟ لديك 5 ثواني للأختيار**`);
    await msg.react('✅');
    await msg.react('❌');
    
    let aa = (reaction, user) => reaction.emoji.name === agree && user.id === msg.author.id;
    let bb = (reaction, user) => reaction.emoji.name === disagree && user.id === message.author.id;

    let aaa  = message.createReactionCollector(aa, { time: 60000 });
    let bbb  = message.createReactionCollector(bb, { time: 60000 });

    aaa.on("collect", r => {
      message.channel.send(':information_source: » جاري ارسال الرسالة .. __يرجى الانتظار__');
      setTimeout(() => {
        var i = message.guild.memberCount - failed;
        message.channel.send(`:white_check_mark: » تم ارسال البرودكاست .. تم الارسال لـ ${i} شخص`);
      }, message.guild.memberCount * 1000);
      message.guild.members.forEach(m => {
        args = args.replace('[sender]', message.author);
        args = args.replace('[server]', message.guild.name);
        var bcEmbeed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(':eight_pointed_black_star: » السيرفر', `[** __${message.guild.name}__ **]`,true)
        .addField(':eight_pointed_black_star: » المرسل', `[** __${message.author.username}__ **]`,true)
        .addField(':eight_pointed_black_star: » الرسالة', args.replace('[user]' , m))
        .setFooter(`${client.user.username} :: ${new Date().toLocaleString()}`, client.user.avatarURL)
        .setColor('BLACK');
        m.send(bcEmbeed).catch(e => failed++);
    });

    bbb.on("collect", r => {
      message.channel.send(':eight_pointed_black_star: » تم الغاء الارسال');
    });
    }
  }
});
client.login(process.env.BOT_TOKEN);
