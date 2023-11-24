import { Router } from "express";
import { case1 } from "../utils/cases/case1";

const casesRoutes = Router()

casesRoutes.get("/:id", async (req, res) => {
  const {id} = req.params
  console.log(id)
  if(id == 'temptress') {
    res.json(case1).status(200)
  }
});


export {casesRoutes}