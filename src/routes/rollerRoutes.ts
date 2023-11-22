import { Router } from "express";
import { case1 } from "../utils/cases/case1";

const rollerRoutes = Router()

rollerRoutes.get("/:id", async (req, res) => {
  const {id} = req.params
  const randomNumber = Math.floor(Math.random() * 30380)
  if(id == 'temptress') {
    const skin = case1.skins.find(
      skin => skin.maxRate >= randomNumber && skin.minRate <= randomNumber
    );
    console.log(randomNumber)
    console.log(skin)
    res.status(200).json(skin)
  }
});


export {rollerRoutes}