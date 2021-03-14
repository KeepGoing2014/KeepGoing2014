
import { _decorator, Component, Node } from 'cc';
import { Car } from './Car';
const { ccclass, property } = _decorator;

@ccclass('CarManager')
export class CarManager extends Component {
    @property({
        type:Car
    })
    car: Car = null!

    start () {
        // [3]
    }
    public carDrift() {
        this.car.startDrifting();
        
    }
    public carStop() {
        this.car.stopDrift();
    }

}
