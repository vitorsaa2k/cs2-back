import { CrateType } from '../types/crateTypes';
import { case1 } from '../utils/cases/case1'

const handleCrateOpen = async (req , res) =>{
    const {id} = req.params;
    if(id == 'temptress'){
        var drawnResult = drawCrate(case1);
        console.log(drawnResult)
        if(drawnResult?.error){
            res.status(400).json(drawnResult)
        }else{
            res.status(200).json(drawnResult)
        }
        
    }
    
}

const HandleCrateGet = async (req,res) =>{
    const {id} = req.params
  if(id == 'temptress') {
    res.json(case1).status(200)
  }
}

export {
    handleCrateOpen,
    HandleCrateGet
}

function drawCrate (crate : CrateType){
    const rate = Math.floor((Math.random() * crate.limitRate) +1)
    const skin = crate.skins.find(
        skin => skin.maxRate >= rate && skin.minRate <= rate
    );
    if(!skin) return {message : "the number drawn does not have a number equivalent to a weapon", error: true}
    
    var Wear = skin.wear ? skin.wear.find(wear => rate <= wear.wearRate) : "default-Wear"

    const drawnSkin = {...skin}
    delete drawnSkin.wear
    
    return {skin : drawnSkin , wear: Wear}
}