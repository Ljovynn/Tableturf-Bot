import fs from 'node:fs';
import { SanitizeString } from '../discordBot/utils/string.js';

export const uniqueCards = 266;
export const unique312s = 19;

//sorted alphabetically for autocomplete purposes
var enCards = [];

//sorted alphabetically too
var jpCards = [];

SetupCards();

async function SetupCards(){
    fs.readFile('cards/cardData.json', 'utf-8', function (err, data) {
        if (err) throw err;
    
        console.log("setting up cards");
        let sortedCards = JSON.parse(data);

        sortedCards.sort((a, b) => a.name.localeCompare(b.name));

        for (let i = 0; i < sortedCards.length; i++){
            enCards.push({
                id: parseInt(sortedCards[i].id),
                name: sortedCards[i].name,
                sanitizedName: SanitizeString(sortedCards[i].name)
            })
        }

        sortedCards.sort((a, b) => a.jpName.localeCompare(b.jpName, 'ja'));

        for (let i = 0; i < sortedCards.length; i++){
            jpCards.push({
                id: parseInt(sortedCards[i].id),
                name: sortedCards[i].jpName,
                sanitizedName: SanitizeString(sortedCards[i].jpName)
            })
        }
    });
}

export function GetCardByName(inputName, language){
    let cards = GetCardListByLanguage(language);
    let sanitizedInput = SanitizeString(inputName);
    for (let i = 0; i < cards.length; i++){
        if (cards[i].sanitizedName === sanitizedInput){
            return cards[i];
        }
    }
}

export function GetCardById(inputId, language){
    let cards = GetCardListByLanguage(language);
    for (let i = 0; i < cards.length; i++){
        if (cards[i].id === inputId){
            return cards[i];
        }
    }
}

export function GetCardListByLanguage(language){
    switch (language){
    case 'ja':
        return jpCards;
    default:
        return enCards;
    }
}