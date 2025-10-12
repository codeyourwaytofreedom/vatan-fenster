export const innenAussenCompatibleText = 'InnenAussenCompatible';


export const sprossenPricingList: Record<string, Record<string, {key: string, name: string, multiplier: number}[]>> = {
    innenliegen: {
        8: [
          { key: 'white',name: 'Weiß', multiplier: 14 },
          { key: 'silver-matt',name: 'Silber matt',multiplier: 14 },
          { key: 'gold', name: 'Gold',multiplier: 14 }
        ],
        18: [
            { key: 'weiss', name: 'Weiß', multiplier: 15 },
            { key: 'gold', name: 'Gold', multiplier: 23 },
            { key: 'anthrazitgrau', name: 'Anthrazitgrau', multiplier: 19 },
            { key: 'weiss-fx', name: 'Weiß FX', multiplier: 19  },
            { key: 'schokobraun', name: 'Schokobraun', multiplier: 19  },
            { key: 'eiche-dunkel', name: 'Eiche Dunkel', multiplier: 19  },
            { key: 'macore', name: 'Macore', multiplier: 19  },
            { key: 'mahagoni', name: 'Mahagoni', multiplier: 19  },
            { key: 'nussbaum', name: 'Nussbaum', multiplier: 19  },
            { key: 'sheffield-oak-light', name: 'Sheffield Oak Light', multiplier: 19  },
            { key: 'grau', name: 'Grau', multiplier: 19  },
            { key: 'winchester', name: 'Winchester', multiplier: 19  },
            { key: 'golden-oak', name: 'Golden Oak', multiplier: 19  },
            { key: 'cremeweiss', name: 'Cremeweiss', multiplier: 19  },
            { key: 'quarzgrau', name: 'Quarzgrau', multiplier: 19  },
            { key: 'anthrazitgrau-glatt', name: 'Anthrazitgrau Glatt', multiplier: 19  },
            { key: 'schwarz-ulti-matt', name: 'Schwarz Ulti-Matt', multiplier: 19  },
            { key: 'lichtgrau', name: 'Lichtgrau', multiplier: 19  },
            { key: 'quarzgrau-glatt', name: 'Quarzgrau Glatt', multiplier: 19  },
            { key: 'anthrazitgrau-ulti-matt', name: 'Anthrazitgrau Ulti-Matt', multiplier: 19  },
            { key: 'turner-oak', name: 'Turner Oak', multiplier: 19  },
            { key: 'schwarzbraun', name: 'Schwarzbraun', multiplier: 19  },
            { key: 'double', name: innenAussenCompatibleText, multiplier: 48 }
        ],
        26: [
            { key: 'weiss', name: 'Weiß', multiplier: 17 },
            { key: 'gold', name: 'Gold', multiplier: 24 },
            { key: 'anthrazitgrau', name: 'Anthrazitgrau', multiplier: 20 },
            { key: 'weiss-fx', name: 'Weiß FX', multiplier: 20 },
            { key: 'schokobraun', name: 'Schokobraun', multiplier: 20 },
            { key: 'eiche-dunkel', name: 'Eiche Dunkel', multiplier: 20 },
            { key: 'macore', name: 'Macore', multiplier: 20 },
            { key: 'mahagoni', name: 'Mahagoni', multiplier: 20 },
            { key: 'nussbaum', name: 'Nussbaum', multiplier: 20 },
            { key: 'sheffield-oak-light', name: 'Sheffield Oak Light', multiplier: 20 },
            { key: 'grau', name: 'Grau', multiplier: 20 },
            { key: 'winchester', name: 'Winchester', multiplier: 20 },
            { key: 'golden-oak', name: 'Golden Oak', multiplier: 20 },
            { key: 'cremeweiss', name: 'Cremeweiss', multiplier: 20 },
            { key: 'quarzgrau', name: 'Quarzgrau', multiplier: 20 },
            { key: 'anthrazitgrau-glatt', name: 'Anthrazitgrau Glatt', multiplier: 20 },
            { key: 'schwarz-ulti-matt', name: 'Schwarz Ulti-Matt', multiplier: 20 },
            { key: 'lichtgrau', name: 'Lichtgrau', multiplier: 20 },
            { key: 'quarzgrau-glatt', name: 'Quarzgrau Glatt', multiplier: 20 },
            { key: 'anthrazitgrau-ulti-matt', name: 'Anthrazitgrau Ulti-Matt', multiplier: 20 },
            { key: 'turner-oak', name: 'Turner Oak', multiplier: 20 },
            { key: 'schwarzbraun', name: 'Schwarzbraun', multiplier: 20 },
            { key: 'double', name: innenAussenCompatibleText, multiplier: 48 }
        ],
        45: [
            { key: 'weiss', name: 'Weiß', multiplier: 19 },
            { key: 'double', name: innenAussenCompatibleText, multiplier: 85 }
        ]
    },
    aufgesetzte: {
        27: [
            { key: 'weiss', name: 'Weiß',multiplier: 31 },
            { key: 'double', name: innenAussenCompatibleText,multiplier: 55 }
        ],
        45: [
            { key: 'weiss', name: 'Weiß',multiplier: 43 },
            { key: 'double', name: innenAussenCompatibleText,multiplier: 67 }
        ],
        65: [
            { key: 'weiss', name: 'Weiß',multiplier: 67 },
            { key: 'double', name: innenAussenCompatibleText,multiplier: 73 }
        ],
    }
}

export const sprossenPricingList3LayerGlassAufgesetzte: Record<string, Record<string, {key: string, name: string, multiplier: number}[]>>  = {
    aufgesetzte: {
        27: [
            { key: 'weiss', name: 'Weiß', multiplier: 48 },
            { key: 'double', name: innenAussenCompatibleText, multiplier: 75 },
        ],
        45: [
            { key: 'weiss', name: 'Weiß', multiplier: 64 },
            { key: 'double', name: innenAussenCompatibleText, multiplier: 100 },
        ],
        65: [
            { key: 'weiss', name: 'Weiß',multiplier: 100 },
            { key: 'double', name: innenAussenCompatibleText, multiplier: 119 },
        ],
    } 
}