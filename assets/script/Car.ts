
import { _decorator, Component, Node, Vec3, RigidBody, ConstantForce, director, MotionStreak, } from 'cc';
import { Configs } from "../script/Configs";
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {
    private isDrfit: Boolean = false;
    private body: RigidBody = null!;
    private constant: ConstantForce = null!
    private pos: Vec3 = new Vec3();
    @property({
        type: Vec3
    })
    implse = new Vec3(-0.1, 0, 0.1);
    @property({
        type: Vec3
    })
    torque = new Vec3(0, 0.3, 0);
    @property({
        type: Vec3
    })
    anchor = new Vec3(0, -0.1, -0.1);
        
    public start() {
        this.body = this.getComponent(RigidBody)!;
        this.constant = this.getComponent(ConstantForce)!;
    }
    public startDrifting() {
        this.isDrfit = true;
    }
    public stopDrift() {
        this.isDrfit = false;
        this.constant.enabled = false;
        // this.scheduleOnce(function () {

        //     director.loadScene("scene")
        // }, 2)

    }

    update(deltaTime: number) {
        // this.getComponent(MotionStreak).
        if (this.isDrfit) {
            this.body.applyImpulse(this.implse,this.anchor)
            this.body.applyTorque(this.torque);
        }
    }
}
