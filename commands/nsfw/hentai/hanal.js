const Social = require("../../../structures/Social.js");
const { get } = require("snekfetch");

class HAnal extends Social {
  constructor(...args) {
    super(...args, {
      name: "hanal",
      description: "This command will return hentai porn in gif form.",
      category: "NSFW",
      usage: "hanal",
      cost: 40,
      cooldown: 10,
      loadingString: "<a:typing:397490442469376001> **{{displayName}}** is looking for hentai porn gifs..."
    });
  }

  async run(message, args, level, loadingMessage) { // eslint-disable-line no-unused-vars
    if (!message.channel.nsfw) return message.response("🔞", "Cannot display NSFW content in a SFW channel.");

    const { body } = await get("https://nekos.life/api/v2/img/anal");
    await loadingMessage.edit({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.url,
        "color": message.guild ? message.guild.me.roles.highest.color : 5198940,
        "image": {
          "url": body.url
        },
        "footer": {
          "icon_url": message.author.displayAvatarURL({ format: "png", size: 32 }),
          "text": `Requested by ${message.author.tag} | Powered by Nekos.life API`
        }
      }
    });
  }
}

module.exports = HAnal;