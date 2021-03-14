
import { _decorator, Component, Node, Vec3, lerp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Follow')
export class Follow extends Component {

    @property({
        type: Node
    })
    target: Node = null!;
    @property({
        type:Node
    })
    road: Node = null!
    private cameraPosition: Vec3 = new Vec3();
    private offst: number = 0;
    private tolerance: number = 0.1;

    start() {
        this.offst = this.node.worldPosition.z - this.target.worldPosition.z;
    }

    update(deltaTime: number) {//相机跟随
        const cz = this.node.worldPosition.z;
        const tz = this.target.worldPosition.z + this.offst;
        const detla = cz - tz;
        if (detla > this.tolerance) {
            this.cameraPosition.set(this.node.worldPosition);
            this.cameraPosition.z = lerp(cz, tz, 0.1);
            this.node.setWorldPosition(this.cameraPosition);
        }
        // [4]
    }
}

