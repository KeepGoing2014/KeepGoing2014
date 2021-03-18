
import { _decorator, Node, NodePool, Prefab, instantiate } from 'cc';
const { ccclass } = _decorator;

@ccclass('PoolManager')
export class PoolManager{
    dicPool: { [name: string]: NodePool } = {};
    public static _instance: PoolManager;
    public static get instance(): PoolManager {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new PoolManager();
        return this.instance;
    }
    /**
   * 根据预设从对象池中获取对应节点
   */
    public getNode(prefab: Prefab): Node {
        let name = prefab.data.name as string;
        let node: Node = null!;
        if (this.dicPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this.dicPool[name];
            if (pool.size() > 0) {
                node = pool.get()!;
            }
            else {
                node = instantiate(prefab) as Node;
            }
        }
        else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this.dicPool[name] = pool;
            node = instantiate(prefab) as Node;
        }
        // node.parent = parent;
        return node;

    }
     /**
     * 将对应节点放回对象池中
     */
    public putNode(node: Node) {
        let name = node.name;
        let pool = null;
        if (this.dicPool.hasOwnProperty(name)) {
            pool = this.dicPool[name];
        }
        else {
            pool = new NodePool;
            this.dicPool[name] = pool;
        }
        pool.put(node);
        
    }
     /**
     * 根据名称，清除对应对象池
     */
    public clearPool(name: string) {
        if (this.dicPool.hasOwnProperty(name)) {
            let pool = this.dicPool[name];
            pool.clear();
        }
        
    }
}
