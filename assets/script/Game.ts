
import { _decorator, Component, Node } from 'cc';
import { CarManager } from './CarManager';
import { Configs } from './Configs';
import { RoadManager } from './RoadManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({
        type: CarManager
    })
    carManager: CarManager = null!
    @property({
        type:RoadManager
    })
    roadManager: RoadManager = null!

    public __preload() {
        Configs.game = this;
    }

    public onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    private touchStart() {
        this.carManager.carDrift();
    }
    private touchEnd() {
        this.carManager.carStop();
    }
}
