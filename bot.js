const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "YOUR TOKEN GOES HERE"

client.login(bot_secret_token)

a = []

client.on("voiceStateUpdate", (oldMember, newMember) => { 
    try{
        if(a.includes(oldMember.voiceChannel.id) && oldMember.voiceChannel.members.array().length == 0){
            oldMember.voiceChannel.delete()
        }
    }
    catch{}

    var channelName = 'Create a channel'
    var newChannelName = "User's channel"

    try{
        if(newMember.voiceChannel.name != channelName) return

        newMember.voiceChannel.clone(newChannelName).then(result =>{

            result.setParent(newMember.voiceChannel.parentID)
                .then(result =>{
                    newMember.setVoiceChannel(result.id)
                    a.push(result.id)
                });
        });   
    }
    catch{}
}); 