const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports ={
    name: 'play',
    aliases: ['skip', 'stop', 'pause', 'unpause'],
    cooldown: 0,
    permissions: ["SEND_MESSAGES"],
    desciption: 'Advanced Music Bot',
    async execute(message, args, cmd, client, discord, profileData) {

        const voice_channel = message.member.voice.channel;
        if(!voice_channel) return message.channel.send('You need to be in a channel to use this command!');
        const permission = voice_channel.permissionsFor(message.client.user);
        if(!permission.has('CONNECT')) return message.channel.send('You dont have the correct permission');
        if(!permission.has('SPEAK')) return message.channel.send('You dont have the correct permissions');

        const server_queue = queue.get(message.guild.id)

        if(cmd === 'play'){
            if(!args.length) return message.channel.send('You need to send a music or video you wanna play');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

const pause_song = (message, server_queue) => {
    if(server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!");//Checks if the song is already paused.
    server_queue.connection.dispatcher.pause();//If the song isn't paused this will pause it.
    message.channel.send("Paused the song!");//Sends a message to the channel the command was used in after it pauses.
  }
  
  //Unpause command
  const unpause_song = (message, server_queue) => {
    if(!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");//Checks if the song isn't paused.
    server_queue.connection.dispatcher.resume();//If the song is paused this will unpause it.
    message.channel.send("Unpaused the song!");//Sends a message to the channel the command was used in after it unpauses.
  }