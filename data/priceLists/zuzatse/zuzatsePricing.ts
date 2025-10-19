import { WindowProfilePlastic } from "@/types/Configurator";

export const sicherheitsbeschlagePricing: Record<WindowProfilePlastic , Record<string, number>> = {
    I5: {
        basissicherheit: 0,
        aufbohrschutz: 3,
        rc1n: 40,
        rc2n: 140
    },
     I5C: {
        basissicherheit: 0,
        aufbohrschutz: 3,
        rc1n: 40,
        rc2n: 140
    },
    IL: {
        basissicherheit: 0,
        aufbohrschutz: 3,
        rc1n: 40,
        rc2n: 140
    },
    IE: {
        basissicherheit: 0,
        rc1n: 40,
        rc2n: 140
    },
    IEC: {
        basissicherheit: 0,
        rc1n: 40,
        rc2n: 140
    },
}

export const verdecktLiegenderBeschlagPricing: Record<'nein' | 'ja', number> = {
    nein: 0,
    ja: 160
}

export const dünneSchweißnahtVPerfectPricing:Record<'nein' | 'ja', number> = {
    nein: 0,
    ja: 0
}

export const reedKontaktPricing: Record<'nein' | 'ja', number> = {
    nein: 0,
    ja: 140
}