
import { _decorator, Component, Node, Prefab, resources } from 'cc';
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
        // this.initRoad();
      
    }
    public initRoad() {
        for (let index = 0; index < Configs.ROAD_NUM; index++) {
            let node = PoolManager.instance.getNode(this.road);
            node.parent = this.node.parent;
            this.roads.push(node);

        }
    }
}
