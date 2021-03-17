
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
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
    static IMX = -0.06;
    static IMY = 0;
    static IMZ = 0.06;
    static TOX = 0;
    static TOY = 0.2;
    static TOZ = 0;
}

