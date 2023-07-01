type DataType = string;
type Data = {
    type: DataType;
    timestamp: number;
    data: any;
};
export declare class DataDao {
    private data;
    private archiveData;
    private parent;
    type: string;
    private onAdd;
    constructor(type: string, opts?: {
        onAdd: (d: {
            data: any;
            type: string;
            timestamp: number;
        }) => void;
    });
    get length(): number;
    add(d: any): void;
    getArchiveData(): Data[][];
    /** 归档数据 */
    archive(): void;
    get(): Data[];
    clear(): void;
    setParent(p: DataPool): void;
    getParent(): DataPool;
}
export declare class DataPool {
    private pool;
    add(d: DataDao): void;
    get(): DataDao[];
    clear(): void;
}
export declare class DataEmitter {
    dataDao: DataDao;
    emit(d: any): void;
}
export {};
