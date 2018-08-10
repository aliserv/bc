const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "+";
const agree = '✅';
const disagree = '❌';
var failed = 0;

client.on('message', async message => {
  if(message.content.startsWith(prefix + "bc")) {
    if(message.author.id === client.user.id) return;
    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;

    var args = message.content.split(' ').slice(1).join(' ');
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':eight_pointed_black_star: » انت لا تملك الخصائص اللازمة , يجب توفر خاصية `التحكم بأعدادات السيرفر`');
    if(!args) return message.channel.send(':eight_pointed_black_star: » انت لم تقم بكتابة الرسالة');

    try {
      // By: iAmHeRo¹⁵ ☤#1705
      var i = message.guild.memberCount;
      args = args.replace('[sender]', message.author);
      args = args.replace('[server]', message.guild.name);
      message.channel.send(':information_source: » جاري ارسال الرسالة .. __يرجى الانتظار__');
      setTimeout(() => {
        message.channel.send(`:white_check_mark: » تم ارسال البرودكاست .. تم الارسال لـ ${i} شخص`);
      }, message.guild.members.size * 1000);
      message.guild.members.forEach(m => {
        var bcEmbeed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(':eight_pointed_black_star: » السيرفر', `[** __${message.guild.name}__ **]`,true)
        .addField(':eight_pointed_black_star: » المرسل', `[** __${message.author.username}__ **]`,true)
        .addField(':eight_pointed_black_star: » الرسالة', args.replace('[user]' , m))
        .setFooter(`${hero.user.username} :: ${new Date().toLocaleString()}`, hero.user.avatarURL)
        .setColor('BLACK');
        m.send(bcEmbeed).catch(e => i--);
      });
      // message.channel.send(`[** __Error Detected__ **] : ${e} , ${m}`)
    } catch(e) {
      if(e) {
        return message.channel.send(`[** __Error Detected__ **] : ${e}`);
      }
    }
  }
});
client.login(process.env.BOT_TOKEN);
