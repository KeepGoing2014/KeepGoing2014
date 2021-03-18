
import { _decorator, Component, Node, Vec3, lerp } from 'cc';
import { Configs } from './Configs'
const { ccclass, property } = _decorator;

@ccclass('Follow')
export class Follow extends Component {
    static _instance: Follow;
    // private _target: Node = null!;
    private cameraPosition: Vec3 = new Vec3();
    private offst: number = 0;
    private tolerance: number = 0.1;

    // public static get instance(): Follow {
    //     if (this._instance) {
    //         return this._instance;
    //     }
    //     this._instance = new Follow();
    //     return this._instance;
    // }

    // public set target(target:Node) {
    //     this._target = target;
    // }

    public onLoad() {
        this.offst = this.node.worldPosition.z - Configs.target.worldPosition.z;
    }

    public update(deltaTime: number) {//相机跟随
        // if (!Configs.target) return;
        // const cz = this.node.worldPosition.z;
        // const tz = Configs.target.worldPosition.z + this.offst;
        // const detla = cz - tz;
        // if (detla > this.tolerance) {
        //     this.cameraPosition.set(this.node.worldPosition);
        //     this.cameraPosition.z = lerp(cz, tz, 0.1);
        //     this.node.setWorldPosition(this.cameraPosition);
        // }
    }
}

