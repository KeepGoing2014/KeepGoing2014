
import { _decorator, Component, Node, Vec3 } from 'cc';
import{Game} from './Game'
const { ccclass} = _decorator;
enum PARK_TYPE{
    NPC = 1,
    CARS = 2,
    PARK = 3,
}
enum EVENT_NAME{
    START = 'start',
    END = 'end',
}

@ccclass('Configs')
export class Configs {
    static game: Game;
    static target: Node;
    static SUV_NUM = 5;
    static ROAD_NUM = 2;
    static ROAD_POS_Z = -46;
    static CURR_ROAD_INDEX = 1;
    static CAR_SCALE = new Vec3(0.15, 0.15, 0.15);
    static CAR_INIT=new Vec3(0,0,9)
}