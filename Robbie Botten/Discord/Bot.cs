﻿using Discord;
using Discord.WebSocket;
using RobbieBotten.Config;
using RobbieBotten.Util;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using RobbieBotten.Discord.Commands;

namespace RobbieBotten.Discord {
    public class Bot {
        DiscordSocketClient client;

        ConfigFile config;
        private ConfigManager configmanager;

        Commands.Commands commandhandler;

        public Bot() {
            configmanager = new ConfigManager();

            configmanager.OnFileNotFound += (sender, file) => {
                Logger.Error($"{file} NOT FOUND, CREATING NEW CONFIG");
                Logger.Error($"PLEASE FILL OUT BLANK FIELDS IN {file}");
            };

            config = configmanager.Load();

            Logger.Warn("BOT IS IN EARLY DEVELOPMENT");
            Logger.Warn("3");
            Logger.Warn("2");
            Logger.Warn("1");
        }

        public async Task Start() {
            client = new DiscordSocketClient();

            commandhandler = new Commands.Commands(config, client);

            await commandhandler.Install();

            client.Log += Logger.Log;
            client.Ready += Ready;
            client.MessageReceived += commandhandler.Handle;

            await client.LoginAsync(TokenType.Bot, config.BotToken);
            await client.StartAsync();

            await Task.Delay(-1);
        }

        public async Task Ready() {
            await client.SetGameAsync($"{config.CommandPrefix}");
        }
    }
}
