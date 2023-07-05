<template>
    <div
        ref="r"
        class="tester"
        :class="css.tester">
        <t-upload
            theme="custom"
            accept=".zip"
            :before-upload="beforeUpload"
        >
            <t-button
                variant="outline"
                theme="primary"
            >
                导入数据ZIP包
            </t-button>
        </t-upload>
        <t-button
            block
            :disabled="!events.length"
            @click="reset">重置</t-button>
        <t-button
            block
            :disabled="!events.length"
            @click="back"
        >后退5秒</t-button>
        <t-button
            block
            :disabled="!events.length"
            @click="forward"
        >前进5秒</t-button>
        <t-select
            :value="speed"
            :disabled="!events.length"
            :options="speedOptions"
            @change="onChangeSpeedOption"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    type PlayerType,
    drag,
    log,
    originConsole,
    replay,
    strFromU8,
    unzipSync,
} from '../';
import {
    MessagePlugin, SelectValue, UploadFile,
} from 'tdesign-vue-next';
import {
    onMounted,
    onUnmounted,
    ref,
    shallowRef,
} from 'vue';

const r = shallowRef<HTMLElement>();

const events = shallowRef([]) as any;
let allData = [] as any[];

const formatData = (dataStr: string | null) => {
    if (!dataStr) return null;
    try {
        return JSON.parse(dataStr);
    } catch (e) {
        return null;
    }
};

const beforeUpload = async (file: File | UploadFile) => {
    reset();
    let targetFile: File;
    if ('raw' in file) {
        targetFile = file.raw!;
    } else {
        targetFile = file as File;
    }
    const arrayBuffer = await targetFile!.arrayBuffer();
    const u = new Uint8Array(arrayBuffer);

    try {
        const uz = unzipSync(u, {
            filter(file) {
                return true;
            },
        });
        allData = JSON.parse(strFromU8(uz['tester-data/archive/archive.json'])).map(i => i.data);
        events.value = allData.map(i => {
            if (i.type === 'capture') {
                return i.data;
            }
            return i;
        });
        console.log('events.value: ', events.value);
        player = replay({
            props: {
                events: events.value,
                speed: speed.value,
                UNSAFE_replayCanvas: true,
                plugins: [
                    {
                        handler(event: any, isSync, context) {
                            if (typeof event.type === 'string') {
                                // log(event);
                                if (event.type === 'console') {
                                    const d = event.data;
                                    originConsole[d.level](...d.args);
                                } else if (event.type === 'network') {
                                    const d = event.data;
                                    const methodName = d.type === 'succ' ? 'info' : 'error';
                                    originConsole[methodName]('网络请求：\n', `地址：${d.data.config.url}\n`, '参数：', formatData(d.data.config.data) || d.data.config.params, '\n', '响应：', d.data.data);
                                } else if (event.type === 'error') {
                                    originConsole.error('捕获错误：', event.data);
                                }
                            }
                        },
                    },
                ],
            },
        } as any);
        player.pause();
    } catch (e) {
        console.log('error: ', e);
        MessagePlugin.error('解析zip包错误');
    }

    return false;
};
let player: PlayerType | null = null;

const reset = () => {
    events.value = [];
    if (player) {
        player.getReplayer().destroy();
        player = null;
        document.querySelector('.rr-player')?.remove();
    }
};

const toggle = () => {
    player?.toggle();
};

const back = () => {
    if (!player) return;
    const t = player.getReplayer().getCurrentTime();
    console.log('t: ', t);
    player.goto(t - 5000);
};

const forward = () => {
    if (!player) return;
    const t = player.getReplayer().getCurrentTime();
    console.log('t: ', t);
    player.goto(t + 5000);
};

const speed = ref(1);
const speedOptions = [
    {
        label: 0.5,
        value: 0.5,
    },
    {
        label: 0.75,
        value: 0.75,
    },
    {
        label: 1,
        value: 1,
    },
    {
        label: 1.25,
        value: 1.25,
    },
    {
        label: 1.5,
        value: 1.5,
    },
    {
        label: 1.75,
        value: 1.75,
    },
    {
        label: 2,
        value: 2,
    },
].map(i => ({
    label: '播放倍速：' + i.label,
    value: i.value,
}));
const onChangeSpeedOption = (v: SelectValue) => {
    console.log('v: ', v);
    speed.value = v as number;
    player?.setSpeed(speed.value);
};

const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === ' ') {
        toggle();
    }
};

onMounted(() => {
    window.addEventListener('keypress', onKeyDown);
    drag(r.value as HTMLElement);
});

onUnmounted(() => {
    window.removeEventListener('keypress', onKeyDown);
});

</script>
<script lang="ts">
export default {
    name: 'Tester',
};
</script>

<style lang="less" module="css">
.tester {
    position: fixed;
    padding: 32px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 8px;
    right: 16px;
    top: 16px;
    border-radius: 4px;
    background-color: #eee;
    z-index: 999;
    box-shadow: 2px 2px 6px 5px #999;
}
</style>
<style lang="less" scoped>
.tester {
    ::v-deep {
        .t-button:not(.t-button--variant-text) + .t-button:not(.t-button--variant-text) {
            margin-left: 0;
        }
    }
}
</style>
