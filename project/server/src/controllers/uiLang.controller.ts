/*
 * Title: UILang controllers
 * Description: control all language related client requests
 * Author: Ashikur Rahman SA
 * Date: Monday, 28 -October-2024 (15:34:22)
 *
 */

import { Request, Response } from "express";

export const getLanguages = async (req: Request, res: Response) => {
  const code = req.params.code;
};
