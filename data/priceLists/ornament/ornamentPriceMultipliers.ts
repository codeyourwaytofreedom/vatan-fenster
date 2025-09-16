export const ornamentPriceMultipliers = (ornamentKey: string, m2: number) => {
    switch (ornamentKey) {
        case 'nein':
            return 0;
        case 'reflektofloatBraun6':
            return extractOrnamentMultiplier(m2,[509, 687.15,738.05, 814.40]);
        case 'antisolBraun4':
            return extractOrnamentMultiplier(m2,[85,114.75,123.25,136]);
    }
}

function extractOrnamentMultiplier(m2: number, multipliers: number[]) {
    return m2 <= 4 ? multipliers[0] : m2 > 4 && m2<= 5 ?  multipliers[1] : m2 > 5 && m2 <= 7 ? multipliers[2] :  multipliers[3]; 
}