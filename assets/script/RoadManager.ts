
import { _decorator, Component, Node, Prefab, resources, Vec3 } from 'cc';
import { Configs } from './Configs';
import { PoolManager } from './PoolManager';
const { ccclass, property } = _decorator;

@ccclass('RoadManager')
export class RoadManager extends Component {
    @property({
        type:Prefab
    })
    road: Prefab = null!
    public roads: Node[] = [];

    public __preload() {
        this.initRoad();
    }
    public initRoad() {
        for (let index = 0; index < Configs.ROAD_NUM; index++) {
            let node = PoolManager.instance.getNode(this.road);
            node.setWorldPosition(new Vec3(0, 0, Configs.ROAD_POS_Z * index));
            node.parent = this.node.parent;
            this.roads.push(node);
        }
    }
}
