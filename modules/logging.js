
/* Logs anything anyone does.
 * Check deleted messages, username changes, edits, and more!
 */

const Discord = require('discord.js');

function getGuildsFromUser(user, client) {
    return client.guilds.filter(guild => {
        console.log('getGuildFromUser: ' + guild.name + ', ' + guild.member(user))
        return guild.member(user) !== null;
    });
}

function msgOwner(guild, channelid) {
  guild.owner.send("Hey there, Dantè has noticed an error whilst trying to log. \nPlease check that Dantè can access the channel <#" + chanid + ">");
}

function addEvents(x) {

    x.on("messageDelete", (messageDelete) => {

        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [messageDelete.guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Deleted Message: '.gray + ' Content: '.cyan + messageDelete.content);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Message Deleted")
                    .setAuthor("Dantè Debugging", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#FF0000')
                    .setDescription('Message content:\n' + messageDelete.content + '\n\nMessage ID:\n' + messageDelete.id + '\n\nChannel:\n' + messageDelete.channel.name)
                    .setFooter('Message sent by ' + messageDelete.author.username + '#' + messageDelete.author.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();

                try {
                    if (messageDelete.author.bot) return;
                    x.client.channels.fetch(result[0].msglogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }



    });

    x.on('messageUpdate', (oldMessage, newMessage) => {

        if (newMessage.channel.id === "475003135220383744") {
            // On receive message, (Given string `msg`) from channel #awoo
            if (!/^(\*|_)*awo+f?(!|\*|_)*( ?(:3|<3|owo|uwu))?( ?❤️)?(\*|_)*$/ui.test(newMessage.content)) {

                try {
                    newMessage.delete();
                } catch (e) {
                    newMessage.author.send("Error" + e);
                }
                newMessage.author.send("Clever try, but I found you. \n\nNo " + newMessage.content + ", only awoo!");
            }
        }

        if (!oldMessage.content) {
            return;
        }




        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [oldMessage.guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' Old message: '.cyan + oldMessage.content + ' New message: ' + newMessage.content + '\n\nMessage ID:\n' + newMessage.id);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Message Edited")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#FFA500')
                    .setDescription('Old Message:\n' + oldMessage.content + '\n\nNew Message:\n' + newMessage.content + '\n\nChannel:\n' + newMessage.channel.name)
                    .setFooter('Message sent by ' + oldMessage.author.username + '#' + oldMessage.author.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();


                try {
                  if (oldMessage.author.bot) return;
                    x.client.channels.fetch(result[0].msglogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }


    });

    // Channel logs:

    x.on('channelCreate', channel => {

        try {
            x.log(channel.guild.id);
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [channel.guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' Channel Created: '.cyan + channel.id);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Channel Created!")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#00ff11')
                    .setFooter('Channel Created ' + ' | Dantè Debugging Beta')
                    .setTimestamp();


                embed.setDescription('New channel has been made \nDetails: \n\n**Channel Name**: ' + channel.name + '\n**Channel ID**: ' + channel.id)




                try {
                   x.client.channels.fetch(result[0].additionallogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }

    })

    x.on('channelDelete', channel => {

        try {
            x.log(channel.guild.id);
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [channel.guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' Channel Destroyed: '.cyan + channel.id);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle(":wastebasket: Channel Removed!")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#FF0000')
                    .setFooter('Channel Deleted ' + ' | Dantè Debugging Beta')
                    .setTimestamp();


                embed.setDescription('Channel was destroyed \nDetails: \n\n**Channel Name**: ' + channel.name + '\n**Channel ID**: ' + channel.id)




                try {
                    x.client.channels.fetch(result[0].additionallogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }

    })

    x.on('channelUpdate', (oldchan, newchan) => {

        try {
            x.log(oldchan.guild.id);
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [oldchan.guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' Channel Updated: '.cyan + oldchan.id);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Channel Updated")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#00FFFF')
                    .setFooter('Channel Updated ' + ' | Dantè Debugging Beta')
                    .setTimestamp();


                if (oldchan.name != newchan.name) {
                    embed.setDescription('Channel name changed! \n\nPrevious name: ' + oldchan.name + '\nNew name: ' + newchan.name);
                    try {
                        x.client.channels.get(result[0].additionallogs).sendMessage({
                            embed
                        });
                    } catch (err) {
                        return;
                    }
                }

                if (oldchan.topic != newchan.topic) {

                    if (!oldchan.topic && !newchan.topic) {
                        return;
                    }

                    embed.setDescription('Channel topic changed! \n\nPrevious topic: ' + oldchan.topic + '\nNew topic: ' + newchan.topic);
                    try {
                       x.client.channels.fetch(result[0].additionallogs).then(function (channel)
					{
						channel.send({embed});
					})
                    } catch (err) {
                        return;
                    }
                }




            })
        } catch (err) {

        }

    })

    // User logs:

    x.on('guildMemberAdd', member => {
        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [member.guild.id], function(err, result, fields) {
                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' User Joined: '.cyan + member.displayName);
                }
				
				 var punishments = 0;

  x.database.query("SELECT * FROM `cases` WHERE userid = ?", [member.id], async function(err, result, fields) {
    if (err) {
      x.log(err);
    } else {

      result.forEach(async function(data, pos, array) {
       punishments = punishments + 1;
      })
if(punishments >=3){
	 x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send("@here Warning: This person is a known troublemaker across servers that use Dantè. \n\nuse !u @user to list their punishments.");
					})
						
					}
	}
	})

                var embed = new Discord.MessageEmbed()
                    .setTitle("Member Joined!")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#00ff11')
                    .setFooter('User joined: ' + member.user.username + '#' + member.user.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();

                try {
                    embed.setDescription('New user has joined the guild! \n\nUser details: \n**Playing:** ' + member.presence.game.name + '\n**User status:** ' + member.presence.status + '\n**Joined Discord @** ' + member.user.createdAt + '\nID: ' + member.user.id)
                } catch (err) {
                    embed.setDescription('New user has joined the guild! \n\nUser details: \n**Playing:** N/A ' + '\n**User status:** ' + member.presence.status + '\n**Joined Discord @** ' + member.user.createdAt + '\nID: ' + member.user.id)
                }


                try {
                   x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
					
					
					
					/*
					var createdat =  new Date(member.user.createdAt);
					var now = new Date();
					
					if (now.getDate === createdat.getDate && now.getMonth === createdat.getMonth && now.getFullYear === createdat.getFullYear)
					{
						x.client.channels.get(result[0].userlogs).sendMessage("@here Warning: This person's account is very newly created. \n\nThis has a high chance of being a troll / raider.");
					} */
					
                } catch (err) {
                    return;
                }
            });

           x.database.query('SELECT welcome_message, welcome_channel FROM `guilds` WHERE guild_id = ?', [member.guild.id], (err, result, fields) => {
                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                x.log(result[0]);

                if (result[0].welcome_message == null || result[0].welcome_channel == null) {
                    return;
                }

                x.client.channels.get(result[0].welcome_channel).send(result[0].welcome_message.replace(/(?<!\$)\$user/g, `<@${member.user.id}>`));
            });
        } catch (err) {

        }

    });



    x.on('guildMemberRemove', member => {
        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [member.guild.id], function(err, result, fields) {



                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' User Left: '.cyan + member.displayName);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Member Left!")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#FF0000')
                    .setDescription('A user has left the guild! \nID: ' + member.user.id)
                    .setFooter('User left: ' + member.user.username + '#' + member.user.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();


                try {
                     x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }

    });
	

	
	x.on('messageReactionAdd', (reaction, usr) => {
		
		x.log("Reaction added");
		
		var channel = reaction.message.channel;
		var emoji = reaction.emoji.name;
		var gm = reaction.message.guild.members.fetch(usr).then(function (user)
		{
			
			 x.database.query("SELECT * FROM `reactionroles`", async function(err, result, fields) {
    if (err) {
      x.log(err);
    } else {

      result.forEach(async function(data, pos, array) {
        if(emoji === String.fromCodePoint(data.emoji) && reaction.message.id === data.messageid)
		{
			console.log(emoji);
			console.log(user.id);
			if(reaction.message.guild.me.roles.highest.rawPosition <= reaction.message.guild.roles.get(data.roleid).rawPosition) return user.send("The role you have requested is higher than, or as high as my highest role. \n\nPlease inform the guild owner about this error.");
			
			user.roles.add(data.roleid,"Reaction Role");
		}
      }) 
	}
}) // db end
}) // fetch member end
}) // message reaction end


	x.on('messageReactionRemove', (reaction, usr) => {
		
		x.log("Reaction removed");
		
		var channel = reaction.message.channel;
		var emoji = reaction.emoji.name;
		var gm = reaction.message.guild.members.fetch(usr).then(function (user)
		{
			
			 x.database.query("SELECT * FROM `reactionroles`", async function(err, result, fields) {
    if (err) {
      x.log(err);
    } else {

      result.forEach(async function(data, pos, array) {
        if(emoji === String.fromCodePoint(data.emoji) && reaction.message.id === data.messageid)
		{
			console.log(emoji);
			console.log(user.id);
			if(reaction.message.guild.me.roles.highest.rawPosition <= reaction.message.guild.roles.get(data.roleid).rawPosition) return user.send("The role you have requested is higher than, or as high as my highest role. \n\nPlease inform the guild owner about this error.");
			
			user.roles.remove(data.roleid,"Reaction Role");
		}
      }) 
	}
}) // db end
}) // fetch member end
}) // message reaction end

    x.on('userUpdate', (oldmember, newmember) => {
        try {

            var guilds = getGuildsFromUser(oldmember, x.client);
            x.log(guilds);

            guilds.forEach(g => {
                x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [g.id], function(err, result, fields) {


                    if (err) {
                        x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                    }

                    if (x.logging) {
                        x.log(' User Updated: '.cyan + oldmember.displayName);
                    }

                    var embed = new Discord.MessageEmbed()
                        .setTitle("Member Updated Details")
                        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                        /*
                         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                         */
                        .setColor('#00FFFF')
                        .setFooter('User updated profile | ' + newmember.username + '#' + newmember.discriminator + ' | Dantè Debugging Beta')
                        .setTimestamp();

                    if (oldmember.username != newmember.username) {
                        embed.setDescription('Username changed: \nDetails: \n\nOld name: ' + oldmember.username + '\nNew name: ' + newmember.username);
                        try {
                            x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                        } catch (err) {
                            return;
                        }
                    }



                    if (oldmember.avatarURL != newmember.avatarURL) {
                        embed.setDescription('User updated their profile picture');
                        embed.setThumbnail(oldmember.avatarURL);
                        embed.setImage(newmember.avatarURL);
                        try {
                          if (newmember.bot) return;
                            x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                        } catch (err) {
                            x.log(err);
                            return;
                        }
                    }




                })
            })

        } catch (err) {
            x.log('ERROR: ' + err);
        }

    });

    x.on('guildMemberUpdate', (oldmember, newmember) => {
        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [oldmember.guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' User Updated: '.cyan + oldmember.displayName);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Member Updated Details")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#00FFFF')
                    .setFooter('User updated profile | ' + newmember.user.username + '#' + newmember.user.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();

                if (oldmember.nickname != newmember.nickname) {
                    embed.setDescription('Nickname changed: \nDetails: \n\nOld name: ' + oldmember.nickname + '\nNew name: ' + newmember.nickname);
                    try {
                        x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                    } catch (err) {
                        return;
                    }
                }

                if (oldmember.user.username != newmember.user.username) {
                    embed.setDescription('Username changed: \nDetails: \n\nOld name: ' + oldmember.user.username + '\nNew name: ' + newmember.user.username);
                    try {
                        x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                    } catch (err) {
                        return;
                    }
                }

                if (oldmember.user.avatarURL != newmember.user.avatarURL) {
                    embed.setDescription('User updated their profile picture');
                    embed.setThumbnail(oldmember.user.avatarURL);
                    embed.setImage(newmember.user.avatarURL);
                    try {
                        x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                    } catch (err) {
                        return;
                    }
                }
				
   
var or=Array.from(oldmember.roles.values());
	var nr=Array.from(newmember.roles.values());
	var added=[];
	var removed=[];
	for(i=0;i<or.length;i++) {
    	if(nr.indexOf(or[i]) ==-1) {
    		removed.push(or[i]);
        }
    }
    
    for(i=0;i<nr.length;i++) {
    	if(or.indexOf(nr[i]) ==-1) {
    		added.push(nr[i]);
        }
    }
    
	if(added.length > 0 || removed.length > 0) {
	    if(added.length > 0) {
	        embed.setDescription("Role added to user: \n**" + added[0].name + "**");
			try {
                        x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                    } catch (err) {
                        return;
                    }
	    } else if(removed.length > 0) {
	       embed.setDescription("Role removed from user: \n**" + removed[0].name + "**");
		   try {
                         x.client.channels.fetch(result[0].userlogs).then(function (channel)
					{
						channel.send({embed});
					})
                    } catch (err) {
                        return;
                    }
	    }
    }
	
	if(typeof data == "undefined" || typeof data.fields == "undefined") return;



            })
        } catch (err) {

        }

    });

    // Ban logs:

    x.on('guildBanAdd', (guild, member) => {

        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' User Banned: '.cyan + member.username);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Member Banned")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#FF0000')
                    .setDescription('A user has been vanished! \nID: ' + member.id)
                    .setFooter('User banned: ' + member.username + '#' + member.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();


                try {
                    x.client.channels.fetch(result[0].caselogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }

    })

    x.on('guildBanRemove', (guild, member) => {

        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [guild.id], function(err, result, fields) {


                if (err) {
                    x.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    x.log('Logging: '.gray + ' User unbanned: '.cyan + member.username);
                }

                var embed = new Discord.MessageEmbed()
                    .setTitle("Member Pardoned")
                    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
                    /*
                     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                     */
                    .setColor('#FF0000')
                    .setDescription('A user has been revived from the dead! \nID: ' + member.id)
                    .setFooter('User unbanned: ' + member.username + '#' + member.discriminator + ' | Dantè Debugging Beta')
                    .setTimestamp();


                try {
                    x.client.channels.fetch(result[0].caselogs).then(function (channel)
					{
						channel.send({embed});
					})
                } catch (err) {
                    return;
                }
            })
        } catch (err) {

        }

    })


    // Statuses (playing)

    x.on("guildCreate", guild => {
        // This event triggers when the bot joins a guild.
        x.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        x.client.user.setActivity(`over ${x.client.guilds.size} servers | ${x.config.prefix}help`, { type: 'WATCHING' });

        // Add guild to database
        x.database.query('INSERT INTO `guilds` VALUES (?, ?, ?, NULL, NULL, NULL, NULL, \'!\', NULL, NULL, "en")', [guild.id, guild.owner.id, guild.name], err => {
            if (err) {
                x.log('ERROR! Couldn\'t add new guild to database.');
            }
        });

        x.client.channels.get(x.config.channelId).send("Dante has been added to " + guild.name + ".");

        /* my apologies
        var ownerMessage = x.config.ownerMessage;
        ownerMessage = ownerMessage.replace(/\$prefix/g, x.config.prefix);
        ownerMessage = ownerMessage.replace(/\$server/g, guild.name);
        guild.owner.send(ownerMessage);
        */

    });

    x.on("guildDelete", guild => {
        // this event triggers when the bot is removed from a guild.
        x.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
        x.client.user.setActivity(`over ${x.client.guilds.size} servers | ${x.config.prefix}help`, { type: 'WATCHING' });

        // Remove guild from database
        x.database.query('DELETE FROM `guilds` WHERE `guild_id`=?', [guild.id], err => {
            if (err) {
                x.log('ERROR! Couldn\'t add delete guild from database.');
            }
        });

        x.client.channels.get(x.config.channelId).send("Dante has been removed from " + guild.name + ".");

    });

}

module.exports = {
    addEvents: addEvents
};
