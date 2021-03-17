
import { _decorator, Component, Node, resources, Prefab, Vec3 } from 'cc';
import { Car } from './Car';
import { PoolManager } from './PoolManager';
const { ccclass, property } = _decorator;

@ccclass('CarManager')
export class CarManager extends Component {
    @property({
        type: Car
    })
    car: Car = null!
    private cars: Node[] = [];

    public onLoad() {
        this.initCars();
    }
    public carDrift() {
        this.car.startDrifting();

    }
    public carStop() {
        this.car.stopDrift();
    }
    public initCars() {
        let self = this;
        resources.loadDir('cars', Prefab, function (err, prefab) {
            if (err) {
                console.log('load cars error:' + err);
                return;
            }
            for (let index = 0; index < prefab.length; index++) {
                const element = prefab[index];
                let node = PoolManager.instance.getNode(element, self.node);
                node.setScale(new Vec3(0.15, 0.15, 0.15));
                node.setPosition(new Vec3(-0.7, 0, 9.5 - 2 * index));
                self.cars.push(node);

            }
        })
    }

}
