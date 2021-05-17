
import { _decorator, Component, Node, Vec3, RigidBody, ConstantForce, director, MotionStreak, ParticleSystem, instantiate, ParticleSystemComponent, ParticleUtils, BoxCollider, Prefab, } from 'cc';
import { Configs } from "./Configs";
import { PoolManager } from './PoolManager';
const { ccclass, property } = _decorator;

@ccclass('Car')
export class Car extends Component {
    private isDrfit: Boolean = false;
    private body: RigidBody = null!;
    private constant: ConstantForce = null!
    private currPos: Vec3 = new Vec3();
    private effect: Node = null!;
    @property({
        type: Prefab
    })
    trail: Prefab = null!
    @property({
        type: Vec3
    })
    implse = new Vec3();
    @property({
        type: Vec3
    })
    torque = new Vec3();
    @property({
        type: Vec3
    })
    anchor = new Vec3();

    public onLoad() {
        this.body = this.getComponent(RigidBody)!;
        this.constant = this.getComponent(ConstantForce)!;
    }
    public startDrifting() {
        this.isDrfit = true;
        this.currPos = new Vec3(0, 0, this.node.worldPosition.z);
        this.effect = PoolManager.instance.getNode(this.trail);
        this.effect.parent = this.node;
        ParticleUtils.play(this.effect);
    }
    public stopDrift() {
        this.isDrfit = false;
        this.constant.enabled = false;
        let self = this;
        // PoolManager.instance.putNode(this.effect);
        this.scheduleOnce(function () {
            Configs.game.carManager.newSvu(self.currPos);
        }, 1)
    }
    update(deltaTime: number) {
        if (this.node.worldPosition.z < Configs.ROAD_POS_Z * Configs.CURR_ROAD_INDEX) {//超过某个点后将第一条道路回收放在后面 形成无限的道路。
            Configs.game.roadManager.newRoad();
        }
        if (this.isDrfit) {
            /**
             * 具体数值需要根据刚体质量、摩檫力、马路宽度等数值进行调整。
             */
            this.body.applyImpulse(this.implse, this.anchor);//施加冲量
            this.body.applyTorque(this.torque);//施加扭矩 
        }
    }
}
