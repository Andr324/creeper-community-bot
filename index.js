const Discord = require("discord.js")
const client = new Discord.Client()

client.login(process.env.token)
//Comando c!say
client.on('message', async message =>  {
        if(message.content.startsWith('c!say')) {
            var messageArray = message.content.split(" ")
                var messageargs = messageArray.slice(1)
                var say = messageargs.join(" ")
        
                let InvalidSay = new Discord.MessageEmbed()
                .setTitle("Invalid Message")
                .setDescription(message.author.toString() + " you must enter a valid message!")
                if(!say) return message.channel.send(InvalidSay)
                message.channel.send(say)
                message.delete({timeout: 0000})
        }


    //Comando c!clear
        if (message.content.startsWith("c!clear")) {
            if (!message.member.hasPermission("MANAGE_MESSAGES")) { //Controllare che l'utente abbia il permesso di cancellare messaggi
                message.channel.send('Non hai il permesso');
                return;
            }
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) { //Controllare che il bot abbia il permesso di cancellare messaggi
                message.channel.send('Non ho i permessi!');
                return;
            }
    
            var count = message.content.slice(7); //Ottenere il numero inserito dall'utente
            count = parseInt(count);
    
            if (!count) {
                message.channel.send("Inserisci Un Numero Valido")
                return
            }
    
            message.channel.bulkDelete(count, true)
            message.channel.send(count + " I Messaggi Contati Sono Stati Eliminati").then(msg => {
                msg.delete({ timeout: 1000 })
                        })
            }

        //Comando c!ban
            if (message.content.startsWith("c!ban")) {
                var utenteKick = message.mentions.members.first();
        
                if (!message.member.hasPermission('BAN_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
                    message.channel.send('Non hai il permesso');
                    return;
                }
        
                if (!utenteKick) {
                    message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
                    return;
                }
        
                if (!message.mentions.members.first().kickable) { //Controllare che il bot abbia il permesso di bannare
                    message.channel.send('Io non ho il permesso');
                    return
                }
        
                utenteKick.ban()
                    .then(() => message.channel.send("<@" + utenteKick + ">" + " bannato"))
            }
                    //Comando c!kick
                        if (message.content.startsWith("c!kick")) {
                            var utenteKick = message.mentions.members.first();
                    
                            if (!message.member.hasPermission('KICK_MEMBERS')) { //Controllare che l'utente abbia il permesso di bannare
                                message.channel.send('Non hai il permesso');
                                return;
                            }
                    
                            if (!utenteKick) {
                                message.channel.send('Non hai menzionato nessun utente'); //Controllare che sia stato menzionato un utente
                                return;
                            }
                    
                            if (!message.mentions.members.first().kickable) { //Controllare che il bot abbia il permesso di bannare
                                message.channel.send('Io non ho il permesso');
                                return
                            }
                    
                            utenteKick.kick()
                                .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))
                        }
                    //Comando c!userinfo

                        if (message.content.startsWith("c!userinfo")) {
const utente = message.mentions.members.first() || message.member

                    
                            var elencoPermessi = "";
                            if (utente.hasPermission("ADMINISTRATOR")) {
                                elencoPermessi = ":crown: ADMINISTRATOR";
                            }
                            else {
                                var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]
                    
                                for (var i = 0; i < permessi.length; i++) {
                                    if (utente.hasPermission(permessi[i])) {
                                        elencoPermessi += "- " + permessi[i] + "\r";
                                    }
                                }
                            }
                    
                            var embed = new Discord.MessageEmbed()
                                .setTitle(utente.user.tag)
                                .setDescription("Tutte le info di questo utente")
                                .setThumbnail(utente.user.avatarURL())
                                .addField("User id", utente.user.id, true)
                                .addField("Stato", utente.user.presence.status, true)
                                .addField("Account creato il ", utente.user.createdAt.toDateString(), true)
                                .addField("È un bot?", utente.user.bot ? "Yes" : "No`", true)
                                .addField("Entrato in questo server", utente.joinedAt.toDateString(), true)
                                .addField("Permessi", elencoPermessi, false)
                                .addField("Ruoli", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
                    
                            message.channel.send(embed)
                            }
                            //Comando c!help
                            if(message.content == "c!help") {
                                message.channel.send("Per ora i comandi sono: c!clear (solo staff); c!say (per tutti); c!kick (per staff) e c!ban (per staff)")
                        }
                    })