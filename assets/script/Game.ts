
import { _decorator, Component, Node } from 'cc';
import { CarManager } from './CarManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({
        type:CarManager
    })
    carManager: CarManager = null!

    public onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
        // [3]
    }

    private touchStart() {
        this.carManager.carDrift();
    }
    private touchEnd() {
        this.carManager.carStop();
    }
}
