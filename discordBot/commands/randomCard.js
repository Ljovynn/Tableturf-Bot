import { SlashCommandBuilder } from "discord.js";
import { GetCardById } from "../../cards/cardManager.js";
import { BuildCardEmbed } from "./card.js";
import { uniqueCards } from "../../cards/cardManager.js";

export const data = new SlashCommandBuilder()
    .setName('randomcard')
    .setDescription('Get a random tableturf card')
export async function execute(interaction) {
    let id = Math.floor(Math.random() * (uniqueCards - 1)) + 1;
    let r = Math.floor(Math.random() * 100);
    let language = 'en';
    if (r == 100 && id <= 209){
        language = 'ja';
    }
    let card = GetCardById(id, language);
    r = Math.floor(Math.random() * 100);
    let level = 1;
    if (r > 99){
        level = 3;
    } else if (r > 95){
        level = 2;
    }

    await interaction.reply({ embeds: [BuildCardEmbed(card, level)] });
}