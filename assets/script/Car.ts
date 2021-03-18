
import { _decorator, Component, Node, Vec3, RigidBody, ConstantForce, director, MotionStreak, ParticleSystem, instantiate, ParticleSystemComponent, ParticleUtils, BoxCollider, } from 'cc';
import { Configs } from "./Configs";
import { CarManager } from "./CarManager";
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {
    private isDrfit: Boolean = false;
    private body: RigidBody = null!;
    private constant: ConstantForce = null!
    private currPos: Vec3 = new Vec3();
    @property({
        type: Node
    })
    left: Node = null!
    @property({
        type: Node
    })
    right: Node = null!
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

    public onLoad() {
        this.body = this.getComponent(RigidBody)!;
        this.constant = this.getComponent(ConstantForce)!;
    }
    public startDrifting() {
        this.isDrfit = true;
        this.currPos = new Vec3(0, 0, this.node.worldPosition.z);
        ParticleUtils.play(this.left);
        ParticleUtils.play(this.right);
    }
    public stopDrift() {
        this.isDrfit = false;
        this.constant.enabled = false;
        let self = this;
        this.scheduleOnce(function () {
            Configs.game.carManager.newSvu(self.currPos);
        }, 1)
    }
    update(deltaTime: number) {
        if (this.isDrfit) {
            this.body.applyImpulse(this.implse, this.anchor);
            this.body.applyTorque(this.torque);
        }
    }
}
