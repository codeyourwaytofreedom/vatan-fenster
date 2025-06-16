import { MB45_DKL } from "@/pages/api/prices/aluminium/MB45/1flugel/MB45_DKL";
import { MB45_DKR } from "@/pages/api/prices/aluminium/MB45/1flugel/MB45_DKR";
import { MB45_DL } from "@/pages/api/prices/aluminium/MB45/1flugel/MB45_DL";
import { MB45_DR } from "@/pages/api/prices/aluminium/MB45/1flugel/MB45_DR";
import { MB45_F } from "@/pages/api/prices/aluminium/MB45/1flugel/MB45_F";
import { MB45_K } from "@/pages/api/prices/aluminium/MB45/1flugel/MB45_K";

import { MB70_DKL } from "@/pages/api/prices/aluminium/MB70/1flugel/MB70_DKL";
import { MB70_DKR } from "@/pages/api/prices/aluminium/MB70/1flugel/MB70_DKR";
import { MB70_DL } from "@/pages/api/prices/aluminium/MB70/1flugel/MB70_DL";
import { MB70_DR } from "@/pages/api/prices/aluminium/MB70/1flugel/MB70_DR";
import { MB70_F } from "@/pages/api/prices/aluminium/MB70/1flugel/MB70_F";
import { MB70_K } from "@/pages/api/prices/aluminium/MB70/1flugel/MB70_K";

import { MB70HI_DKL } from "@/pages/api/prices/aluminium/MB70HI/1flugel/MB70HI_DKL";
import { MB70HI_DKR } from "@/pages/api/prices/aluminium/MB70HI/1flugel/MB70HI_DKR";
import { MB70HI_DL } from "@/pages/api/prices/aluminium/MB70HI/1flugel/MB70HI_DL";
import { MB70HI_DR } from "@/pages/api/prices/aluminium/MB70HI/1flugel/MB70HI_DR";
import { MB70HI_F } from "@/pages/api/prices/aluminium/MB70HI/1flugel/MB70HI_F";
import { MB70HI_K } from "@/pages/api/prices/aluminium/MB70HI/1flugel/MB70HI_K";

import { MB86NSI_DKL } from "@/pages/api/prices/aluminium/MB86NSI/1flugel/MB86NSI_DKL";
import { MB86NSI_DKR } from "@/pages/api/prices/aluminium/MB86NSI/1flugel/MB86NSI_DKR";
import { MB86NSI_DL } from "@/pages/api/prices/aluminium/MB86NSI/1flugel/MB86NSI_DL";
import { MB86NSI_DR } from "@/pages/api/prices/aluminium/MB86NSI/1flugel/MB86NSI_DR";
import { MB86NSI_F } from "@/pages/api/prices/aluminium/MB86NSI/1flugel/MB86NSI_F";
import { MB86NSI_K } from "@/pages/api/prices/aluminium/MB86NSI/1flugel/MB86NSI_K";



export const priceList_1flugelAluminium: Record<string, Record<number, Record<number, number>>> = {
    MB45_DKL: MB45_DKL,
    MB45_DKR: MB45_DKR,
    MB45_DL: MB45_DL,
    MB45_DR: MB45_DR,
    MB45_F: MB45_F,
    MB45_K: MB45_K,

    MB70_DKL: MB70_DKL,
    MB70_DKR: MB70_DKR,
    MB70_DL: MB70_DL,
    MB70_DR: MB70_DR,
    MB70_F: MB70_F,
    MB70_K: MB70_K,

    MB70HI_DKL: MB70HI_DKL,
    MB70HI_DKR: MB70HI_DKR,
    MB70HI_DL: MB70HI_DL,
    MB70HI_DR: MB70HI_DR,
    MB70HI_F: MB70HI_F,
    MB70HI_K: MB70HI_K,

    MB86NSI_DKL: MB86NSI_DKL,
    MB86NSI_DKR: MB86NSI_DKR,
    MB86NSI_DL: MB86NSI_DL,
    MB86NSI_DR: MB86NSI_DR,
    MB86NSI_F: MB86NSI_F,
    MB86NSI_K: MB86NSI_K
}