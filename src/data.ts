/* eslint-disable max-classes-per-file */

// 数据层
type DataType = string;

type Data = {
    type: DataType;
    timestamp: number;
    data: any;
}

export class DataDao {

    private data: Data[] = [];

    private archiveData: Data[][] = []; // 每一份是一次归档

    // eslint-disable-next-line no-use-before-define
    private parent!: DataPool;

    type: string;

    private onAdd: CallableFunction | undefined;

    constructor(type: string, opts?: {
        onAdd: (d: {data: any;type: string;timestamp: number;}) => void
    }) {
        this.type = type;
        this.onAdd = opts?.onAdd;
    }

    get length() {
        return this.data.length;
    }

    add(d: any) {
        const payload = {
            data: d,
            type: this.type,
            timestamp: Date.now(),
        };
        if (!this.onAdd || this.onAdd && this.onAdd(payload)) {
            this.data.push(payload);
        }
    }

    getArchiveData() {
        return this.archiveData;
    }

    /** 归档数据 */
    archive() {
        this.archiveData = [
            ...this.archiveData,
            [...this.data],
        ];
        this.data = [];
    }

    get() {
        return this.data;
    }

    clear() {
        this.data = [];
    }

    // eslint-disable-next-line no-use-before-define
    setParent(p: DataPool) {
        this.parent = p;
    }

    getParent() {
        return this.parent;
    }
}

export class DataPool {

    private pool: DataDao[] = [];

    add(d: DataDao) {
        this.pool.push(d);
    }

    get() {
        return this.pool;
    }

    clear() {
        this.pool = [];
    }
}

export class DataEmitter {
    dataDao!: DataDao;

    emit(d: any) {
        this.dataDao.add(d);
    }

}
