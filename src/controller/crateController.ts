import { CrateType } from '../types/crateTypes';
import { case1 } from '../utils/cases/case1'

const handleOpenCreate = async (req , res) =>{
    function drawCrate (crate : CrateType){
        const rate = Math.floor((Math.random() * crate.limitRate) +1)
        const skin = crate.skins.find(
            skin => skin.maxRate >= rate && skin.minRate <= rate
        );
        if(!skin) return {message : "the number drawn does not have a number equivalent to a weapon", error: true}
        
        var Wear = skin.wear ? skin.wear.find(wear => rate <= wear.wearRate) : "default-Wear"

        const drawnSkin = {...skin}
        delete drawnSkin.wear
        return {skin : skin , wear: Wear}
    }

}