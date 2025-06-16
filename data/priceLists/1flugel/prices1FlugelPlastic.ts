import { I5C_DKL } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_DKL";
import { I5C_DKR } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_DKR";
import { I5C_DL } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_DL";
import { I5C_DR } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_DR";
import { I5C_F } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_F";
import { I5C_FF } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_FF";
import { I5C_K } from "@/pages/api/prices/plastic/iglo 5 classic/1flugel/I5C_K";

import { I5_DKL } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_DKL";
import { I5_DKR } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_DKR";
import { I5_DL } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_DL";
import { I5_DR } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_DR";
import { I5_F } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_F";
import { I5_FF } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_FF";
import { I5_K } from "@/pages/api/prices/plastic/iglo 5/1flugel/I5_K";

import { IEC_DKL } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_DKL";
import { IEC_DKR } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_DKR";
import { IEC_DL } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_DL";
import { IEC_DR } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_DR";
import { IEC_F } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_F";
import { IEC_FF } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_FF";
import { IEC_K } from "@/pages/api/prices/plastic/iglo energy classic/1flugel/IEC_K";

import { IE_DKL } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_DKL";
import { IE_DKR } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_DKR";
import { IE_DL } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_DL";
import { IE_DR } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_DR";
import { IE_F } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_F";
import { IE_FF } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_FF";
import { IE_K } from "@/pages/api/prices/plastic/iglo energy/1flugel/IE_K";

import { IL_DKL } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_DKL";
import { IL_DKR } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_DKR";
import { IL_DL } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_DL";
import { IL_DR } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_DR";
import { IL_F } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_F";
import { IL_FF } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_FF";
import { IL_K } from "@/pages/api/prices/plastic/iglo light/1flugel/IL_K";

  export const priceList_1flugelPlastic: Record<string, Record<number, Record<number, number>>> = {
    I5_F: I5_F,
    I5_FF: I5_FF,
    I5_DR: I5_DR,
    I5_DL: I5_DL,
    I5_DKR: I5_DKR,
    I5_DKL: I5_DKL,
    I5_K: I5_K,

    I5C_F: I5C_F,
    I5C_FF: I5C_FF,
    I5C_DR: I5C_DR,
    I5C_DL: I5C_DL,
    I5C_DKR: I5C_DKR,
    I5C_DKL: I5C_DKL,
    I5C_K: I5C_K,

    IE_F: IE_F,
    IE_FF: IE_FF,
    IE_DR: IE_DR,
    IE_DL: IE_DL,
    IE_DKR: IE_DKR,
    IE_DKL: IE_DKL,
    IE_K: IE_K,

    IEC_F: IEC_F,
    IEC_FF: IEC_FF,
    IEC_K: IEC_K,
    IEC_DL: IEC_DL,
    IEC_DR: IEC_DR,
    IEC_DKR: IEC_DKR,
    IEC_DKL: IEC_DKL,

    IL_DKL: IL_DKL,
    IL_DKR: IL_DKR,
    IL_DL: IL_DL,
    IL_DR: IL_DR,
    IL_F: IL_F,
    IL_FF: IL_FF,
    IL_K: IL_K
  }