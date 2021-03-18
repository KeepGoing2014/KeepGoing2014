
import { _decorator, Component, Node, resources, Prefab, Vec3 } from 'cc';
import { Car } from './Car';
import { PoolManager } from './PoolManager';
import { Configs } from './Configs';
const { ccclass, property } = _decorator;

@ccclass('CarManager')
export class CarManager extends Component {
    @property({
        type: Prefab
    })
    suv: Prefab = null!    
    private suvs: Node[] = [];
    private cars: Node[] = [];
    private car: Car = null!
    public __preload() {
        this.initSuvs();
        this.newSvu(Configs.CAR_INIT);
        // this.initCars();
    }
    public carmeraFollow(tartget: Node) {
        Configs.target = tartget;
    }
    public carDrift() {
        this.car.startDrifting();
    }
    public carStop() {
        this.car.stopDrift();
    }
    public initSuvs() {
        for (let index = 0; index < Configs.SUV_NUM; index++) {
            const node = PoolManager.instance.getNode(this.suv, this.node);
            this.suvs.push(node);
        }
    }
    public newSvu(curr:Vec3) {
        let node = this.suvs.shift()!;
        node.worldPosition = curr;
        node.parent = this.node.parent;
        this.carmeraFollow(node);
        this.car = node.getComponent(Car)!;
        this.suvs.push(node);
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
                node.setScale(Configs.CAR_SCALE);
                node.setPosition(new Vec3(-0.7, 0, 9.5 - 2 * index));
                self.cars.push(node);
            }
        })
    }

}
